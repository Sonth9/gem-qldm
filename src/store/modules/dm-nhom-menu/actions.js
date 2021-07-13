import {
  callApiLayChiTietNhomMenu,
  callApiLayDanhSachNhomMenu,
  callApiLayNguoiDungNhomMenu,
  callApiLayQuyenNhomMenu,
  callApiSuaNhomMenu,
  callApiSuaQuyenNhomMenu,
  callApiTaoNhomMenu,
  callApiThemNguoiDung,
  callApiXoaNguoiDung,
  callApiXoaNhomMenu
} from "@/api/dm-nhom-menu";
import {
  CAP_NHAT_THANH_CONG,
  SUA_NHOM_MENU_THANH_CONG,
  TAO_NHOM_MENU_THANH_CONG,
  XOA_NHOM_MENU_THANH_CONG,
  XOA_THANH_CONG
} from "@/constants/message";
import { showMsgOk } from "@/utils/commonUtils";

const layDanhSachNhomMenu = async ({commit}, payload) => {
  const response = await callApiLayDanhSachNhomMenu(payload);
  if (response && response.data.succeeded) {
    commit("LAY_DANH_SACH_NHOM_MENU_THANH_CONG", response.data.data);
  }
};

const layChiTietNhomMenu = async ({commit}, payload) => {
  const response = await callApiLayChiTietNhomMenu(payload);
  if (response && response.data.succeeded) {
    commit("LAY_CHI_TIET_NHOM_MENU_THANH_CONG", response.data.data);
  }
};

// eslint-disable-next-line no-empty-pattern
const taoNhomMenu = async ({}, payload) => {
  const response = await callApiTaoNhomMenu(payload.data);
  if (response && response.data.succeeded) {
    showMsgOk(TAO_NHOM_MENU_THANH_CONG);
    payload.onSuccess();
  }
};

// eslint-disable-next-line no-empty-pattern
const suaNhomMenu = async ({}, payload) => {
  const response = await callApiSuaNhomMenu(payload.data);
  if (response && response.data.succeeded) {
    showMsgOk(SUA_NHOM_MENU_THANH_CONG);
    payload.onSuccess();
  }
};

// eslint-disable-next-line no-empty-pattern
const xoaNhomMenu = async ({}, payload) => {
  const response = await callApiXoaNhomMenu(payload.data);
  if (response && response.data.succeeded) {
    showMsgOk(XOA_NHOM_MENU_THANH_CONG);
    payload.onSuccess();
  }
};

const layNguoiDungNhomMenu = async ({commit}, payload) => {
  const response = await callApiLayNguoiDungNhomMenu(payload);
  if (response && response.data.succeeded) {
    commit("LAY_NGUOI_DUNG_NHOM_MENU_THANH_CONG", response.data.data);
  }
};

// eslint-disable-next-line no-empty-pattern
const themNguoiDung = async ({}, payload) => {
  const response = await callApiThemNguoiDung(payload.data);
  if (response && response.data.succeeded) {
    // showMsgOk(TAO_NHOM_MENU_THANH_CONG);
    payload.onSuccess();
  }
};

// eslint-disable-next-line no-empty-pattern
const xoaNguoiDung = async ({}, payload) => {
  const response = await callApiXoaNguoiDung(payload.data);
  if (response && response.data.succeeded) {
    showMsgOk(XOA_THANH_CONG);
    payload.onSuccess();
  }
};

const layQuyenNhomMenu = async ({commit}, payload) => {
  const response = await callApiLayQuyenNhomMenu(payload);
  if (response && response.data.succeeded) {
    commit("LAY_QUYEN_NHOM_MENU_THANH_CONG", response.data.data);
  }
};

// eslint-disable-next-line no-empty-pattern
const suaQuyenNhomMenu = async ({}, payload) => {
  const response = await callApiSuaQuyenNhomMenu(payload);
  if (response && response.data.succeeded) {
    showMsgOk(CAP_NHAT_THANH_CONG);
  }
};

export default {
  layDanhSachNhomMenu,
  layChiTietNhomMenu,
  taoNhomMenu,
  suaNhomMenu,
  xoaNhomMenu,
  layNguoiDungNhomMenu,
  themNguoiDung,
  xoaNguoiDung,
  layQuyenNhomMenu,
  suaQuyenNhomMenu
};
