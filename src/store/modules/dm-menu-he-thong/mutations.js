const LAY_DANH_SACH_DM_MENU_HE_THONG_THANH_CONG = (state, danhSachMenu) => {
  state.danhSachDanhMucMenuHeThong = danhSachMenu;
};

const LAY_CAY_DM_MENU_HE_THONG_THANH_CONG = (state, cayMenu) => {
  state.cayDanhMucMenu = cayMenu;
};

export default {
  LAY_DANH_SACH_DM_MENU_HE_THONG_THANH_CONG,
  LAY_CAY_DM_MENU_HE_THONG_THANH_CONG
};
