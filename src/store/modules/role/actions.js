import ENDPOINT from "@/api/endpoints";
import {
  callApiCapNhatNguoiDungTrongVaiTro,
  callApiCapNhatQuyenTrongVaiTro,
  callApiCapNhatThongTinVaiTro,
  callApiLayChiTietVaiTro,
  callApiLayDanhSachNguoiDung,
  callApiLayDanhSachNguoiDungKhongThuocVaiTro,
  callApiLayDanhSachQuyenKhongThuocVaiTro,
  callApiLayDanhSachQuyenTheoVaiTro,
  callApiLayDanhSachVaiTro,
  callApiTaoVaiTro,
  callApiXoaVaiTro
} from "@/api/role";
import { showMsgError, showMsgOk } from "@/utils/commonUtils";
import { XOA_VAI_TRO_THANH_CONG } from "@/constants/message";

const layDanhSachVaiTro = (context, payload) => {
  callApiLayDanhSachVaiTro(payload, ENDPOINT.ROLE.DANH_SACH_VAI_TRO)
    .then(response => {
      if (response) {
        context.commit("SET_DANH_SACH_VAI_TRO", response.data.data);
      }
    })
    .catch(error => {
      console.error(error);
    });
};

const layChiTietVaiTro = (context, payload) => {
  callApiLayChiTietVaiTro(payload, ENDPOINT.ROLE.CHI_TIET_VAI_TRO)
    .then(response => {
      if (response) {
        context.commit("SET_CHI_TIET_VAI_TRO", response.data.data);
      }
    })
    .catch(error => {
      console.error(error);
    });
};

const xoaVaiTro = async (context, payload) => {
    const response = await callApiXoaVaiTro(payload);
    if (response && response.data.succeeded) {
      showMsgOk(XOA_VAI_TRO_THANH_CONG);
    }

};

const taoVaiTro = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiTaoVaiTro(payload, ENDPOINT.ROLE.TAO_VAI_TRO)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

const capNhatThongTinVaiTro = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiCapNhatThongTinVaiTro(
      payload,
      ENDPOINT.ROLE.CAP_NHAT_THONG_TIN_VAI_TRO
    )
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

const layDanhSachQuyenTheoVaiTro = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiLayDanhSachQuyenTheoVaiTro(
      payload,
      ENDPOINT.ROLE.DANH_SACH_QUYEN_THEO_VAI_TRO
    )
      .then(response => {
        if (response) {
          context.commit(
            "SET_DANH_SACH_QUYEN_THEO_VAI_TRO",
            response.data.data
          );
        }
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const layDanhSachQuyenKhongThuocVaiTro = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiLayDanhSachQuyenKhongThuocVaiTro(
      payload,
      ENDPOINT.ROLE.DANH_SACH_QUYEN_KHONG_THUOC_VAI_TRO
    )
      .then(response => {
        if (response) {
          context.commit(
            "SET_DANH_SACH_QUYEN_KHONG_THUOC_VAI_TRO",
            response.data.data
          );
        }
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

const capNhatQuyenTrongVaiTro = (context, payload) => {
  callApiCapNhatQuyenTrongVaiTro(
    payload,
    ENDPOINT.ROLE.CAP_NHAT_QUYEN_TRONG_VAI_TRO
  )
    // eslint-disable-next-line no-unused-vars
    .then(response => {})
    .catch(error => {
      console.error(error);
    });
};

const layDanhSachNguoiDungTheoVaiTro = (context, payload) => {
  callApiLayDanhSachNguoiDung(payload, ENDPOINT.ROLE.NGUOI_DUNG_THEO_VAI_TRO)
    .then(response => {
      if (response) {
        context.commit(
          "SET_DANH_SACH_NGUOI_DUNG_THEO_VAI_TRO",
          response.data.data
        );
      }
    })
    .catch(error => {
      console.error(error);
    });
};

const layDanhSachNguoiDungKhongThuocVaiTro = (context, payload) => {
  callApiLayDanhSachNguoiDungKhongThuocVaiTro(
    payload,
    ENDPOINT.ROLE.NGUOI_DUNG_KHONG_THUOC_VAI_TRO
  )
    .then(response => {
      if (response) {
        context.commit(
          "SET_DANH_SACH_NGUOI_DUNG_KHONG_THUOC_VAI_TRO",
          response.data.data
        );
      }
    })
    .catch(error => {
      console.error(error);
    });
};

const capNhatNguoiDungTrongVaiTro = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiCapNhatNguoiDungTrongVaiTro(
      payload,
      ENDPOINT.ROLE.XOA_NGUOI_DUNG_TRONG_VAI_TRO
    )
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

export default {
  layDanhSachVaiTro,
  layChiTietVaiTro,
  taoVaiTro,
  capNhatThongTinVaiTro,
  layDanhSachNguoiDungTheoVaiTro,
  capNhatNguoiDungTrongVaiTro,
  xoaVaiTro,
  layDanhSachQuyenTheoVaiTro,
  capNhatQuyenTrongVaiTro,
  layDanhSachQuyenKhongThuocVaiTro,
  layDanhSachNguoiDungKhongThuocVaiTro
};
