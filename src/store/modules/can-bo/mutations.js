const LAY_DANH_SACH_CAN_BO_THANH_CONG = (state, danhSachCanBo) => {
  state.danhSachCanBo = danhSachCanBo;
};

const LAY_DANH_SACH_LANH_DAO_THANH_CONG = (state, danhSachLanhDao) => {
  state.danhSachLanhDao = danhSachLanhDao;
};

const LAY_CHI_TIET_CAN_BO_THANH_CONG = (state, canBo) => {
  state.canBo = canBo;
};
const LAY_MENU_CAN_BO_THANH_CONG = (state, menu) => {
  state.danhSachMenu = menu;
};
const TAO_CAN_BO_THANH_CONG = (state, canBo) => {
  state.danhSachCanBo.push(canBo);
};

const CAP_NHAT_CAN_BO_THANH_CONG = (state, canBo) => {
  const editItemIndex = state.danhSachCanBo.items.findIndex(
    obj => obj.id === parseInt(canBo.id)
  );
  state.danhSachCanBo.items[editItemIndex] = canBo;
};

const XOA_CAN_BO_THANH_CONG = (state, canBo) => {
  state.danhSachCanBo.splice(state.danhSachCanBo.indexOf(canBo), 1);
};

const UPLOAD_THANH_CONG = (state, data) => {
  if (data.fieldUpload) state.canBo[data.fieldUpload] = data.filePath;
};

const setCheckedAllToPage = (state, data) => {
  if(!data){
    state.checkAllToPage = [];
  }
  if(data.status){
    state.checkAllToPage.push(data.page)
  }else{
    state.checkAllToPage = state.checkAllToPage.filter(item => item != data.page)
  }
};

export default {
  LAY_DANH_SACH_CAN_BO_THANH_CONG,
  LAY_DANH_SACH_LANH_DAO_THANH_CONG,
  TAO_CAN_BO_THANH_CONG,
  CAP_NHAT_CAN_BO_THANH_CONG,
  XOA_CAN_BO_THANH_CONG,
  LAY_CHI_TIET_CAN_BO_THANH_CONG,
  LAY_MENU_CAN_BO_THANH_CONG,
  UPLOAD_THANH_CONG,
  setCheckedAllToPage
};
