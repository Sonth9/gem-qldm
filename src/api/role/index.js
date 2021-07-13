import { buildQueries, HTTP } from "@/api/http-common";
import ENDPOINT from "@/api/endpoints";
import _cloneDeep from "lodash/cloneDeep";

export function callApiLayDanhSachQuyenTheoVaiTro(payload, endpoint) {
  return new Promise((resolve, reject) => {
    return HTTP.get(`${endpoint}/${payload.id}/permissions`)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function callApiLayDanhSachQuyenKhongThuocVaiTro(payload, endpoint) {
  return new Promise((resolve, reject) => {
    return HTTP.get(`${endpoint}/${payload.id}/permissions-not-in`)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function callApiLayDanhSachVaiTro(payload, endpoint) {
  return new Promise((resolve, reject) => {
    return HTTP.get(`${endpoint}?${buildQueries(payload)}`)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function callApiLayChiTietVaiTro(payload, endpoint) {
  return new Promise((resolve, reject) => {
    return HTTP.get(
      `${endpoint}/${payload.id}?${buildQueries(
        {
          sortBy: "",
          filterBy: "",
          pageIndex: 0,
          pageSize: 0
        },
        "userSearch"
      )}`
    )
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function callApiXoaVaiTro(payload) {
  return HTTP({
    url: ENDPOINT.ROLE.XOA_VAI_TRO,
    method: "DELETE",
    params: payload
  });
}

export function callApiTaoVaiTro(payload, endpoint) {
  return new Promise((resolve, reject) => {
    return HTTP.post(endpoint, payload)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function callApiCapNhatThongTinVaiTro(payload, endpoint) {
  return new Promise((resolve, reject) => {
    const newPayload = {
      name: payload.name,
      displayName: payload.displayName
    };
    return HTTP.put(`${endpoint}/${payload.id}/name`, newPayload)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function callApiCapNhatQuyenTrongVaiTro(payload, endpoint) {
  return new Promise((resolve, reject) => {
    const newPayload = {
      permissionIds: payload.permissionIds,
      deletePermissionIds: payload.deletePermissionIds
    };
    return HTTP.put(`${endpoint}/${payload.id}/permissions`, newPayload)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function callApiCapNhatNguoiDungTrongVaiTro(payload, endpoint) {
  return new Promise((resolve, reject) => {
    const newPayload = {
      userIds: payload.userIds,
      deleteUserIds: payload.deleteUserIds
    };
    return HTTP.put(`${endpoint}/${payload.id}/users`, newPayload)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function callApiLayDanhSachNguoiDung(payload, endpoint) {
  return new Promise((resolve, reject) => {
    const newPayload = _cloneDeep(payload);
    delete newPayload.id;

    return HTTP.get(
      `${endpoint}/${payload.id}/users?${buildQueries(
        newPayload,
        "UserSearch."
      )}`
    )
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function callApiLayDanhSachNguoiDungKhongThuocVaiTro(payload, endpoint) {
  return new Promise((resolve, reject) => {
    const newPayload = _cloneDeep(payload);
    delete newPayload.id;

    return HTTP.get(
      `${endpoint}/${payload.id}/users-not-in?${buildQueries(
        newPayload,
        "UserSearch."
      )}`
    )
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}
