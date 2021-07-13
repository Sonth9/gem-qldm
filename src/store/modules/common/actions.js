import { callApiDangNhap } from "@/api/common";

const setIsLogin = (context, isLogin) => {
  context.commit("SET_IS_LOGIN", isLogin);
};
const login = (context, payload) => {
  return callApiDangNhap(payload);
};
const setBreadcrumb = (context, breadcrumb) => {
  context.commit("SET_BREADCRUMB", breadcrumb);
};

export default {
  setIsLogin,
  login,
  setBreadcrumb
};
