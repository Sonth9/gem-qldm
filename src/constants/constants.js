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
  TRANG_CHU: "Bảng điều khiển",
  _401: "Token hết hạn",
  _403: "Chưa có quyền",
  _404: "Không tìm thấy",
  _500: "Lỗi máy chủ nội bộ",
  HO_SO: {
    NAME: "Hồ sơ",
    DANH_SACH: "Danh sách",
    CHI_TIET: "Chi tiết",
    TAO: "Tạo"
  },
  QUAN_LY_DANH_MUC: {
    NAME: "Quản lý danh mục",
    HO_SO_CAN_BO: {
      NAME: "Hồ sơ cán bộ",
      DANH_SACH: "Hồ sơ cán bộ",
      TAO: "Thêm mới hồ sơ cán bộ",
      SUA: "Sửa hồ sơ cán bộ",
      XEM: "Xem hồ sơ cán bộ",
      XEM_THUOC_DON_VI: "Xem hồ sơ cán bộ",
      MENU: "Phân Quyền menu cán bộ"
    },
    DON_VI: {
      NAME: "Đơn vị",
      DANH_SACH: "Đơn vị",
      TAO: "Thêm mới đơn vị",
      SUA: "Sửa đơn vị",
      XEM: "Xem đơn vị"
    },
    THONG_BAO_TUY_CHINH: {
      NAME: "Thông báo tùy chỉnh",
      TAO: "Thêm mới thông báo",
      SUA: "Cập nhật thông báo",
      DANH_SACH: "Thông báo tùy chỉnh",
      XEM: "Xem thông báo tùy chỉnh"
    }
  },
  QUAN_TRI_HE_THONG: {
    NAME: "Quản trị hệ thống",
    VAI_TRO: "Quản lý vai trò",
    XEM_VAI_TRO: "Xem thông tin vai trò",
    CAP_NHAT_VAI_TRO: "Cập nhật vai trò",
    NGUOI_DUNG: "Quản lý người dùng",
    XEM_NGUOI_DUNG: "Xem thông tin người dùng",
    CAP_NHAT_NGUOI_DUNG: "Cập nhật người dùng",
    CHUC_VU: {
      NAME: "Chức vụ",
      TAO: "Thêm mới chứ vụ",
      SUA: "Sửa chức vụ",
      XEM: "Xem chức vụ"
    },
    NHOM_CHUC_VU: {
      NAME: "Nhóm chức vụ",
      TAO: "Thêm mới nhóm chức vụ",
      SUA: "Sửa nhóm chức vụ",
      XEM: "Xem nhóm chức vụ"
    },
    DM_HE_THONG: {
      NAME: "Danh mục hệ thống",
      TAO: "Thêm mới danh mục hệ thống",
      SUA: "Sửa danh mục hệ thống",
      XEM: "Xem danh mục hệ thống"
    },
    DM_MENU_HE_THONG: {
      NAME: "Danh mục menu hệ thống",
      TAO: "Thêm mới danh mục menu hệ thống",
      SUA: "Sửa danh mục menu hệ thống",
      XEM: "Xem danh mục menu hệ thống"
    },
    DM_NHOM_MENU: {
      NAME: "Danh mục nhóm quyền",
      TAO: "Thêm mới danh mục nhóm quyền",
      SUA: "Sửa danh mục nhóm quyền",
      XEM: "Xem danh mục nhóm quyền",
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

export const NO_RESULTS_TEXT = "Không tìm thấy kết quả";

export const TREE_SELECT_PLACEHOLDER = "Chọn đơn vị";

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
  tenDonVi: "Tên đơn vị",
  maDonVi: "Mã đơn vị",
  capDonVi: "Cấp đơn vị",
  soDonViTrucThuoc: "Số đơn vị trực thuộc",
  soDienThoai: "Số điện thoại",
  email: "Email",
  fax: "Fax",
  tacVu: "Tác vụ"
};

export const THONG_BAO_TUY_CHINH = {
  stt: "STT",
  tieuDe: "Tiêu đề",
  moTa: "Mô tả",
  ngayGui: "Ngày gửi",
  trangThai: "Trạng thái",
  thaoTac: "Thao tác"
};

export const BANG_NGUOI_DUNG = {
  checkbox: "",
  stt: "STT",
  name: "Họ và tên",
  userName: "Tên đăng nhập",
  donVi: "Đơn vị",
  vaiTro: "Vai trò",
  trangThai: "Trạng thái",
  thaoTac: "Thao tác",
};

export const BANG_VAI_TRO = {
  checkbox: "",
  stt: "STT",
  displayName: "Tên vai trò",
  name: "Mã vai trò",
  description: "Mô tả vai trò",
  thaoTac: "Thao tác"
};

export const BANG_DANH_SACH_QUYEN = {
  name: "Mã quyền",
  displayName: "Tên quyền",
  thaoTac: "Thao tác"
};

export const BANG_THEM_CAN_BO_VAO_NGUOI_DUNG = {
  checkbox: "",
  stt: "STT",
  hoTen: "Họ và tên",
  userName: "Tên đăng nhập",
  thaoTac: "Thao tác"
};

export const THONG_TIN_TAI_KHOAN = {
  userName: "Tên đăng nhập",
  hoTen: "Họ và tên",
  email: "Email",
  chucVu: "Chức vụ",
  donVi: "Đơn vị"
};

export const BO_QUA_BUTTON_LABEL = "Bỏ qua";
export const QUAY_LAI_BUTTON_LABEL = "Quay lại";
export const HUY_BO_BUTTON_LABEL = "Hủy bỏ";
export const DONG_Y_BUTTON_LABEL = "Đồng ý";

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
