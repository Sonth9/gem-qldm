import {
  callApiCapNhatThuTu,
  callApiLayDanhSachNhomChucVu,
  callApiSuaNhomChucVu,
  callApiTaoNhomChucVu,
  callApiXoaNhomChucVu
} from "@/api/nhom-chuc-vu";
import {
  SUA_NHOM_CHUC_VU_THANH_CONG,
  THEM_MOI_NHOM_CHUC_VU_THANH_CONG,
  XOA_NHOM_CHUC_VU_THANH_CONG
} from "@/constants/message";
import { showMsgOk } from "@/utils/commonUtils";

const layDanhSachNhomChucVu = async ({ commit }, payload) => {
  const response = await callApiLayDanhSachNhomChucVu(payload);
  if (response && response.data.succeeded) {
    commit("LAY_DANH_SACH_NHOM_CHUC_VU_THANH_CONG", response.data.data);
  }
};

const themNhomChucVu = async ({ commit }, payload) => {
  const response = await callApiTaoNhomChucVu(payload.data);
  if (response && response.data.succeeded) {
    showMsgOk(THEM_MOI_NHOM_CHUC_VU_THANH_CONG);
    commit("THEM_MOI_NHOM_CHUC_VU_THANH_CONG", response.data.data);
    payload.onSuccess();
  }
};

const suaNhomChucVu = async ({ commit }, payload) => {
  const response = await callApiSuaNhomChucVu(payload.data);
  if (response && response.data.succeeded) {
    showMsgOk(SUA_NHOM_CHUC_VU_THANH_CONG);
    commit("SUA_NHOM_CHUC_VU_THANH_CONG", response.data.data);
    payload.onSuccess();
  }
};

// eslint-disable-next-line no-empty-pattern
const xoaNhomChucVu = async ({}, payload) => {
  const response = await callApiXoaNhomChucVu(payload.data);
  if (response && response.data.succeeded) {
    showMsgOk(XOA_NHOM_CHUC_VU_THANH_CONG);
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
  layDanhSachNhomChucVu,
  themNhomChucVu,
  suaNhomChucVu,
  xoaNhomChucVu,
  capNhatThuTu
};
