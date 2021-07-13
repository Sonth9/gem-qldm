import { HTTP } from "@/api/http-common";
import ENDPOINT from "@/api/endpoints";

export function callApiLayDanhSachNhomChucVu(payload) {
  return HTTP({
    url: ENDPOINT.NHOM_CHUC_VU.ALL,
    method: "GET",
    params: payload
  });
}

export function callApiTaoNhomChucVu(payload) {
  return HTTP({
    url: ENDPOINT.NHOM_CHUC_VU.CRUD,
    method: "POST",
    data: payload
  });
}

export function callApiSuaNhomChucVu(payload) {
  return HTTP({
    url: ENDPOINT.NHOM_CHUC_VU.CRUD,
    method: "PUT",
    data: payload
  });
}

export function callApiXoaNhomChucVu(payload) {
  return HTTP({
    url: ENDPOINT.NHOM_CHUC_VU.CRUD,
    method: "DELETE",
    params: payload
  });
}

export function callApiCapNhatThuTu(payload) {
  return HTTP({
    url: ENDPOINT.NHOM_CHUC_VU.ORDER,
    method: "PATCH",
    data: payload
  });
}
