const LAY_DANH_SACH_NHOM_CHUC_VU_THANH_CONG = (state, danhSachNhomChucVu) => {
  state.danhSachNhomChucVu = danhSachNhomChucVu;
};
const THEM_MOI_NHOM_CHUC_VU_THANH_CONG = (state, nhomChucVu) => {
  state.danhSachNhomChucVu.push(nhomChucVu);
};

const SUA_NHOM_CHUC_VU_THANH_CONG = (state, nhomChucVu) => {
  const editItemIndex = state.danhSachNhomChucVu.findIndex(
    obj => obj.id === parseInt(nhomChucVu.id)
  );
  state.danhSachNhomChucVu[editItemIndex] = Object.assign(
    state.danhSachNhomChucVu[editItemIndex],
    nhomChucVu
  );
};

export default {
  LAY_DANH_SACH_NHOM_CHUC_VU_THANH_CONG,
  THEM_MOI_NHOM_CHUC_VU_THANH_CONG,
  SUA_NHOM_CHUC_VU_THANH_CONG
};
