const LAY_DANH_SACH_DON_VI_THANH_CONG = (state, danhSachDonVi) => {
  state.danhSachDonVi = danhSachDonVi;
};
const LAY_DANH_SACH_THEO_DON_VI_CHA_THANH_CONG = (state, danhSachDonVi) => {
  state.danhSachDonViCon = danhSachDonVi;
};
const LAY_DANH_SACH_DON_VI_PHAN_TRANG_THANH_CONG = (state, danhSachDonVi) => {
  state.danhSachDonViPhanTrang = danhSachDonVi;
};
const LAY_CAY_DON_VI_THANH_CONG = (state, cayDonVi) => {
  state.cayDonVi = cayDonVi;
};

const LAY_CHI_TIET_DON_VI_THANH_CONG = (state, donvi) => {
  state.chiTietDonVi = donvi;
};

const THEM_MOI_DON_VI_THANH_CONG = (state, donVi) => {
  state.danhSachDonViPhanTrang.items.push(donVi);
  state.danhSachDonViPhanTrang.totalCount += 1;
  state.danhSachDonVi.push(donVi);
};

const CAP_NHAT_DON_VI_THANH_CONG = (state, donVi) => {
  const editItemIndex1 = state.danhSachDonViPhanTrang.items.findIndex(
    obj => obj.id === parseInt(donVi.id)
  );
  state.danhSachDonViPhanTrang.items[editItemIndex1] = donVi;

  const editItemIndex2 = state.danhSachDonVi.findIndex(
    obj => obj.id === parseInt(donVi.id)
  );
  state.danhSachDonVi[editItemIndex2] = donVi;
};

export default {
  LAY_CHI_TIET_DON_VI_THANH_CONG,
  LAY_DANH_SACH_DON_VI_THANH_CONG,
  LAY_DANH_SACH_DON_VI_PHAN_TRANG_THANH_CONG,
  THEM_MOI_DON_VI_THANH_CONG,
  CAP_NHAT_DON_VI_THANH_CONG,
  LAY_DANH_SACH_THEO_DON_VI_CHA_THANH_CONG,
  LAY_CAY_DON_VI_THANH_CONG
};
