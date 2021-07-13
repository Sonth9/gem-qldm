export default {
  AUTH: {
    DANG_NHAP: "/auth/login",
    REFRESH_TOKEN: "/auth/refresh-token"
  },
  CAN_BO: {
    SEARCH: "/CanBo/search",
    UPLOAD: "/CanBo/upload",
    CRUD: "/CanBo",
    MENU: "/CanBoMenu",
    USER: "/CanBo/can-bo-users",
    TRANSFER: "/CanBo/chuyen-cong-tac"
  },
  // Đơn vị
  DON_VI: {
    ALL: "/DonVi/all",
    SEARCH: "/DonVi/search",
    TREE: "/DonVi/list-tree",
    CRUD: "/DonVi",
    CHILDREN: "/DonVi/all-by-don-vi-cha",
    ORDER: "/DonVi/update-order"
  },
  THONG_BAO_CUSTOM: {
    CRUD: "/CustomNotification",
    SEARCH: "/CustomNotification/search"
  },
  CHUC_VU: {
    ALL: "/ChucVu/all",
    SEARCH: "/ChucVu/search",
    ORDER: "/ChucVu/update-order",
    CRUD: "/ChucVu"
  },
  NHOM_CHUC_VU: {
    ALL: "/NhomChucVu/all",
    ORDER: "/NhomChucVu/update-order",
    CRUD: "/NhomChucVu"
  },
  DANH_MUC_HE_THONG: {
    ALL: "/DanhMucHeThong/all",
    ORDER: "/DanhMucHeThong/update-order",
    CRUD: "/DanhMucHeThong"
  },
  DANH_MUC_MENU_HE_THONG: {
    ALL: "/DanhMucMenuHeThong/all",
    TREE: "/DanhMucMenuHeThong/list-tree",
    ORDER: "/DanhMucMenuHeThong/update-order",
    CRUD: "/DanhMucMenuHeThong"
  },
  DANH_MUC_NHOM_MENU: {
    SEARCH: "/NhomQuyen/search",
    CRUD: "/NhomQuyen",
    USER: "/NhomQuyen/can-bo-nhom-quyen",
    PERMISSION: "/NhomQuyen/nhom-quyen-menu"
  },
  USER: {
    NAME: "/users",
    LAY_CHI_TIET_NGUOI_DUNG: "/users",
    NGUOI_DUNG_GOM_QUYEN: "/users/search",
    DANH_SACH_VAI_TRO_THEO_NGUOI_DUNG: "/users",
    DANH_SACH_VAI_TRO_KHONG_THUOC_NGUOI_DUNG: "/users",
    DANH_SACH_QUYEN_THEO_NGUOI_DUNG: "/users",
    DANH_SACH_QUYEN_KHONG_THUOC_NGUOI_DUNG: "/users",
    CAP_NHAT_VAI_TRO_THEO_NGUOI_DUNG: "/users",
    CAP_NHAT_QUYEN_THEO_NGUOI_DUNG: "/users",
    CAP_NHAT_EMAIL_NGUOI_DUNG: "/users",
    CAP_NHAT_ACTIVE_NGUOI_DUNG: "/DmUser"
  },
  PERMISSION: {
    DANH_SACH_TAT_CA_QUYEN: "/permissions/search"
  },
  ROLE: {
    DANH_SACH_QUYEN_THEO_VAI_TRO: "/roles",
    DANH_SACH_QUYEN_KHONG_THUOC_VAI_TRO: "/roles",
    CAP_NHAT_QUYEN_TRONG_VAI_TRO: "/roles",
    NGUOI_DUNG_THEO_VAI_TRO: "/roles",
    NGUOI_DUNG_KHONG_THUOC_VAI_TRO: "/roles",
    THEM_NGUOI_DUNG_TRONG_VAI_TRO: "/roles",
    XOA_NGUOI_DUNG_TRONG_VAI_TRO: "/roles",
    CAP_NHAT_THONG_TIN_VAI_TRO: "/roles",
    DANH_SACH_VAI_TRO: "/roles/search",
    XOA_VAI_TRO: "/roles/",
    TAO_VAI_TRO: "/roles",
    CHI_TIET_VAI_TRO: "/roles"
  },
  THONG_BAO: {
    TAO_THONG_BAO: "/News",
    CAP_NHAT_THONG_BAO: "/News",
    GET_CHI_TIET_THONG_BAO: "/News/getById",
    XOA_THONG_BAO: "/News",
    DUYET_THONG_BAO: "/News/approve",
    GUI_DUYET_THONG_BAO: "/News/submit",
    DANG_THONG_BAO: "/News/publish",
    TU_CHOI_DUYET_THONG_BAO: "/News/reject",
    DONG_MO_THONG_BAO: "/News/changeStatus",
    DANH_SACH_QUAN_LY_THONG_BAO: "/News/getPaging",
    GET_TAT_CA_DANH_MUC: "/NewsCategories/getAll",
    GET_TAT_CA_DANH_MUC_THEO_PAGING: "/NewsCategories/getPaging",
    GET_TAT_CA_NGUON_NHAN_THONG_BAO: "/NewsTypes/getAll",
    GET_CHI_TIET_DANH_MUC: "/NewsCategories/getById",
    LICH_SU_THAO_TAC: "NewsLogs/getAllByNewsId"
  },
  LICH_LAM_VIEC: {
    GET_TAT_CA_LOAI_LICH_LAM_VIEC: "/ScheduleTypes/getAll",
    GET_CHI_TIET_LOAI_LICH_LAM_VIEC: "/ScheduleTypes/getById",
    TAO_LICH_LAM_VIEC: "/Schedules",
    LAY_LICH_LAM_VIEC: "/Schedules",
    CAP_NHAT_LICH_LAM_VIEC: "/Schedules",
    GET_CHI_TIET_LICH_LAM_VIEC: "/Schedules",
    XOA_LICH_LAM_VIEC: "/Schedules/",
    GET_DANH_SACH_LICH_LAM_VIEC: "/Schedules",
    SUA_LICH_LAM_VIEC: "/Schedules",
    XUAT_LICH_LAM_VIEC: "/Schedules/exportdata",
    TREE: "/Schedules/list-tree",
    CHILDREN: "/ScheduleTypes/getByParrentId",
  },
  QUAN_TRI_HE_THONG: {
    QUAN_TRI_THONG_BAO_LOAI: "/NewsCategories/getPaging",
    QUAN_TRI_THONG_BAO_NGUON: "/NewsTypes/getPaging",
    THEM_SUA_LOAI: "/NewsCategories",
    XOA_LOAI: "/NewsCategories/",
    THEM_SUA_NGUON: "/NewsTypes",
    XOA_NGUON: "/NewsTypes/"
  }
};
