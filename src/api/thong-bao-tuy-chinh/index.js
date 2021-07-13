import ENDPOINT from "@/api/endpoints";
import { HTTP } from "@/api/http-common";

export function callApiLayDanhSachThongBao(payload) {
  return HTTP({
    url: ENDPOINT.THONG_BAO_CUSTOM.SEARCH,
    method: "GET",
    params: payload
  });
}
  

export function callApiLayChiTietThongBao(payload) {
  return HTTP({
    url: ENDPOINT.THONG_BAO_CUSTOM.CRUD,
    method: "GET",
    params: payload
  });
}


export function callApiTaoThongBao(payload) {
  return HTTP({
    url: ENDPOINT.THONG_BAO_CUSTOM.CRUD,
    method: "POST",
    data: payload
  });
}

export function callApiCapNhatThongBao(payload) {
  return HTTP({
    url: ENDPOINT.THONG_BAO_CUSTOM.CRUD,
    method: "PUT",
    data: payload
  });
}

export function callApiHuyThongBao(payload) {
  return HTTP({
    url: `${ENDPOINT.THONG_BAO_CUSTOM.CRUD}/${payload}`,
    method: "PATCH"
  });
}


