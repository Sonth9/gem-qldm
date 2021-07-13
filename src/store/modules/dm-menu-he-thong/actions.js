import {
  callApiCapNhatThuTu,
  callApiLayCayDanhMucMenuHeThong,
  callApiLayDanhSachDanhMucMenuHeThong,
  callApiSuaDanhMucMenuHeThong,
  callApiTaoDanhMucMenuHeThong,
  callApiXoaDanhMucMenuHeThong
} from "@/api/dm-menu-he-thong";
import {
  SUA_DM_MENU_HE_THONG_THANH_CONG,
  THEM_DM_MENU_HE_THONG_THANH_CONG,
  XOA_DM_MENU_HE_THONG_THANH_CONG,
  CAP_NHAT_THU_TU_THANH_CONG
} from "@/constants/message";
import { showMsgOk } from "@/utils/commonUtils";

const layDanhSachDanhMucMenuHeThong = async ({ commit }, payload) => {
  const response = await callApiLayDanhSachDanhMucMenuHeThong(payload);
  if (response && response.data.succeeded) {
    commit("LAY_DANH_SACH_DM_MENU_HE_THONG_THANH_CONG", response.data.data);
  }
};

const layCayDanhMucMenuHeThong = async ({ commit }, payload) => {
  const response = await callApiLayCayDanhMucMenuHeThong(payload);
  if (response && response.data.succeeded) {
    commit("LAY_CAY_DM_MENU_HE_THONG_THANH_CONG", response.data.data);
  }
};

// eslint-disable-next-line no-empty-pattern
const themDanhMucMenuHeThong = async ({}, payload) => {
  const response = await callApiTaoDanhMucMenuHeThong(payload.data);
  if (response && response.data.succeeded) {
    showMsgOk(THEM_DM_MENU_HE_THONG_THANH_CONG);
    payload.onSuccess();
  }
};

// eslint-disable-next-line no-empty-pattern
const suaDanhMucMenuHeThong = async ({}, payload) => {
  const response = await callApiSuaDanhMucMenuHeThong(payload.data);
  if (response && response.data.succeeded) {
    showMsgOk(SUA_DM_MENU_HE_THONG_THANH_CONG);
    payload.onSuccess();
  }
};

// eslint-disable-next-line no-empty-pattern
const xoaDanhMucMenuHeThong = async ({}, payload) => {
  const response = await callApiXoaDanhMucMenuHeThong(payload.data);
  if (response && response.data.succeeded) {
    showMsgOk(XOA_DM_MENU_HE_THONG_THANH_CONG);
    payload.onSuccess();
  }
};

// eslint-disable-next-line no-empty-pattern
const capNhatThuTu = async ({}, payload) => {
  const response = await callApiCapNhatThuTu(payload.data);
  if (response && response.data.succeeded) {
    showMsgOk(CAP_NHAT_THU_TU_THANH_CONG);
    // payload.onSuccess();
  }
};
export default {
  layDanhSachDanhMucMenuHeThong,
  layCayDanhMucMenuHeThong,
  themDanhMucMenuHeThong,
  suaDanhMucMenuHeThong,
  xoaDanhMucMenuHeThong,
  capNhatThuTu
};
