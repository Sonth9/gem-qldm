import { clearAll } from "@/utils/localStorage";

const SET_IS_LOGIN = (state, isLogin) => {
  state.isLogin = isLogin;
  if (!isLogin) {
    clearAll();
  }
};
const SET_BREADCRUMB = (state, breadcrum) => {
  state.breadcrumb = breadcrum;
};
const SET_USER_INFO = (state, user) => {
  state.user = user;
};

const SET_PERMISSIONS = (state, permissions) => {
  state.permissions = permissions;
};
export default {
  SET_IS_LOGIN,
  SET_BREADCRUMB,
  SET_USER_INFO,
  SET_PERMISSIONS
};
