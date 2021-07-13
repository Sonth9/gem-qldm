const SET_DANH_SACH_QUAN_LY_LOAI = (state, danhSachQuanLyLoai) => {
  state.danhSachQuanLyLoai = danhSachQuanLyLoai;
};

const SET_DANH_SACH_QUAN_LY_NGUON = (state, danhSachQuanLyNguon) => {
  state.danhSachQuanLyNguon = danhSachQuanLyNguon;
};

const SET_DANH_SACH_QUAN_LY_THONG_BAO = (state, danhSachQuanLyThongBao) => {
  state.danhSachQuanLyThongBao = danhSachQuanLyThongBao;
};

const SET_DANH_SACH_LICH_SU_THAO_TAC = (state, lichSuThaoTac) => {
  state.lichSuThaoTac = lichSuThaoTac;
};


// THÔNG BÁO TÙY CHỈNH
const SET_DANH_SACH_THONG_BAO = (state, danhSachThongBao) => {
  state.danhSachThongBao = danhSachThongBao;
};
const SET_CHI_TIET_THONG_BAO = (state, chiTietThongBao) => {
  state.chiTietThongBao = chiTietThongBao;
};

export default {
  SET_DANH_SACH_QUAN_LY_LOAI,
  SET_DANH_SACH_QUAN_LY_NGUON,
  SET_DANH_SACH_QUAN_LY_THONG_BAO,
  SET_DANH_SACH_LICH_SU_THAO_TAC,

  // THÔNG BÁO TÙY CHỈNH
  SET_DANH_SACH_THONG_BAO,
  SET_CHI_TIET_THONG_BAO
};
