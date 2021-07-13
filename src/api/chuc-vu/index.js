import { HTTP } from "@/api/http-common";
import ENDPOINT from "@/api/endpoints";

export function callApiLayDanhSachChucVu(payload) {
  return HTTP({
    url: ENDPOINT.CHUC_VU.ALL,
    method: "GET",
    params: payload
  });
}

export function callApiLayChiTietChucVu(payload) {
  return HTTP({
    url: ENDPOINT.CHUC_VU.CRUD,
    method: "GET",
    params: payload
  });
}
export function callApiTaoChucVu(payload) {
  return HTTP({
    url: ENDPOINT.CHUC_VU.CRUD,
    method: "POST",
    data: payload
  });
}

export function callApiSuaChucVu(payload) {
  return HTTP({
    url: ENDPOINT.CHUC_VU.CRUD,
    method: "PUT",
    data: payload
  });
}

export function callApiXoaChucVu(payload) {
  return HTTP({
    url: ENDPOINT.CHUC_VU.CRUD,
    method: "DELETE",
    params: payload
  });
}

export function callApiCapNhatThuTu(payload) {
  return HTTP({
    url: ENDPOINT.CHUC_VU.ORDER,
    method: "PATCH",
    data: payload
  });
}
