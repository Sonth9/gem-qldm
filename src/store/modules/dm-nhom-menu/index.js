import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const state = {
  danhSachNhomMenu: {
    items: [],
    pageIndex: 1,
    pageSize: 10,
    totalPage: 1,
    totalCount: 0
  },
  nhomMenu: {},
  nguoiDungNhomMenu: [],
  quyenNhomMenu: []
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
