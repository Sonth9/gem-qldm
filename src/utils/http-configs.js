import axios from "axios";
import router from "@/router";
import store from "@/store";
import { HTTP } from "@/api/http-common";
import ENDPOINT from "@/api/endpoints";
import {
  getValueFromStorageByKey,
  LOCAL_STORAGE_KEY,
  removeValueToStorageByKey,
  setValueToStorageByKey
} from "@/utils/localStorage";

import { ROUTE_NAME } from "@/constants/constants";
import Vue from "vue";
import _isEmpty from "lodash/isEmpty";
import { showMsgError } from "./commonUtils";

axios.defaults.headers.post["Content-Type"] = "application/json";
HTTP.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

//Automating access token refreshing via interceptors in axios in case multiple requests
//Please refer this link to know more https://github.com/axios/axios/issues/266#issuecomment-407940602
let isRefreshing = false;
let failedQueue = [];
const processQueue = (error, token = null) => {
  failedQueue.forEach(promise => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });

  failedQueue = [];
};

HTTP.interceptors.response.use(
  response => {
    if (response.data.succeeded) return response;
    else {
      showMsgError(response);
    }
  },
  function (error) {
    const originalRequest = error.config;
    // all the other error responses
    switch (error.response.status) {
      case 400:
      case 500:
        showMsgError(error.response);
        break;
      case 401: // authentication error, logout the user
        if (!originalRequest._retry) {
          if (isRefreshing) {
            return new Promise(function (resolve, reject) {
              failedQueue.push({resolve, reject});
            })
              .then(token => {
                originalRequest.headers["Authorization"] = "Bearer " + token;
                return HTTP(originalRequest);
              })
              .catch(err => {
                return Promise.reject(err);
              });
          }

          isRefreshing = true;
          originalRequest._retry = true;

          const accessToken = getValueFromStorageByKey(
            LOCAL_STORAGE_KEY.ACCESS_TOKEN
          );
          const refreshToken = getValueFromStorageByKey(
            LOCAL_STORAGE_KEY.REFRESH_TOKEN
          );
          if (refreshToken) {
            return new Promise(function (resolve, reject) {
              HTTP.post(ENDPOINT.AUTH.REFRESH_TOKEN, {
                accessToken: accessToken,
                refreshToken
              })
                .then(({response}) => {
                  if (response.data.Succeeded && response.data.accessToken) {
                    setValueToStorageByKey(
                      LOCAL_STORAGE_KEY.ACCESS_TOKEN,
                      response.data.accessToken
                    );
                    setValueToStorageByKey(
                      LOCAL_STORAGE_KEY.REFRESH_TOKEN,
                      response.data.refreshToken
                    );
                    HTTP.defaults.headers["Authorization"] =
                      "Bearer " + response.data.accessToken;
                    originalRequest.headers.Authorization =
                      "Bearer " + response.data.accessToken;
                    processQueue(null, response.data.accessToken);
                    return resolve(HTTP(originalRequest));
                  } else {
                    Vue.toasted.clear();
                    if (!_isEmpty(response.Errors[0].Description)) {
                      Vue.toasted.global.showErrorMessage({
                        message: response.Errors[0].Description,
                      });
                    }
                    removeValueToStorageByKey(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
                    removeValueToStorageByKey(LOCAL_STORAGE_KEY.REFRESH_TOKEN);
                    store.dispatch("common/setIsLogin", false);
                    router.push({path: ROUTE_NAME.DANG_NHAP});
                  }
                })
                .catch(errorResponse => {
                  processQueue(errorResponse, null);
                  reject(errorResponse);
                  Vue.toasted.clear();
                  if (!_isEmpty(errorResponse.response)) {
                    showMsgError(errorResponse.response.data.message);
                  }
                  removeValueToStorageByKey(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
                  removeValueToStorageByKey(LOCAL_STORAGE_KEY.REFRESH_TOKEN);
                  store.dispatch("common/setIsLogin", false);
                  router.push({path: ROUTE_NAME.DANG_NHAP});
                })
                .then(() => {
                  isRefreshing = false;
                });
            });
          } else {
            removeValueToStorageByKey(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
            removeValueToStorageByKey(LOCAL_STORAGE_KEY.REFRESH_TOKEN);
            store.dispatch("common/setIsLogin", false);
            router.push({path: ROUTE_NAME.DANG_NHAP});
          }
        } else {
          router.push({path: ROUTE_NAME._401});
        }
        break;
      case 403:
        router.push({path: ROUTE_NAME._403});
        break;
      case 404:
        router.push({path: ROUTE_NAME._404});
        break;
      default:
        showMsgError(error.response);
        removeValueToStorageByKey(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
        removeValueToStorageByKey(LOCAL_STORAGE_KEY.REFRESH_TOKEN);
        store.dispatch("common/setIsLogin", false);
        router.push({path: ROUTE_NAME.DANG_NHAP});
    }
    return Promise.reject(error);
  }
);
