import { HTTP } from "@/api/http-common";
import ENDPOINT from "@/api/endpoints";

export function callApiLayChiTietNhomMenu(payload) {
  return HTTP({
    url: ENDPOINT.DANH_MUC_NHOM_MENU.CRUD,
    method: "GET",
    params: payload
  });
}

export function callApiLayDanhSachNhomMenu(payload) {
  return HTTP({
    url: ENDPOINT.DANH_MUC_NHOM_MENU.SEARCH,
    method: "GET",
    params: payload
  });
}

export function callApiTaoNhomMenu(payload) {
  return HTTP({
    url: ENDPOINT.DANH_MUC_NHOM_MENU.CRUD,
    method: "POST",
    data: payload
  });
}

export function callApiSuaNhomMenu(payload) {
  return HTTP({
    url: ENDPOINT.DANH_MUC_NHOM_MENU.CRUD,
    method: "PUT",
    data: payload
  });
}

export function callApiXoaNhomMenu(payload) {
  return HTTP({
    url: ENDPOINT.DANH_MUC_NHOM_MENU.CRUD,
    method: "DELETE",
    params: payload
  });
}

export function callApiLayNguoiDungNhomMenu(payload) {
  return HTTP({
    url: ENDPOINT.DANH_MUC_NHOM_MENU.USER,
    method: "GET",
    params: payload
  });
}

export function callApiThemNguoiDung(payload) {
  return HTTP({
    url: ENDPOINT.DANH_MUC_NHOM_MENU.USER,
    method: "POST",
    data: payload
  });
}

export function callApiXoaNguoiDung(payload) {
  return HTTP({
    url: ENDPOINT.DANH_MUC_NHOM_MENU.USER,
    method: "DELETE",
    data: payload
  });
}

export function callApiLayQuyenNhomMenu(payload) {
  return HTTP({
    url: ENDPOINT.DANH_MUC_NHOM_MENU.PERMISSION,
    method: "GET",
    params: payload
  });
}

export function callApiSuaQuyenNhomMenu(payload) {
  return HTTP({
    url: ENDPOINT.DANH_MUC_NHOM_MENU.PERMISSION,
    method: "PATCH",
    data: payload
  });
}
