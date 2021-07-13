import { HTTP } from "@/api/http-common";
import ENDPOINT from "@/api/endpoints";

export function callApiDangNhap(payload) {
  return new Promise((resolve, reject) => {
    HTTP.defaults.headers = {};
    return HTTP.post(ENDPOINT.AUTH.DANG_NHAP, payload)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function callApiRefreshToken(payload) {
  return new Promise((resolve, reject) => {
    HTTP.defaults.headers = {};
    return HTTP.post(ENDPOINT.AUTH.REFRESH_TOKEN, payload)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}
