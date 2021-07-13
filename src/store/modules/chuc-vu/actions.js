import {
  callApiCapNhatThuTu,
  callApiLayDanhSachChucVu,
  callApiSuaChucVu,
  callApiTaoChucVu,
  callApiXoaChucVu
} from "@/api/chuc-vu";
import {
  SUA_CHUC_VU_THANH_CONG,
  THEM_MOI_CHUC_VU_THANH_CONG,
  XOA_CHUC_VU_THANH_CONG
} from "@/constants/message";
import { showMsgOk } from "@/utils/commonUtils";

const layDanhSachChucVu = async ({ commit }, payload) => {
  const response = await callApiLayDanhSachChucVu(payload);
  if (response && response.data.succeeded) {
    commit("LAY_DANH_SACH_CHUC_VU_THANH_CONG", response.data.data);
  }
};

const themChucVu = async ({ commit }, payload) => {
  const response = await callApiTaoChucVu(payload.data);
  if (response && response.data.succeeded) {
    showMsgOk(THEM_MOI_CHUC_VU_THANH_CONG);
    commit("THEM_MOI_CHUC_VU_THANH_CONG", response.data.data);
    payload.onSuccess();
  }
};

const suaChucVu = async ({ commit }, payload) => {
  const response = await callApiSuaChucVu(payload.data);
  if (response && response.data.succeeded) {
    showMsgOk(SUA_CHUC_VU_THANH_CONG);
    commit("SUA_CHUC_VU_THANH_CONG", response.data.data);
    payload.onSuccess();
  }
};

// eslint-disable-next-line no-empty-pattern
const xoaChucVu = async ({}, payload) => {
  const response = await callApiXoaChucVu(payload.data);
  if (response && response.data.succeeded) {
    showMsgOk(XOA_CHUC_VU_THANH_CONG);
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
  layDanhSachChucVu,
  themChucVu,
  suaChucVu,
  xoaChucVu,
  capNhatThuTu
};
