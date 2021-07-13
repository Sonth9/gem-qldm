import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const state = {
  canBo: {
    chucVuDetail: {},
    donViDetail: {}
  },
  danhSachCanBo: {
    items: [],
    pageIndex: 1,
    pageSize: 10,
    totalCount: 10,
    totalPage: 1
  },
  danhSachLanhDao: {
    items: [],
    pageIndex: 1,
    pageSize: 10,
    totalCount: 10,
    totalPage: 1
  },
  danhSachMenu: []
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
