import _isEmpty from "lodash/isEmpty";
import { ROUTE_NAME } from "@/constants/constants";
import store from "@/store";
import Vue from "vue";

export const capitalize = str => {
  if (typeof str !== "string") return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const goToFirstRoute = (danhSachQuyen, $vm) => {
  if (!_isEmpty(danhSachQuyen)) {
    for (let i = 0; i < danhSachQuyen.length; i++) {
      let firstRoute = danhSachQuyen[0].Permission;
      if (firstRoute) {
        $vm.$router
          .push({
            name: firstRoute
          })
          .catch(() => {});
      }
    }
  } else {
    $vm.$router
      .push({
        path: ROUTE_NAME._403
      })
      .catch(() => {});
  }
};
export function convertToSlug(text)
{
  return text
    .toLowerCase()
    .replace(/ /g,'_')
    .replace(/[^\w_]+/g,'_')
    ;
}
export function setBreadcrumb(breadcrumb) {
  store.dispatch("common/setBreadcrumb", breadcrumb);
}

export const optionSelectAll = (arr, titleAll) => {
  const allOpt = {
    id: null,
    value: null,
    text: titleAll || "Tất cả"
  };
  return [allOpt, ...arr];
};

export function showMsgOk(msg) {
  Vue.toasted.global.showSuccessMessage({
    message: msg
  });
}

export function showMsgError(error, msg = null) {
  if (error && typeof error === "object" && error.data.message) {
    Vue.toasted.global.showErrorMessage({
      message: error.data.message
    });
  } else {
    Vue.toasted.global.showErrorMessage({ message: msg || error });
  }
}
