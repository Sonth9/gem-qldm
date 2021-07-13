import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";
import {
  LOCAL_STORAGE_KEY,
  getValueFromStorageByKey
} from "@/utils/localStorage";

const checkLogin = () => {
  return getValueFromStorageByKey("isLogin") === true;
};
const getUser = () => {
  return getValueFromStorageByKey(LOCAL_STORAGE_KEY.USER_INFO);
};

const getPermissions = () => {
  return getValueFromStorageByKey(LOCAL_STORAGE_KEY.PERMISSIONS);
};

const state = {
  isLogin: checkLogin(),
  user: getUser(),
  permissions: getPermissions(),
  breadcrumb: ""
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
