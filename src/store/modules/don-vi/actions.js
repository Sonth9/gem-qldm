import {
  callApiCapNhatThuTu,
  callApiLayCayDonVi,
  callApiLayChiTietDonVi,
  callApiLayDanhSachDonVi,
  callApiLayDanhSachDonViPhanTrang,
  callApiLayDanhSachTheoDonViCha,
  callApiSuaDonVi,
  callApiTaoDonVi,
  callApiXoaDonVi
} from "@/api/don-vi";
import {
  CAP_NHAT_DON_VI_THANH_CONG,
  TAO_DON_VI_THANH_CONG,
  XOA_DON_VI_THANH_CONG
} from "@/constants/message";
import { showMsgOk } from "@/utils/commonUtils";

// eslint-disable-next-line no-unused-vars
const layDanhSachDonVi = async ({ commit }, payload) => {
  const response = await callApiLayDanhSachDonVi(payload);
  if (response && response.data.succeeded) {
    commit("LAY_DANH_SACH_DON_VI_THANH_CONG", response.data.data);
  }
};

const layDanhSachTheoDonViCha = async ({ commit }, payload) => {
  const response = await callApiLayDanhSachTheoDonViCha(payload);
  if (response && response.data.succeeded) {
    commit("LAY_DANH_SACH_THEO_DON_VI_CHA_THANH_CONG", response.data.data);
    return response.data.data;
  }
};

const layDanhSachDonViPhanTrang = async ({ commit }, payload) => {
  const response = await callApiLayDanhSachDonViPhanTrang(payload);
  if (response && response.data.succeeded) {
    commit("LAY_DANH_SACH_DON_VI_PHAN_TRANG_THANH_CONG", response.data.data);
  }
};

const layCayDonVi = async ({ commit }, payload) => {
  const response = await callApiLayCayDonVi(payload);
  if (response && response.data.succeeded) {
    commit("LAY_CAY_DON_VI_THANH_CONG", response.data.data);
  }
};

// eslint-disable-next-line no-empty-pattern
const layChiTietDonVi = async ({ commit }, payload) => {
  const response = await callApiLayChiTietDonVi(payload.data);
  if (response && response.data.succeeded) {
    commit("LAY_CHI_TIET_DON_VI_THANH_CONG", response.data.data);
    payload.onSuccess(response.data.data);
  }
};

// eslint-disable-next-line no-empty-pattern
const themDonVi = async ({ commit }, payload) => {
  const response = await callApiTaoDonVi(payload.data);
  if (response && response.data.succeeded) {
    showMsgOk(TAO_DON_VI_THANH_CONG);
    commit("THEM_MOI_DON_VI_THANH_CONG", response.data.data);
    payload.onSuccess();
  }
};

// eslint-disable-next-line no-empty-pattern
const suaDonVi = async ({ commit }, payload) => {
  const response = await callApiSuaDonVi(payload.data);
  if (response && response.data.succeeded) {
    showMsgOk(CAP_NHAT_DON_VI_THANH_CONG);
    commit("CAP_NHAT_DON_VI_THANH_CONG", response.data.data);
    payload.onSuccess();
  }
};

// eslint-disable-next-line no-empty-pattern
const xoaDonVi = async ({}, payload) => {
  const response = await callApiXoaDonVi(payload.data);
  if (response && response.data.succeeded) {
    showMsgOk(XOA_DON_VI_THANH_CONG);
    payload.onSuccess();
  }
};

// eslint-disable-next-line no-empty-pattern
const capNhatThuTu = async ({}, payload) => {
  const response = await callApiCapNhatThuTu(payload.data);
  if (response && response.data.succeeded) {
    payload.onSuccess();
  }
};

export default {
  layChiTietDonVi,
  layDanhSachDonVi,
  layDanhSachTheoDonViCha,
  layDanhSachDonViPhanTrang,
  layCayDonVi,
  themDonVi,
  suaDonVi,
  xoaDonVi,
  capNhatThuTu
};
