import { HTTP } from "@/api/http-common";
import ENDPOINT from "@/api/endpoints";

export function callApiLayDanhSachDanhMucHeThong(payload) {
  return HTTP({
    url: ENDPOINT.DANH_MUC_HE_THONG.ALL,
    method: "GET",
    params: payload
  });
}

export function callApiTaoDanhMucHeThong(payload) {
  return HTTP({
    url: ENDPOINT.DANH_MUC_HE_THONG.CRUD,
    method: "POST",
    data: payload
  });
}

export function callApiSuaDanhMucHeThong(payload) {
  return HTTP({
    url: ENDPOINT.DANH_MUC_HE_THONG.CRUD,
    method: "PUT",
    data: payload
  });
}

export function callApiXoaDanhMucHeThong(payload) {
  return HTTP({
    url: ENDPOINT.DANH_MUC_HE_THONG.CRUD,
    method: "DELETE",
    params: payload
  });
}

export function callApiCapNhatThuTu(payload) {
  return HTTP({
    url: ENDPOINT.DANH_MUC_HE_THONG.ORDER,
    method: "PATCH",
    data: payload
  });
}
