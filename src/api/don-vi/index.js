import { HTTP } from "@/api/http-common";
import ENDPOINT from "@/api/endpoints";

export function callApiLayDanhSachDonVi(payload) {
  return HTTP({
    url: ENDPOINT.DON_VI.ALL,
    method: "GET",
    params: payload
  });
}

export function callApiLayDanhSachDonViPhanTrang(payload) {
  return HTTP({
    url: ENDPOINT.DON_VI.SEARCH,
    method: "GET",
    params: payload
  });
}
export function callApiLayDanhSachTheoDonViCha(payload) {
  return HTTP({
    url: ENDPOINT.DON_VI.CHILDREN,
    method: "GET",
    params: payload
  });
}

export function callApiLayCayDonVi(payload) {
  return HTTP({
    url: ENDPOINT.DON_VI.TREE,
    method: "GET",
    params: payload
  });
}

export function callApiLayChiTietDonVi(payload) {
  return HTTP({
    url: ENDPOINT.DON_VI.CRUD,
    method: "GET",
    params: payload
  });
}
export function callApiTaoDonVi(payload) {
  return HTTP({
    url: ENDPOINT.DON_VI.CRUD,
    method: "POST",
    data: payload
  });
}

export function callApiSuaDonVi(payload) {
  return HTTP({
    url: ENDPOINT.DON_VI.CRUD,
    method: "PUT",
    data: payload
  });
}

export function callApiXoaDonVi(payload) {
  return HTTP({
    url: ENDPOINT.DON_VI.CRUD,
    method: "DELETE",
    params: payload
  });
}

export function callApiCapNhatThuTu(payload) {
  return HTTP({
    url: ENDPOINT.DON_VI.ORDER,
    method: "PATCH",
    data: payload
  });
}
