import { HTTP } from "@/api/http-common";

export function callApiLayDanhSachTatCaQuyen(payload, endpoint) {
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
