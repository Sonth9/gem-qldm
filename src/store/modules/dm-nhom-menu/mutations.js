const LAY_DANH_SACH_NHOM_MENU_THANH_CONG = (state, danhSachNhomMenu) => {
  state.danhSachNhomMenu = danhSachNhomMenu;
};

const LAY_CHI_TIET_NHOM_MENU_THANH_CONG = (state, nhomMenu) => {
  state.nhomMenu = nhomMenu;
};

const LAY_QUYEN_NHOM_MENU_THANH_CONG = (state, quyenNhomMenu) => {
  state.quyenNhomMenu = quyenNhomMenu;
}

const LAY_NGUOI_DUNG_NHOM_MENU_THANH_CONG = (state, nguoiDungNhomMenu) => {
  state.nguoiDungNhomMenu = nguoiDungNhomMenu
}

export default {
  LAY_DANH_SACH_NHOM_MENU_THANH_CONG,
  LAY_CHI_TIET_NHOM_MENU_THANH_CONG,
  LAY_QUYEN_NHOM_MENU_THANH_CONG,
  LAY_NGUOI_DUNG_NHOM_MENU_THANH_CONG
};
