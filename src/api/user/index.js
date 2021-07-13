import { HTTP, buildQueries } from "@/api/http-common";

export function callApiLayChiTietNguoiDung(endpoint, payload) {
  return new Promise((resolve, reject) => {
    return HTTP.get(`${endpoint}/${payload.id}`)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function callApiLayNguoiDungGomQuyen(payload, endpoint) {
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

export function callApiLayDanhSachVaiTroTheoNguoiDung(payload, endpoint) {
  return new Promise((resolve, reject) => {
    return HTTP.get(`${endpoint}/${payload.id}/roles`)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function callApiLayDanhSachVaiTroKhongThuocNguoiDung(payload, endpoint) {
  return new Promise((resolve, reject) => {
    return HTTP.get(`${endpoint}/${payload.id}/roles-not-in`)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function callApiLayDanhSachQuyenTheoNguoiDung(payload, endpoint) {
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

export function callApiLayDanhSachQuyenKhongThuocNguoiDung(payload, endpoint) {
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

export function callApiCapNhatVaiTroTheoNguoiDung(payload, endpoint) {
  return new Promise((resolve, reject) => {
    const newPayload = {
      roleIds: payload.roleIds,
      deleteRoleIds: payload.deleteRoleIds
    };
    return HTTP.put(`${endpoint}/${payload.id}/roles`, newPayload)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function callApiCapNhatQuyenTheoNguoiDung(payload, endpoint) {
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

export function callApiCapNhatEmailNguoiDung(payload, endpoint) {
  return new Promise((resolve, reject) => {
    const newPayload = {
      email: payload.email
    };
    return HTTP.put(`${endpoint}/${payload.id}/email`, newPayload)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function callApiCapNhatActivelNguoiDung(payload, endpoint) {
  return new Promise((resolve, reject) => {
    return HTTP.put(`${endpoint}`, payload)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
}
