import { HTTP } from "@/api/http-common";
import ENDPOINT from "@/api/endpoints";

export function callApiLayDanhSachDanhMucMenuHeThong(payload) {
  return HTTP({
    url: ENDPOINT.DANH_MUC_MENU_HE_THONG.ALL,
    method: "GET",
    params: payload
  });
}

export function callApiLayCayDanhMucMenuHeThong(payload) {
  return HTTP({
    url: ENDPOINT.DANH_MUC_MENU_HE_THONG.TREE,
    method: "GET",
    params: payload
  });
}

export function callApiTaoDanhMucMenuHeThong(payload) {
  return HTTP({
    url: ENDPOINT.DANH_MUC_MENU_HE_THONG.CRUD,
    method: "POST",
    data: payload
  });
}

export function callApiSuaDanhMucMenuHeThong(payload) {
  return HTTP({
    url: ENDPOINT.DANH_MUC_MENU_HE_THONG.CRUD,
    method: "PUT",
    data: payload
  });
}

export function callApiXoaDanhMucMenuHeThong(payload) {
  return HTTP({
    url: ENDPOINT.DANH_MUC_MENU_HE_THONG.CRUD,
    method: "DELETE",
    params: payload
  });
}

export function callApiCapNhatThuTu(payload) {
  return HTTP({
    url: ENDPOINT.DANH_MUC_MENU_HE_THONG.ORDER,
    method: "PATCH",
    data: payload
  });
}
