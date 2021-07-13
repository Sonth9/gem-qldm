import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const state = {
  chiTietDonVi: {},
  danhSachDonVi: [],
  danhSachDonViPhanTrang: {
    items: []
  },
  danhSachDonViCon: [],
  cayDonVi: []
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
