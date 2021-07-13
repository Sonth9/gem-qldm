import ENDPOINT from "@/api/endpoints";
import {
  callApiLayChiTietNguoiDung,
  callApiLayNguoiDungGomQuyen,
  callApiLayDanhSachVaiTroTheoNguoiDung,
  callApiLayDanhSachVaiTroKhongThuocNguoiDung,
  callApiLayDanhSachQuyenTheoNguoiDung,
  callApiLayDanhSachQuyenKhongThuocNguoiDung,
  callApiCapNhatVaiTroTheoNguoiDung,
  callApiCapNhatQuyenTheoNguoiDung,
  callApiCapNhatEmailNguoiDung,
  callApiCapNhatActivelNguoiDung
} from "@/api/user";

const layChiTietNguoiDung = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiLayChiTietNguoiDung(ENDPOINT.USER.LAY_CHI_TIET_NGUOI_DUNG, payload)
      .then(response => {
        resolve(response);
        if (response) {
          context.commit("SET_CHI_TIET_NGUOI_DUNG", response.data);
        }
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

const layNguoiDungGomQuyen = (context, payload) => {
  callApiLayNguoiDungGomQuyen(payload, ENDPOINT.USER.NGUOI_DUNG_GOM_QUYEN)
    .then(response => {
      if (response) {
        context.commit("SET_NGUOI_DUNG_GOM_QUYEN", response.data.data);
      }
    })
    .catch(error => {
      console.error(error);
    });
};

const layDanhSachVaiTroTheoNguoiDung = (context, payload) => {
  callApiLayDanhSachVaiTroTheoNguoiDung(
    payload,
    ENDPOINT.USER.DANH_SACH_VAI_TRO_THEO_NGUOI_DUNG
  )
    .then(response => {
      if (response) {
        context.commit(
          "SET_DANH_SACH_VAI_TRO_THEO_NGUOI_DUNG",
          response.data.data
        );
      }
    })
    .catch(error => {
      console.error(error);
    });
};

const layDanhSachVaiTroKhongThuocNguoiDung = (context, payload) => {
  callApiLayDanhSachVaiTroKhongThuocNguoiDung(
    payload,
    ENDPOINT.USER.DANH_SACH_VAI_TRO_KHONG_THUOC_NGUOI_DUNG
  )
    .then(response => {
      if (response) {
        context.commit(
          "SET_DANH_SACH_VAI_TRO_KHONG_THUOC_NGUOI_DUNG",
          response.data.data
        );
      }
    })
    .catch(error => {
      console.error(error);
    });
};

const layDanhSachQuyenTheoNguoiDung = (context, payload) => {
  callApiLayDanhSachQuyenTheoNguoiDung(
    payload,
    ENDPOINT.USER.DANH_SACH_QUYEN_THEO_NGUOI_DUNG
  )
    .then(response => {
      if (response) {
        context.commit(
          "SET_DANH_SACH_QUYEN_THEO_NGUOI_DUNG",
          response.data.data
        );
      }
    })
    .catch(error => {
      console.error(error);
    });
};

const layDanhSachQuyenKhongThuocNguoiDung = (context, payload) => {
  callApiLayDanhSachQuyenKhongThuocNguoiDung(
    payload,
    ENDPOINT.USER.DANH_SACH_QUYEN_KHONG_THUOC_NGUOI_DUNG
  )
    .then(response => {
      if (response) {
        context.commit(
          "SET_DANH_SACH_QUYEN_KHONG_THUOC_NGUOI_DUNG",
          response.data.data
        );
      }
    })
    .catch(error => {
      console.error(error);
    });
};

const capNhatVaiTroTheoNguoiDung = (context, payload) => {
  callApiCapNhatVaiTroTheoNguoiDung(
    payload,
    ENDPOINT.USER.CAP_NHAT_VAI_TRO_THEO_NGUOI_DUNG
  )
    // eslint-disable-next-line no-unused-vars
    .then(response => {})
    .catch(error => {
      console.error(error);
    });
};

const capNhatQuyenTheoNguoiDung = (context, payload) => {
  callApiCapNhatQuyenTheoNguoiDung(
    payload,
    ENDPOINT.USER.CAP_NHAT_QUYEN_THEO_NGUOI_DUNG
  )
    // eslint-disable-next-line no-unused-vars
    .then(response => {})
    .catch(error => {
      console.error(error);
    });
};

const capNhatEmailNguoiDung = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiCapNhatEmailNguoiDung(
      payload,
      ENDPOINT.USER.CAP_NHAT_EMAIL_NGUOI_DUNG
    )
      // eslint-disable-next-line no-unused-vars
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const capNhatActiveNguoiDung = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiCapNhatActivelNguoiDung(
      payload,
      ENDPOINT.USER.CAP_NHAT_ACTIVE_NGUOI_DUNG
    )
      // eslint-disable-next-line no-unused-vars
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export default {
  layChiTietNguoiDung,
  layNguoiDungGomQuyen,
  layDanhSachVaiTroTheoNguoiDung,
  layDanhSachVaiTroKhongThuocNguoiDung,
  layDanhSachQuyenTheoNguoiDung,
  layDanhSachQuyenKhongThuocNguoiDung,
  capNhatVaiTroTheoNguoiDung,
  capNhatQuyenTheoNguoiDung,
  capNhatEmailNguoiDung,
  capNhatActiveNguoiDung
};
