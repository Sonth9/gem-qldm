import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

const state = {
  danhSachQuanLyLoai: [],
  danhSachQuanLyNguon: [],
  danhSachQuanLyThongBao: [],
  lichSuThaoTac: [],
  loaiThongBao: [
    {
      id: 0,
      name: "Tất cả"
    },
    {
      id: 1,
      name: "Nháp"
    },
    {
      id: 2,
      name: "Chờ duyệt"
    },
    {
      id: 3,
      name: "Từ chối duyệt"
    },
    {
      id: 4,
      name: "Đã duyệt"
    },
    {
      id: 5,
      name: "Đã đăng"
    }
  ],

  // THÔNG BÁO TÙY CHỈNH
  danhSachThongBao: [],
  chiTietThongBao: {}
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
};
