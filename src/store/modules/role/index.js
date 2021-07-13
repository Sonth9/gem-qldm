import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const state = {
  danhSachVaiTro: [],
  danhSachQuyenTheoVaiTro: [],
  danhSachQuyenKhongThuocVaiTro: [],
  danhSachNguoiDungTheoVaiTro: [],
  danhSachNguoiDungKhongThuocVaiTro: [],
  chiTietVaiTro: {}
};
export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
