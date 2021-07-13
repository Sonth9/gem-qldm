import ENDPOINT from "@/api/endpoints";
import { callApiLayDanhSachTatCaQuyen } from "@/api/permission";

const layDanhSachQuyenTheoNguoiDung = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiLayDanhSachTatCaQuyen(
      payload,
      ENDPOINT.PERMISSION.DANH_SACH_TAT_CA_QUYEN
    )
      .then(response => {
        if (response) {
          context.commit("SET_DANH_SACH_TAT_CA_QUYEN", response.data.data);
        }
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export default {
  layDanhSachQuyenTheoNguoiDung
};
