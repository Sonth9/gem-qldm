import {
  callApiCapNhatCanBo,
  callApiCapNhatMenuCanBo,
  callApiChuyenCongTac,
  callAPiLayChiTietCanBo,
  callAPiLayDanhSachCanBo,
  callAPiLayMenuCanBo,
  callApiTaoCanBo,
  callApiThemCanBoVaoNguoiDung,
  callApiUpload,
  callApiXoaCanBo,
  callApiXoaNguoiDung
} from "@/api/can-bo";
import {
  CAP_NHAT_CAN_BO_THANH_CONG,
  CAP_NHAT_MENU_CAN_BO_THANH_CONG,
  CHUYEN_CONG_TAC_THANH_CONG,
  TAO_CAN_BO_THANH_CONG,
  UPLOAD_THANH_CONG,
  XOA_CAN_BO_THANH_CONG
} from "@/constants/message";
import { showMsgOk } from "@/utils/commonUtils";

// eslint-disable-next-line no-unused-vars
const layDanhSachCanBo = async ({commit}, payload) => {
  const response = await callAPiLayDanhSachCanBo(payload);
  if (response && response.data.succeeded) {
    commit("LAY_DANH_SACH_CAN_BO_THANH_CONG", response.data.data);
  }
};

// eslint-disable-next-line no-unused-vars
const layDanhSachLanhDao = async ({commit}, payload) => {
  const response = await callAPiLayDanhSachCanBo(payload);
  if (response && response.data.succeeded) {
    commit("LAY_DANH_SACH_LANH_DAO_THANH_CONG", response.data.data);
  }
};

// eslint-disable-next-line no-unused-vars
const layChiTietCanBo = async ({commit}, payload) => {
  const response = await callAPiLayChiTietCanBo(payload);
  if (response && response.data.succeeded) {
    commit("LAY_CHI_TIET_CAN_BO_THANH_CONG", response.data.data);
  }
};

const layDanhSachMenu = async ({commit}, payload) => {
  const response = await callAPiLayMenuCanBo(payload);
  if (response && response.data.succeeded) {
    commit("LAY_MENU_CAN_BO_THANH_CONG", response.data.data);
  }
};

const taoCanBo = async ({commit}, payload) => {
  const response = await callApiTaoCanBo(payload.data);
  if (response && response.data.succeeded) {
    showMsgOk(TAO_CAN_BO_THANH_CONG);
    payload.onSuccess();
    commit("TAO_CAN_BO_THANH_CONG", response.data.data);
  }
};

const capNhatCanBo = async ({commit}, payload) => {
  const response = await callApiCapNhatCanBo(payload.data);
  if (response && response.data.succeeded) {
    showMsgOk(CAP_NHAT_CAN_BO_THANH_CONG);
    payload.onSuccess();
    commit("CAP_NHAT_CAN_BO_THANH_CONG", response.data.data);
  }
};

const chuyenCongTac = async ({commit}, payload) => {
  const response = await callApiChuyenCongTac(payload.data);
  if (response && response.data.succeeded) {
    showMsgOk(CHUYEN_CONG_TAC_THANH_CONG);
    payload.onSuccess();
  }
};

const themCanBoVaoNguoiDung = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiThemCanBoVaoNguoiDung(payload)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  })
};

// eslint-disable-next-line no-empty-pattern
const xoaCanBo = async ({}, payload) => {
  const response = await callApiXoaCanBo(payload.data);
  if (response && response.data.succeeded) {
    showMsgOk(XOA_CAN_BO_THANH_CONG);
    payload.onSuccess();
  }
};

const xoaNguoiDung = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiXoaNguoiDung(payload)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  })
};

const upload = async ({commit}, payload) => {
  const response = await callApiUpload(payload);
  if (response && response.data.succeeded) {
    showMsgOk(UPLOAD_THANH_CONG);
    commit("UPLOAD_THANH_CONG", response.data.data, payload);
  }
};

// eslint-disable-next-line no-empty-pattern
const capNhatMenuCanBo = async ({}, payload) => {
  const response = await callApiCapNhatMenuCanBo(payload);
  if (response && response.data.succeeded) {
    showMsgOk(CAP_NHAT_MENU_CAN_BO_THANH_CONG);
    // commit("CAP_NHAT_MENU_CAN_BO_THANH_CONG", response.data.data);
    // payload.onSuccess();
  }
};

export default {
  layDanhSachCanBo,
  layDanhSachLanhDao,
  taoCanBo,
  capNhatCanBo,
  themCanBoVaoNguoiDung,
  xoaCanBo,
  xoaNguoiDung,
  layChiTietCanBo,
  upload,
  layDanhSachMenu,
  capNhatMenuCanBo,
  chuyenCongTac
};
