const isLogin = state => state.isLogin;
const user = state => state.user;
const permissions = state => state.permissions;
const breadcrumb = state => state.breadcrumb;

export default {
  isLogin,
  breadcrumb,
  user,
  permissions
};
