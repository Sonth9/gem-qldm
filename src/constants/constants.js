export const DOMAIN = WINDOW_DOMAIN
  ? WINDOW_DOMAIN
  : "http://14.177.235.12:8621";

export const API_VERSION = WINDOW_API_VERSION
  ? WINDOW_API_VERSION
  : "/api";

export const ROUTE_NAME = {
  TRANG_CHU: "/trang-chu",
  DANG_NHAP: "/dang-nhap",
  _403: "/chua-co-quyen",
  _401: "/token-het-han",
  _404: "/khong-tim-thay",
  _500: "/loi-may-chu",
  QUAN_LY_DANH_MUC: {
    NAME: "/quan-ly-danh-muc/",
    HO_SO_CAN_BO: {
      NAME: "can-bo",
      DANH_SACH: "",
      TAO: "can-bo/them-moi",
      SUA: "can-bo/:id/cap-nhat",
      XEM: "can-bo/:id",
      XEM_THUOC_DON_VI_NAME: "can-bo-cua-don-vi",
      XEM_THUOC_DON_VI: "can-bo-cua-don-vi/:id"
    },
    DON_VI: {
      NAME: "don-vi",
      DANH_SACH: "",
      TAO: "don-vi/them-moi",
      SUA: "don-vi/:id/cap-nhat",
      XEM: "don-vi/:id"
    },
    THONG_BAO_TUY_CHINH: {
      NAME: "thong-bao",
      TAO: "thong-bao/them-moi",
      SUA: "thong-bao/cap-nhat/:id",
      DANH_SACH: "",
      XEM: "thong-bao/:id"
    }
  },
  QUAN_TRI_HE_THONG: {
    NAME: "/quan-tri-he-thong/",
    VAI_TRO: "vai-tro",
    XEM_CHI_TIET_VAI_TRO: "vai-tro/:id/xem",
    CAP_NHAT_VAI_TRO: "vai-tro/:id",
    NGUOI_DUNG: "nguoi-dung",
    XEM_CHI_TIET_NGUOI_DUNG: "nguoi-dung/:id/xem",
    CAP_NHAT_NGUOI_DUNG: "nguoi-dung/:id",
    CHUC_VU: {
      NAME: "chuc-vu",
      TAO: "chuc-vu/them-moi",
      SUA: "chuc-vu/:id/cap-nhat",
      XEM: "chuc-vu/:id"
    },
    NHOM_CHUC_VU: {
      NAME: "nhom-chuc-vu",
      TAO: "nhom-chuc-vu/them-moi",
      SUA: "nhom-chuc-vu/:id/cap-nhat",
      XEM: "nhom-chuc-vu/:id"
    },
    DM_HE_THONG: {
      NAME: "dm-he-thong",
      TAO: "dm-he-thong/them-moi",
      SUA: "dm-he-thong/:id/cap-nhat",
      XEM: "dm-he-thong/:id"
    },
    DM_MENU_HE_THONG: {
      NAME: "dm-menu-he-thong",
      TAO: "dm-menu-he-thong/them-moi",
      SUA: "dm-menu-he-thong/:id/cap-nhat",
      XEM: "dm-menu-he-thong/:id"
    },
    DM_NHOM_MENU: {
      NAME: "dm-nhom-menu",
      TAO: "dm-nhom-menu/them-moi",
      SUA: "dm-nhom-menu/:id/cap-nhat",
      XEM: "dm-nhom-menu/:id"
    },
  },

  QUAN_LY_THONG_BAO: "/quan-ly-thong-bao",
  THONG_BAO_CHO_DUYET: "/thong-bao-cho-duyet",
};

export const MENU_ROUTE_NAME = {
  TRANG_CHU: "B???ng ??i???u khi???n",
  _401: "Token h???t h???n",
  _403: "Ch??a c?? quy???n",
  _404: "Kh??ng t??m th???y",
  _500: "L???i m??y ch??? n???i b???",
  HO_SO: {
    NAME: "H??? s??",
    DANH_SACH: "Danh s??ch",
    CHI_TIET: "Chi ti???t",
    TAO: "T???o"
  },
  QUAN_LY_DANH_MUC: {
    NAME: "Qu???n l?? danh m???c",
    HO_SO_CAN_BO: {
      NAME: "H??? s?? c??n b???",
      DANH_SACH: "H??? s?? c??n b???",
      TAO: "Th??m m???i h??? s?? c??n b???",
      SUA: "S???a h??? s?? c??n b???",
      XEM: "Xem h??? s?? c??n b???",
      XEM_THUOC_DON_VI: "Xem h??? s?? c??n b???",
      MENU: "Ph??n Quy???n menu c??n b???"
    },
    DON_VI: {
      NAME: "????n v???",
      DANH_SACH: "????n v???",
      TAO: "Th??m m???i ????n v???",
      SUA: "S???a ????n v???",
      XEM: "Xem ????n v???"
    },
    THONG_BAO_TUY_CHINH: {
      NAME: "Th??ng b??o t??y ch???nh",
      TAO: "Th??m m???i th??ng b??o",
      SUA: "C???p nh???t th??ng b??o",
      DANH_SACH: "Th??ng b??o t??y ch???nh",
      XEM: "Xem th??ng b??o t??y ch???nh"
    }
  },
  QUAN_TRI_HE_THONG: {
    NAME: "Qu???n tr??? h??? th???ng",
    VAI_TRO: "Qu???n l?? vai tr??",
    XEM_VAI_TRO: "Xem th??ng tin vai tr??",
    CAP_NHAT_VAI_TRO: "C???p nh???t vai tr??",
    NGUOI_DUNG: "Qu???n l?? ng?????i d??ng",
    XEM_NGUOI_DUNG: "Xem th??ng tin ng?????i d??ng",
    CAP_NHAT_NGUOI_DUNG: "C???p nh???t ng?????i d??ng",
    CHUC_VU: {
      NAME: "Ch???c v???",
      TAO: "Th??m m???i ch??? v???",
      SUA: "S???a ch???c v???",
      XEM: "Xem ch???c v???"
    },
    NHOM_CHUC_VU: {
      NAME: "Nh??m ch???c v???",
      TAO: "Th??m m???i nh??m ch???c v???",
      SUA: "S???a nh??m ch???c v???",
      XEM: "Xem nh??m ch???c v???"
    },
    DM_HE_THONG: {
      NAME: "Danh m???c h??? th???ng",
      TAO: "Th??m m???i danh m???c h??? th???ng",
      SUA: "S???a danh m???c h??? th???ng",
      XEM: "Xem danh m???c h??? th???ng"
    },
    DM_MENU_HE_THONG: {
      NAME: "Danh m???c menu h??? th???ng",
      TAO: "Th??m m???i danh m???c menu h??? th???ng",
      SUA: "S???a danh m???c menu h??? th???ng",
      XEM: "Xem danh m???c menu h??? th???ng"
    },
    DM_NHOM_MENU: {
      NAME: "Danh m???c nh??m quy???n",
      TAO: "Th??m m???i danh m???c nh??m quy???n",
      SUA: "S???a danh m???c nh??m quy???n",
      XEM: "Xem danh m???c nh??m quy???n",
    },
  },
};

export const PERMISSION_NAME = {
  QUAN_TRI_HE_THONG: "system_admin",
  QUAN_TRI_DON_VI_GOC: "donvi_goc_admin",
  QUAN_LY_VAI_TRO: "ManageRole",
  QUAN_LY_NGUOI_DUNG: "ManageUser",
  DON_VI: {
    XEM: "donvi_xem",
    THEM: "donvi_them",
    SUA: "donvi_sua",
    XOA: "donvi_xoa"
  },
  CAN_BO: {
    XEM: "canbo_xem",
    THEM: "canbo_them",
    SUA: "canbo_sua",
    XOA: "canbo_xoa"
  },
  THONG_BAO_TUY_CHINH: {
    TAO: "thongbao_tao",
    SUA: "thongbao_sua",
    XEM: "thongbao_xem",
  }
};

export const VAI_TRO_TAB = {
  THONG_TIN_VAI_TRO: "thong-tin-nhom",
  NGUOI_DUNG: "nguoi-dung",
  QUYEN: "quyen"
};

export const NGUOI_DUNG_TAB = {
  THONG_TIN_NGUOI_DUNG: "thong-tin-nguoi-dung",
  VAI_TRO: "vai-tro",
  QUYEN: "quyen"
};

export const NO_RESULTS_TEXT = "Kh??ng t??m th???y k???t qu???";

export const TREE_SELECT_PLACEHOLDER = "Ch???n ????n v???";

export const MA_TRA_LOI = {
  THANH_CONG: 1,
  THAT_BAI: 0
};

export const PERMISSION_ROLE = {
  XEM: "Xem",
  CAP_NHAT: "CapNhat"
};
export const BANG_DM_DON_VI = {
  stt: "STT",
  tenDonVi: "T??n ????n v???",
  maDonVi: "M?? ????n v???",
  capDonVi: "C???p ????n v???",
  soDonViTrucThuoc: "S??? ????n v??? tr???c thu???c",
  soDienThoai: "S??? ??i???n tho???i",
  email: "Email",
  fax: "Fax",
  tacVu: "T??c v???"
};

export const THONG_BAO_TUY_CHINH = {
  stt: "STT",
  tieuDe: "Ti??u ?????",
  moTa: "M?? t???",
  ngayGui: "Ng??y g???i",
  trangThai: "Tr???ng th??i",
  thaoTac: "Thao t??c"
};

export const BANG_NGUOI_DUNG = {
  checkbox: "",
  stt: "STT",
  name: "H??? v?? t??n",
  userName: "T??n ????ng nh???p",
  donVi: "????n v???",
  vaiTro: "Vai tr??",
  trangThai: "Tr???ng th??i",
  thaoTac: "Thao t??c",
};

export const BANG_VAI_TRO = {
  checkbox: "",
  stt: "STT",
  displayName: "T??n vai tr??",
  name: "M?? vai tr??",
  description: "M?? t??? vai tr??",
  thaoTac: "Thao t??c"
};

export const BANG_DANH_SACH_QUYEN = {
  name: "M?? quy???n",
  displayName: "T??n quy???n",
  thaoTac: "Thao t??c"
};

export const BANG_THEM_CAN_BO_VAO_NGUOI_DUNG = {
  checkbox: "",
  stt: "STT",
  hoTen: "H??? v?? t??n",
  userName: "T??n ????ng nh???p",
  thaoTac: "Thao t??c"
};

export const THONG_TIN_TAI_KHOAN = {
  userName: "T??n ????ng nh???p",
  hoTen: "H??? v?? t??n",
  email: "Email",
  chucVu: "Ch???c v???",
  donVi: "????n v???"
};

export const BO_QUA_BUTTON_LABEL = "B??? qua";
export const QUAY_LAI_BUTTON_LABEL = "Quay l???i";
export const HUY_BO_BUTTON_LABEL = "H???y b???";
export const DONG_Y_BUTTON_LABEL = "?????ng ??";

export const LICH_LAM_VIEC_CUA_LANH_DAO = "lich-lam-viec-cua-lanh-dao";
export const LICH_LAM_VIEC_CUA_DON_VI = "lich-lam-viec-cua-don-vi";
export const LICH_LAM_VIEC_CUA_CA_NHAN = "lich-lam-viec-cua-ca-nhan";
export const TRANG_THAI_THONG_BAO = {
  TAT_CA: 0,
  NHAP: 1,
  CHO_DUYET: 2,
  TU_CHOI_DUYET: 3,
  DA_DUYET: 4,
  DA_DANG: 5
};
export const QUAN_LY_DANH_MUC_TAB = {
  QUAN_LY_THONG_TIN_BO_TRO: "quan-ly-thong-tin-bo-tro",
  QUAN_LY_CHI_TIEU: "quan-ly-chi-tieu",
  QUAN_LY_THUOC_TINH: "quan-ly-thuoc-tinh"
};

export const QUAN_TRI_THONG_BA0_TAB = {
  QUAN_LY_NGUON_NHAN_THONG_BAO: "quan-ly-nguon-nhan-thong-bao",
  QUAN_LY_LOAI_THONG_BAO: "quan-ly-loai-thong-bao"
};
