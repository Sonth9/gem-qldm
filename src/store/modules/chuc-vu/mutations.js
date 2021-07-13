const LAY_DANH_SACH_CHUC_VU_THANH_CONG = (state, danhSachChucVu) => {
  state.danhSachChucVu = danhSachChucVu;
};

const THEM_MOI_CHUC_VU_THANH_CONG = (state, chucVu) => {
  state.danhSachChucVu.push(chucVu);
};

const SUA_CHUC_VU_THANH_CONG = (state, chucVu) => {
  const editItemIndex = state.danhSachChucVu.findIndex(
    obj => obj.id === parseInt(chucVu.id)
  );
  state.danhSachChucVu[editItemIndex] = Object.assign(
    state.danhSachChucVu[editItemIndex],
    chucVu
  );
};

export default {
  LAY_DANH_SACH_CHUC_VU_THANH_CONG,
  THEM_MOI_CHUC_VU_THANH_CONG,
  SUA_CHUC_VU_THANH_CONG
};
