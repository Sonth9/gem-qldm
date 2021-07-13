import ENDPOINT from "@/api/endpoints";
import {
  callApiLayDanhSachQuanLyLoai,
  callApiTaoLoai,
  callApisuaLoai,
  callApixoaLoai,
  callApiLayDanhSachQuanLyNguon,
  callApiTaoNguon,
  callApisuaNguon,
  callApixoaNguon,
  callApilayDanhSachQuanLyThongBao,

  // THÔNG BÁO TÙY CHỈNH
  callApiLayDanhSachThongBao,
  callApiLayChiTietThongBao,
  callApiTaoThongBao,
  callApiCapNhatThongBao,
  callApiHuyThongBao
} from "@/api/thong-bao-tuy-chinh";

const layDanhSachQuanLyLoai = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiLayDanhSachQuanLyLoai(
      payload,
      ENDPOINT.QUAN_TRI_HE_THONG.QUAN_TRI_THONG_BAO_LOAI
    )
      .then(response => {
        if (response) {
          context.commit(
            "SET_DANH_SACH_QUAN_LY_LOAI",
            response.data.data.items
          );
        }
        resolve(response);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

const taoMoiLoai = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiTaoLoai(payload, ENDPOINT.QUAN_TRI_HE_THONG.THEM_SUA_LOAI)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

const suaLoai = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApisuaLoai(payload, ENDPOINT.QUAN_TRI_HE_THONG.THEM_SUA_LOAI)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

const xoaLoai = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApixoaLoai(payload, ENDPOINT.QUAN_TRI_HE_THONG.XOA_LOAI)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

const layDanhSachQuanLyNguon = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiLayDanhSachQuanLyNguon(
      payload,
      ENDPOINT.QUAN_TRI_HE_THONG.QUAN_TRI_THONG_BAO_NGUON
    )
      .then(response => {
        if (response) {
          context.commit(
            "SET_DANH_SACH_QUAN_LY_NGUON",
            response.data.data.items
          );
        }
        resolve(response);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};
const taoMoiNguon = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiTaoNguon(payload, ENDPOINT.QUAN_TRI_HE_THONG.THEM_SUA_NGUON)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

const suaNguon = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApisuaNguon(payload, ENDPOINT.QUAN_TRI_HE_THONG.THEM_SUA_NGUON)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

const xoaNguon = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApixoaNguon(payload, ENDPOINT.QUAN_TRI_HE_THONG.XOA_NGUON)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

const layDanhSachQuanLyThongBao = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApilayDanhSachQuanLyThongBao(
      payload,
      ENDPOINT.THONG_BAO.DANH_SACH_QUAN_LY_THONG_BAO
    )
      .then(response => {
        if (response.data?.data) {
          context.commit("SET_DANH_SACH_QUAN_LY_THONG_BAO", response.data.data);
        }
        resolve(response);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

const lichSuThaoTac = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApilayDanhSachQuanLyThongBao(
      payload,
      ENDPOINT.THONG_BAO.LICH_SU_THAO_TAC
    )
      .then(response => {
        if (response.data?.data) {
          context.commit("SET_DANH_SACH_LICH_SU_THAO_TAC", response.data.data);
        }
        resolve(response);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};


// THÔNG BÁO TÙY CHỈNH

const layDanhSachThongBao = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiLayDanhSachThongBao(payload)
      .then(response => {
        if (response) {
          context.commit("SET_DANH_SACH_THONG_BAO", response.data.data );
        }
        resolve(response);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

const layChiTietThongBao = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiLayChiTietThongBao(payload)
      .then(response => {
        if (response) {
          context.commit("SET_CHI_TIET_THONG_BAO", response.data.data );
        }
        resolve(response);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

const taoMoiThongBao = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiTaoThongBao(payload)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

const suaThongBao = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiCapNhatThongBao(payload)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

const huyThongBao = (context, payload) => {
  return new Promise((resolve, reject) => {
    callApiHuyThongBao(payload)
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
  layDanhSachQuanLyLoai,
  taoMoiLoai,
  suaLoai,
  xoaLoai,
  layDanhSachQuanLyNguon,
  taoMoiNguon,
  suaNguon,
  xoaNguon,
  layDanhSachQuanLyThongBao,
  lichSuThaoTac,

  // THÔNG BÁO TÙY CHỈNH
  layDanhSachThongBao,
  layChiTietThongBao,
  taoMoiThongBao,
  suaThongBao,
  huyThongBao,
};
