const LAY_DANH_SACH_DM_HE_THONG_THANH_CONG = (
  state,
  danhSachDanhMucHeThong
) => {
  state.danhSachDanhMucHeThong = danhSachDanhMucHeThong;
};
const THEM_MOI_DM_HE_THONG_THANH_CONG = (state, danhMucHeThong) => {
  state.danhSachDanhMucHeThong.push(danhMucHeThong);
};

const SUA_DM_HE_THONG_THANH_CONG = (state, danhMucHeThong) => {
  const editItemIndex = state.danhSachDanhMucHeThong.findIndex(
    obj => obj.id === parseInt(danhMucHeThong.id)
  );
  state.danhSachDanhMucHeThong[editItemIndex] = Object.assign(
    state.danhSachDanhMucHeThong[editItemIndex],
    danhMucHeThong
  );
};

export default {
  LAY_DANH_SACH_DM_HE_THONG_THANH_CONG,
  THEM_MOI_DM_HE_THONG_THANH_CONG,
  SUA_DM_HE_THONG_THANH_CONG
};
