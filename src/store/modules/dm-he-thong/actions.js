import {
  callApiCapNhatThuTu,
  callApiLayDanhSachDanhMucHeThong,
  callApiSuaDanhMucHeThong,
  callApiTaoDanhMucHeThong,
  callApiXoaDanhMucHeThong
} from "@/api/dm-he-thong";
import {
  SUA_DM_HE_THONG_THANH_CONG,
  THEM_DM_HE_THONG_THANH_CONG,
  XOA_DM_HE_THONG_THANH_CONG
} from "@/constants/message";
import { showMsgOk } from "@/utils/commonUtils";

const layDanhSachdmHeThong = async ({ commit }, payload) => {
  const response = await callApiLayDanhSachDanhMucHeThong(payload);
  if (response && response.data.succeeded) {
    commit("LAY_DANH_SACH_DM_HE_THONG_THANH_CONG", response.data.data);
  }
};

const themDanhMucHeThong = async ({ commit }, payload) => {
  const response = await callApiTaoDanhMucHeThong(payload.data);
  if (response && response.data.succeeded) {
    showMsgOk(THEM_DM_HE_THONG_THANH_CONG);
    commit("THEM_MOI_DM_HE_THONG_THANH_CONG", response.data.data);
    payload.onSuccess();
  }
};

const suaDanhMucHeThong = async ({ commit }, payload) => {
  const response = await callApiSuaDanhMucHeThong(payload.data);
  if (response && response.data.succeeded) {
    showMsgOk(SUA_DM_HE_THONG_THANH_CONG);
    commit("SUA_DM_HE_THONG_THANH_CONG", response.data.data);
    payload.onSuccess();
  }
};

// eslint-disable-next-line no-empty-pattern
const xoaDanhMucHeThong = async ({}, payload) => {
  const response = await callApiXoaDanhMucHeThong(payload.data);
  if (response && response.data.succeeded) {
    showMsgOk(XOA_DM_HE_THONG_THANH_CONG);
    payload.onSuccess();
  }
};

// eslint-disable-next-line no-empty-pattern
const capNhatThuTu = async ({}, payload) => {
  const response = await callApiCapNhatThuTu(payload.data);
  if (response && response.data.succeeded) {
    // payload.onSuccess();
  }
};
export default {
  layDanhSachdmHeThong,
  themDanhMucHeThong,
  suaDanhMucHeThong,
  xoaDanhMucHeThong,
  capNhatThuTu
};
