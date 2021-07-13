import ENDPOINT from "@/api/endpoints";
import { HTTP } from "@/api/http-common";

export function callAPiLayDanhSachCanBo(payload) {
  return HTTP({
    url: ENDPOINT.CAN_BO.SEARCH,
    method: "GET",
    params: payload
  });
}

export function callAPiLayChiTietCanBo(payload) {
  return HTTP({
    url: ENDPOINT.CAN_BO.CRUD,
    method: "GET",
    params: payload
  });
}

export function callAPiLayMenuCanBo(payload) {
  return HTTP({
    url: ENDPOINT.CAN_BO.MENU,
    method: "GET",
    params: payload
  });
}

export function callApiTaoCanBo(payload) {
  return HTTP({
    url: ENDPOINT.CAN_BO.CRUD,
    method: "POST",
    data: payload
  });
}

export function callApiCapNhatCanBo(payload) {
  return HTTP({
    url: ENDPOINT.CAN_BO.CRUD,
    method: "PUT",
    data: payload
  });
}

export function callApiChuyenCongTac(payload) {
  return HTTP({
    url: ENDPOINT.CAN_BO.TRANSFER,
    method: "POST",
    data: payload
  });
}

export function callApiThemCanBoVaoNguoiDung(payload) {
  return HTTP({
    url: ENDPOINT.CAN_BO.USER,
    method: "POST",
    data: payload
  });
}

export function callApiXoaNguoiDung(payload) {
  return HTTP({
    url: ENDPOINT.CAN_BO.USER,
    method: "DELETE",
    data: payload
  });
}


export function callApiCapNhatMenuCanBo(payload) {
  return HTTP({
    url: ENDPOINT.CAN_BO.MENU,
    method: "PATCH",
    data: payload
  });
}

export function callApiXoaCanBo(payload) {
  return HTTP({
    url: ENDPOINT.CAN_BO.CRUD,
    method: "DELETE",
    params: payload
  });
}

export function callApiUpload(payload) {
  return HTTP({
    url: ENDPOINT.CAN_BO.UPLOAD,
    method: "PATCH",
    data: payload,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}
