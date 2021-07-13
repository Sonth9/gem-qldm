const SET_DANH_SACH_NGUOI_DUNG_THEO_DANH_SACH_DON_VI = (
  state,
  danhSachNguoiDungTheoDanhSachDonVi
) => {
  state.danhSachNguoiDungTheoDanhSachDonVi = danhSachNguoiDungTheoDanhSachDonVi;
};

const SET_CHI_TIET_NGUOI_DUNG = (state, chiTietNguoiDung) => {
  state.chiTietNguoiDung = chiTietNguoiDung;
};

const SET_NGUOI_DUNG_GOM_QUYEN = (state, nguoiDungGomQuyen) => {
  state.nguoiDungGomQuyen = nguoiDungGomQuyen;
};

const SET_DANH_SACH_VAI_TRO_THEO_NGUOI_DUNG = (
  state,
  danhSachVaiTroTheoNguoiDung
) => {
  state.danhSachVaiTroTheoNguoiDung = danhSachVaiTroTheoNguoiDung;
};

const SET_DANH_SACH_VAI_TRO_KHONG_THUOC_NGUOI_DUNG = (
  state,
  danhSachVaiTroKhongThuocNguoiDung
) => {
  state.danhSachVaiTroKhongThuocNguoiDung = danhSachVaiTroKhongThuocNguoiDung;
};

const SET_DANH_SACH_QUYEN_THEO_NGUOI_DUNG = (
  state,
  danhSachQuyenTheoNguoiDung
) => {
  state.danhSachQuyenTheoNguoiDung = danhSachQuyenTheoNguoiDung;
};

const SET_DANH_SACH_QUYEN_KHONG_THUOC_NGUOI_DUNG = (
  state,
  danhSachQuyenKhongThuocNguoiDung
) => {
  state.danhSachQuyenKhongThuocNguoiDung = danhSachQuyenKhongThuocNguoiDung;
};

export default {
  SET_DANH_SACH_NGUOI_DUNG_THEO_DANH_SACH_DON_VI,
  SET_DANH_SACH_VAI_TRO_THEO_NGUOI_DUNG,
  SET_DANH_SACH_VAI_TRO_KHONG_THUOC_NGUOI_DUNG,
  SET_DANH_SACH_QUYEN_THEO_NGUOI_DUNG,
  SET_DANH_SACH_QUYEN_KHONG_THUOC_NGUOI_DUNG,
  SET_CHI_TIET_NGUOI_DUNG,
  SET_NGUOI_DUNG_GOM_QUYEN
};
