const SET_DANH_SACH_VAI_TRO = (state, danhSachVaiTro) => {
  state.danhSachVaiTro = danhSachVaiTro;
};

const SET_CHI_TIET_VAI_TRO = (state, chiTietVaiTro) => {
  state.chiTietVaiTro = chiTietVaiTro;
};

const SET_DANH_SACH_QUYEN_THEO_VAI_TRO = (state, danhSachQuyenTheoVaiTro) => {
  state.danhSachQuyenTheoVaiTro = danhSachQuyenTheoVaiTro;
};

const SET_DANH_SACH_NGUOI_DUNG_THEO_VAI_TRO = (
  state,
  danhSachNguoiDungTheoVaiTro
) => {
  state.danhSachNguoiDungTheoVaiTro = danhSachNguoiDungTheoVaiTro;
};

const SET_DANH_SACH_NGUOI_DUNG_KHONG_THUOC_VAI_TRO = (
  state,
  danhSachNguoiDungKhongThuocVaiTro
) => {
  state.danhSachNguoiDungKhongThuocVaiTro = danhSachNguoiDungKhongThuocVaiTro;
};

const SET_DANH_SACH_QUYEN_KHONG_THUOC_VAI_TRO = (
  state,
  danhSachQuyenKhongThuocVaiTro
) => {
  state.danhSachQuyenKhongThuocVaiTro = danhSachQuyenKhongThuocVaiTro;
};

export default {
  SET_DANH_SACH_VAI_TRO,
  SET_CHI_TIET_VAI_TRO,
  SET_DANH_SACH_QUYEN_THEO_VAI_TRO,
  SET_DANH_SACH_NGUOI_DUNG_THEO_VAI_TRO,
  SET_DANH_SACH_NGUOI_DUNG_KHONG_THUOC_VAI_TRO,
  SET_DANH_SACH_QUYEN_KHONG_THUOC_VAI_TRO
};
