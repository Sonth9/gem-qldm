import Vue from "vue";
import Router from "vue-router";
import store from "@/store";
import { getValueFromStorageByKey } from "@/utils/localStorage";
import { hasPermission } from "@/utils/permissionUtils";

import { MENU_ROUTE_NAME, PERMISSION_NAME, ROUTE_NAME } from "@/constants/constants";

const TrangChu = resolve => {
  // require.ensure is Webpack's special syntax for a code-split point.
  require.ensure(["@/views/TrangChu"], () => {
    resolve(require("@/views/TrangChu"));
  });
};

const Trang401 = resolve => {
  // require.ensure is Webpack's special syntax for a code-split point.
  require.ensure(["@/views/errors/401"], () => {
    resolve(require("@/views/errors/401"));
  });
};

const Trang403 = resolve => {
  // require.ensure is Webpack's special syntax for a code-split point.
  require.ensure(["@/views/errors/403"], () => {
    resolve(require("@/views/errors/403"));
  });
};

const Trang404 = resolve => {
  // require.ensure is Webpack's special syntax for a code-split point.
  require.ensure(["@/views/errors/404"], () => {
    resolve(require("@/views/errors/404"));
  });
};

const Trang500 = resolve => {
  // require.ensure is Webpack's special syntax for a code-split point.
  require.ensure(["@/views/errors/500"], () => {
    resolve(require("@/views/errors/500"));
  });
};

const TrangDangNhap = resolve => {
  // require.ensure is Webpack's special syntax for a code-split point.
  require.ensure(["@/views/TrangDangNhap"], () => {
    resolve(require("@/views/TrangDangNhap"));
  });
};

const TrangRouter = resolve => {
  require.ensure(["@/views/TrangRouter"], () => {
    resolve(require("@/views/TrangRouter"));
  });
};

const TrangDanhSachHoSoCanBo = resolve => {
  // require.ensure is Webpack's special syntax for a code-split point.
  require.ensure(
    ["@/views/quan-ly-danh-muc/ho-so-can-bo/TrangDanhSachHoSoCanBo"],
    () => {
      resolve(
        require("@/views/quan-ly-danh-muc/ho-so-can-bo/TrangDanhSachHoSoCanBo")
      );
    }
  );
};

const TrangTaoHoSoCanBo = resolve => {
  // require.ensure is Webpack's special syntax for a code-split point.
  require.ensure(
    ["@/views/quan-ly-danh-muc/ho-so-can-bo/TrangTaoHoSoCanBo"],
    () => {
      resolve(
        require("@/views/quan-ly-danh-muc/ho-so-can-bo/TrangTaoHoSoCanBo")
      );
    }
  );
};

const TrangSuaHoSoCanBo = resolve => {
  // require.ensure is Webpack's special syntax for a code-split point.
  require.ensure(
    ["@/views/quan-ly-danh-muc/ho-so-can-bo/TrangSuaHoSoCanBo"],
    () => {
      resolve(
        require("@/views/quan-ly-danh-muc/ho-so-can-bo/TrangSuaHoSoCanBo")
      );
    }
  );
};

const TrangXemHoSoCanBo = resolve => {
  // require.ensure is Webpack's special syntax for a code-split point.
  require.ensure(
    ["@/views/quan-ly-danh-muc/ho-so-can-bo/TrangXemHoSoCanBo"],
    () => {
      resolve(
        require("@/views/quan-ly-danh-muc/ho-so-can-bo/TrangXemHoSoCanBo")
      );
    }
  );
};

const TrangXemHoSoCanBoThuocDonVi = resolve => {
  // require.ensure is Webpack's special syntax for a code-split point.
  require.ensure(
    ["@/views/quan-ly-danh-muc/ho-so-can-bo/TrangXemHoSoCanBoThuocDonVi"],
    () => {
      resolve(
        require("@/views/quan-ly-danh-muc/ho-so-can-bo/TrangXemHoSoCanBoThuocDonVi")
      );
    }
  );
};

const TrangDanhSachDonVi = resolve => {
  require.ensure(["@/views/quan-ly-danh-muc/don-vi/TrangDanhSachDonVi"], () => {
    resolve(require("@/views/quan-ly-danh-muc/don-vi/TrangDanhSachDonVi"));
  });
};

const TrangTaoDonVi = resolve => {
  require.ensure(["@/views/quan-ly-danh-muc/don-vi/TrangTaoDonVi"], () => {
    resolve(require("@/views/quan-ly-danh-muc/don-vi/TrangTaoDonVi"));
  });
};

const TrangSuaDonVi = resolve => {
  require.ensure(["@/views/quan-ly-danh-muc/don-vi/TrangSuaDonVi"], () => {
    resolve(require("@/views/quan-ly-danh-muc/don-vi/TrangSuaDonVi"));
  });
};
const TrangXemDonVi = resolve => {
  require.ensure(["@/views/quan-ly-danh-muc/don-vi/TrangXemDonVi"], () => {
    resolve(require("@/views/quan-ly-danh-muc/don-vi/TrangXemDonVi"));
  });
};
const TrangDanhSachThongBao = resolve => {
  require.ensure(["@/views/quan-ly-danh-muc/thong-bao-tuy-chinh/TrangDanhSachThongBao"], () => {
    resolve(require("@/views/quan-ly-danh-muc/thong-bao-tuy-chinh/TrangDanhSachThongBao"));
  });
};

const TrangThemThongBao = resolve => {
  require.ensure(["@/views/quan-ly-danh-muc/thong-bao-tuy-chinh/TrangThemThongBao"], () => {
    resolve(require("@/views/quan-ly-danh-muc/thong-bao-tuy-chinh/TrangThemThongBao"));
  });
};

const TrangSuaThongBao = resolve => {
  require.ensure(["@/views/quan-ly-danh-muc/thong-bao-tuy-chinh/TrangSuaThongBao"], () => {
    resolve(require("@/views/quan-ly-danh-muc/thong-bao-tuy-chinh/TrangSuaThongBao"));
  });
};

const TrangXemThongBaoTuyChon = resolve => {
  require.ensure(["@/views/quan-ly-danh-muc/thong-bao-tuy-chinh/TrangXemThongBao"], () => {
    resolve(require("@/views/quan-ly-danh-muc/thong-bao-tuy-chinh/TrangXemThongBao"));
  });
};

const TrangDanhSachChucVu = resolve => {
  require.ensure(
    ["@/views/quan-tri-he-thong/chuc-vu/TrangDanhSachChucVu"],
    () => {
      resolve(require("@/views/quan-tri-he-thong/chuc-vu/TrangDanhSachChucVu"));
    }
  );
};

const TrangTaoChucVu = resolve => {
  require.ensure(["@/views/quan-tri-he-thong/chuc-vu/TrangTaoChucVu"], () => {
    resolve(require("@/views/quan-tri-he-thong/chuc-vu/TrangTaoChucVu"));
  });
};

const TrangSuaChucVu = resolve => {
  require.ensure(["@/views/quan-tri-he-thong/chuc-vu/TrangSuaChucVu"], () => {
    resolve(require("@/views/quan-tri-he-thong/chuc-vu/TrangSuaChucVu"));
  });
};

const TrangXemChucVu = resolve => {
  require.ensure(["@/views/quan-tri-he-thong/chuc-vu/TrangXemChucVu"], () => {
    resolve(require("@/views/quan-tri-he-thong/chuc-vu/TrangXemChucVu"));
  });
};

const TrangDanhSachNhomChucVu = resolve => {
  require.ensure(
    ["@/views/quan-tri-he-thong/nhom-chuc-vu/TrangDanhSachNhomChucVu"],
    () => {
      resolve(
        require("@/views/quan-tri-he-thong/nhom-chuc-vu/TrangDanhSachNhomChucVu")
      );
    }
  );
};

const TrangTaoNhomChucVu = resolve => {
  require.ensure(
    ["@/views/quan-tri-he-thong/nhom-chuc-vu/TrangTaoNhomChucVu"],
    () => {
      resolve(
        require("@/views/quan-tri-he-thong/nhom-chuc-vu/TrangTaoNhomChucVu")
      );
    }
  );
};

const TrangSuaNhomChucVu = resolve => {
  require.ensure(
    ["@/views/quan-tri-he-thong/nhom-chuc-vu/TrangSuaNhomChucVu"],
    () => {
      resolve(
        require("@/views/quan-tri-he-thong/nhom-chuc-vu/TrangSuaNhomChucVu")
      );
    }
  );
};

const TrangXemNhomChucVu = resolve => {
  require.ensure(
    ["@/views/quan-tri-he-thong/nhom-chuc-vu/TrangXemNhomChucVu"],
    () => {
      resolve(
        require("@/views/quan-tri-he-thong/nhom-chuc-vu/TrangXemNhomChucVu")
      );
    }
  );
};

const TrangDanhSachDanhMucHeThong = resolve => {
  require.ensure(
    ["@/views/quan-tri-he-thong/dm-he-thong/TrangDanhSachDanhMucHeThong"],
    () => {
      resolve(
        require("@/views/quan-tri-he-thong/dm-he-thong/TrangDanhSachDanhMucHeThong")
      );
    }
  );
};

const TrangTaoDanhMucHeThong = resolve => {
  require.ensure(
    ["@/views/quan-tri-he-thong/dm-he-thong/TrangTaoDanhMucHeThong"],
    () => {
      resolve(
        require("@/views/quan-tri-he-thong/dm-he-thong/TrangTaoDanhMucHeThong")
      );
    }
  );
};

const TrangSuaDanhMucHeThong = resolve => {
  require.ensure(
    ["@/views/quan-tri-he-thong/dm-he-thong/TrangSuaDanhMucHeThong"],
    () => {
      resolve(
        require("@/views/quan-tri-he-thong/dm-he-thong/TrangSuaDanhMucHeThong")
      );
    }
  );
};

const TrangXemDanhMucHeThong = resolve => {
  require.ensure(
    ["@/views/quan-tri-he-thong/dm-he-thong/TrangXemDanhMucHeThong"],
    () => {
      resolve(
        require("@/views/quan-tri-he-thong/dm-he-thong/TrangXemDanhMucHeThong")
      );
    }
  );
};

const TrangDanhSachDanhMucMenuHeThong = resolve => {
  require.ensure(
    [
      "@/views/quan-tri-he-thong/dm-menu-he-thong/TrangDanhSachDanhMucMenuHeThong"
    ],
    () => {
      resolve(
        require("@/views/quan-tri-he-thong/dm-menu-he-thong/TrangDanhSachDanhMucMenuHeThong")
      );
    }
  );
};

const TrangTaoDanhMucMenuHeThong = resolve => {
  require.ensure(
    ["@/views/quan-tri-he-thong/dm-menu-he-thong/TrangTaoDanhMucMenuHeThong"],
    () => {
      resolve(
        require("@/views/quan-tri-he-thong/dm-menu-he-thong/TrangTaoDanhMucMenuHeThong")
      );
    }
  );
};

const TrangSuaDanhMucMenuHeThong = resolve => {
  require.ensure(
    ["@/views/quan-tri-he-thong/dm-menu-he-thong/TrangSuaDanhMucMenuHeThong"],
    () => {
      resolve(
        require("@/views/quan-tri-he-thong/dm-menu-he-thong/TrangSuaDanhMucMenuHeThong")
      );
    }
  );
};

const TrangXemDanhMucMenuHeThong = resolve => {
  require.ensure(
    ["@/views/quan-tri-he-thong/dm-menu-he-thong/TrangXemDanhMucMenuHeThong"],
    () => {
      resolve(
        require("@/views/quan-tri-he-thong/dm-menu-he-thong/TrangXemDanhMucMenuHeThong")
      );
    }
  );
};

const TrangDanhSachDanhMucNhomMenu = resolve => {
  require.ensure(
    ["@/views/quan-tri-he-thong/dm-nhom-menu/TrangDanhSachNhomMenu"],
    () => {
      resolve(
        require("@/views/quan-tri-he-thong/dm-nhom-menu/TrangDanhSachNhomMenu")
      );
    }
  );
};

const TrangTaoDanhMucNhomMenu = resolve => {
  require.ensure(
    ["@/views/quan-tri-he-thong/dm-nhom-menu/TrangTaoNhomMenu"],
    () => {
      resolve(
        require("@/views/quan-tri-he-thong/dm-nhom-menu/TrangTaoNhomMenu")
      );
    }
  );
};

const TrangSuaDanhMucNhomMenu = resolve => {
  require.ensure(
    ["@/views/quan-tri-he-thong/dm-nhom-menu/TrangSuaNhomMenu"],
    () => {
      resolve(
        require("@/views/quan-tri-he-thong/dm-nhom-menu/TrangSuaNhomMenu")
      );
    }
  );
};

const TrangXemDanhMucNhomMenu = resolve => {
  require.ensure(
    ["@/views/quan-tri-he-thong/dm-nhom-menu/TrangXemNhomMenu"],
    () => {
      resolve(
        require("@/views/quan-tri-he-thong/dm-nhom-menu/TrangXemNhomMenu")
      );
    }
  );
};

const TrangDanhSachVaiTro = resolve => {
  require.ensure(
    ["@/views/quan-tri-he-thong/vai-tro/TrangDanhSachVaiTro"],
    () => {
      resolve(require("@/views/quan-tri-he-thong/vai-tro/TrangDanhSachVaiTro"));
    }
  );
};

const TrangCapNhatVaiTro = resolve => {
  require.ensure(
    ["@/views/quan-tri-he-thong/vai-tro/TrangCapNhatVaiTro"],
    () => {
      resolve(require("@/views/quan-tri-he-thong/vai-tro/TrangCapNhatVaiTro"));
    }
  );
};

const TrangXemVaiTro = resolve => {
  require.ensure(["@/views/quan-tri-he-thong/vai-tro/TrangXemVaiTro"], () => {
    resolve(require("@/views/quan-tri-he-thong/vai-tro/TrangXemVaiTro"));
  });
};

const TrangCapNhatNguoiDung = resolve => {
  // require.ensure is Webpack's special syntax for a code-split point.
  require.ensure(
    ["@/views/quan-tri-he-thong/nguoi-dung/TrangCapNhatNguoiDung"],
    () => {
      resolve(
        require("@/views/quan-tri-he-thong/nguoi-dung/TrangCapNhatNguoiDung")
      );
    }
  );
};

const TrangXemNguoiDung = resolve => {
  require.ensure(
    ["@/views/quan-tri-he-thong/nguoi-dung/TrangXemNguoiDung"],
    () => {
      resolve(
        require("@/views/quan-tri-he-thong/nguoi-dung/TrangXemNguoiDung")
      );
    }
  );
};

const TrangQuanLyNguoiDung = resolve => {
  require.ensure(
    ["@/views/quan-tri-he-thong/nguoi-dung/TrangQuanLyNguoiDung"],
    () => {
      resolve(
        require("@/views/quan-tri-he-thong/nguoi-dung/TrangQuanLyNguoiDung")
      );
    }
  );
};

Vue.use(Router);

let router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: {
        name: ROUTE_NAME.TRANG_CHU
      }
    },
    {
      path: ROUTE_NAME.TRANG_CHU,
      name: ROUTE_NAME.TRANG_CHU,
      menuName: MENU_ROUTE_NAME.TRANG_CHU,
      component: TrangChu,
      icon: "tachometer-alt",
      isShowLeftMenu: true
    },
    {
      path: ROUTE_NAME._401,
      component: Trang401,
      isShowLeftMenu: false,
      expand: false
    },
    {
      path: ROUTE_NAME._403,
      component: Trang403,
      isShowLeftMenu: false,
      expand: false
    },
    {
      path: ROUTE_NAME._404,
      component: Trang404,
      isShowLeftMenu: false,
      expand: false
    },
    {
      path: ROUTE_NAME._500,
      component: Trang500,
      isShowLeftMenu: false,
      expand: false
    },
    {
      path: ROUTE_NAME.DANG_NHAP,
      name: ROUTE_NAME.DANG_NHAP,
      component: TrangDangNhap
    },
    {
      path: ROUTE_NAME.QUAN_LY_DANH_MUC.NAME,
      name: ROUTE_NAME.QUAN_LY_DANH_MUC.NAME,
      menuName: MENU_ROUTE_NAME.QUAN_LY_DANH_MUC.NAME,
      component: TrangRouter,
      props: true,
      icon: "th-list",
      isShowLeftMenu: true,
      expand: false,
      children: [
        {
          path: ROUTE_NAME.QUAN_LY_DANH_MUC.HO_SO_CAN_BO.NAME,
          name: ROUTE_NAME.QUAN_LY_DANH_MUC.HO_SO_CAN_BO.NAME,
          menuName: MENU_ROUTE_NAME.QUAN_LY_DANH_MUC.HO_SO_CAN_BO.NAME,
          component: TrangDanhSachHoSoCanBo,
          meta: {
            permissionName: PERMISSION_NAME.CAN_BO.XEM
          }
        },
        {
          path: ROUTE_NAME.QUAN_LY_DANH_MUC.HO_SO_CAN_BO.TAO,
          name: ROUTE_NAME.QUAN_LY_DANH_MUC.HO_SO_CAN_BO.TAO,
          menuName: MENU_ROUTE_NAME.QUAN_LY_DANH_MUC.HO_SO_CAN_BO.TAO,
          component: TrangTaoHoSoCanBo,
          isShowLeftMenu: false,
          meta: {
            permissionName: PERMISSION_NAME.CAN_BO.THEM
          }
        },
        {
          path: ROUTE_NAME.QUAN_LY_DANH_MUC.HO_SO_CAN_BO.SUA,
          name: ROUTE_NAME.QUAN_LY_DANH_MUC.HO_SO_CAN_BO.SUA,
          menuName: MENU_ROUTE_NAME.QUAN_LY_DANH_MUC.HO_SO_CAN_BO.SUA,
          component: TrangSuaHoSoCanBo,
          isShowLeftMenu: false,
          meta: {
            permissionName: PERMISSION_NAME.CAN_BO.SUA
          }
        },
        {
          path: ROUTE_NAME.QUAN_LY_DANH_MUC.HO_SO_CAN_BO.XEM,
          name: ROUTE_NAME.QUAN_LY_DANH_MUC.HO_SO_CAN_BO.XEM,
          menuName: MENU_ROUTE_NAME.QUAN_LY_DANH_MUC.HO_SO_CAN_BO.XEM,
          component: TrangXemHoSoCanBo,
          isShowLeftMenu: false,
          meta: {
            permissionName: PERMISSION_NAME.CAN_BO.XEM
          }
        },
        {
          path: ROUTE_NAME.QUAN_LY_DANH_MUC.HO_SO_CAN_BO.XEM_THUOC_DON_VI,
          name: ROUTE_NAME.QUAN_LY_DANH_MUC.HO_SO_CAN_BO.XEM_THUOC_DON_VI,
          menuName:
          MENU_ROUTE_NAME.QUAN_LY_DANH_MUC.HO_SO_CAN_BO.XEM_THUOC_DON_VI,
          component: TrangXemHoSoCanBoThuocDonVi,
          isShowLeftMenu: false,
          meta: {
            permissionName: PERMISSION_NAME.CAN_BO.XEM
          }
        },
        {
          path: ROUTE_NAME.QUAN_LY_DANH_MUC.DON_VI.NAME,
          name: ROUTE_NAME.QUAN_LY_DANH_MUC.DON_VI.NAME,
          menuName: MENU_ROUTE_NAME.QUAN_LY_DANH_MUC.DON_VI.NAME,
          component: TrangDanhSachDonVi,
          meta: {
            permissionName: PERMISSION_NAME.DON_VI.XEM
          }
        },
        {
          path: ROUTE_NAME.QUAN_LY_DANH_MUC.DON_VI.TAO,
          name: ROUTE_NAME.QUAN_LY_DANH_MUC.DON_VI.TAO,
          menuName: MENU_ROUTE_NAME.QUAN_LY_DANH_MUC.DON_VI.TAO,
          component: TrangTaoDonVi,
          isShowLeftMenu: false,
          meta: {
            permissionName: PERMISSION_NAME.DON_VI.THEM
          }
        },
        {
          path: ROUTE_NAME.QUAN_LY_DANH_MUC.DON_VI.SUA,
          name: ROUTE_NAME.QUAN_LY_DANH_MUC.DON_VI.SUA,
          menuName: MENU_ROUTE_NAME.QUAN_LY_DANH_MUC.DON_VI.SUA,
          component: TrangSuaDonVi,
          isShowLeftMenu: false,
          meta: {
            permissionName: PERMISSION_NAME.DON_VI.SUA
          }
        },
        {
          path: ROUTE_NAME.QUAN_LY_DANH_MUC.DON_VI.XEM,
          name: ROUTE_NAME.QUAN_LY_DANH_MUC.DON_VI.XEM,
          menuName: MENU_ROUTE_NAME.QUAN_LY_DANH_MUC.DON_VI.XEM,
          component: TrangXemDonVi,
          isShowLeftMenu: false,
          meta: {
            permissionName: PERMISSION_NAME.DON_VI.XEM
          }
        },
        {
          path: ROUTE_NAME.QUAN_LY_DANH_MUC.THONG_BAO_TUY_CHINH.NAME,
          name: ROUTE_NAME.QUAN_LY_DANH_MUC.THONG_BAO_TUY_CHINH.NAME,
          menuName: MENU_ROUTE_NAME.QUAN_LY_DANH_MUC.THONG_BAO_TUY_CHINH.NAME,
          component: TrangDanhSachThongBao,
          meta: {
            permissionName: PERMISSION_NAME.THONG_BAO_TUY_CHINH.XEM
          }
        },
        {
          path: ROUTE_NAME.QUAN_LY_DANH_MUC.THONG_BAO_TUY_CHINH.TAO,
          name: ROUTE_NAME.QUAN_LY_DANH_MUC.THONG_BAO_TUY_CHINH.TAO,
          menuName: MENU_ROUTE_NAME.QUAN_LY_DANH_MUC.THONG_BAO_TUY_CHINH.TAO,
          component: TrangThemThongBao,
          isShowLeftMenu: false,
          meta: {
            permissionName: PERMISSION_NAME.THONG_BAO_TUY_CHINH.TAO
          }
        },
        {
          path: ROUTE_NAME.QUAN_LY_DANH_MUC.THONG_BAO_TUY_CHINH.SUA,
          name: ROUTE_NAME.QUAN_LY_DANH_MUC.THONG_BAO_TUY_CHINH.SUA,
          menuName: MENU_ROUTE_NAME.QUAN_LY_DANH_MUC.THONG_BAO_TUY_CHINH.SUA,
          component: TrangSuaThongBao,
          isShowLeftMenu: false,
          meta: {
            permissionName: PERMISSION_NAME.THONG_BAO_TUY_CHINH.SUA
          }
        },
        {
          path: ROUTE_NAME.QUAN_LY_DANH_MUC.THONG_BAO_TUY_CHINH.XEM,
          name: ROUTE_NAME.QUAN_LY_DANH_MUC.THONG_BAO_TUY_CHINH.XEM,
          menuName: MENU_ROUTE_NAME.QUAN_LY_DANH_MUC.THONG_BAO_TUY_CHINH.XEM,
          component: TrangXemThongBaoTuyChon,
          isShowLeftMenu: false,
          meta: {
            permissionName: PERMISSION_NAME.THONG_BAO_TUY_CHINH.XEM
          }
        },
      ]
    },
    {
      path: ROUTE_NAME.QUAN_TRI_HE_THONG.NAME,
      name: ROUTE_NAME.QUAN_TRI_HE_THONG.NAME,
      menuName: MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.NAME,
      component: TrangRouter,
      props: true,
      icon: "cogs",
      isShowLeftMenu: true,
      expand: false,
      meta: {
        permissionName: PERMISSION_NAME.QUAN_TRI_HE_THONG,
        permissions: [
          PERMISSION_NAME.QUAN_TRI_HE_THONG,
          PERMISSION_NAME.QUAN_LY_VAI_TRO,
          PERMISSION_NAME.QUAN_LY_NGUOI_DUNG,
        ]
      },
      children: [
        {
          path: ROUTE_NAME.QUAN_TRI_HE_THONG.CHUC_VU.NAME,
          name: ROUTE_NAME.QUAN_TRI_HE_THONG.CHUC_VU.NAME,
          menuName: MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.CHUC_VU.NAME,
          component: TrangDanhSachChucVu,
          meta: {
            permissionName: PERMISSION_NAME.QUAN_TRI_HE_THONG
          }
        },
        {
          path: ROUTE_NAME.QUAN_TRI_HE_THONG.CHUC_VU.TAO,
          name: ROUTE_NAME.QUAN_TRI_HE_THONG.CHUC_VU.TAO,
          menuName: MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.CHUC_VU.TAO,
          component: TrangTaoChucVu,
          isShowLeftMenu: false,
          meta: {
            permissionName: PERMISSION_NAME.QUAN_TRI_HE_THONG
          }
        },
        {
          path: ROUTE_NAME.QUAN_TRI_HE_THONG.CHUC_VU.SUA,
          name: ROUTE_NAME.QUAN_TRI_HE_THONG.CHUC_VU.SUA,
          menuName: MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.CHUC_VU.SUA,
          component: TrangSuaChucVu,
          isShowLeftMenu: false,
          meta: {
            permissionName: PERMISSION_NAME.QUAN_TRI_HE_THONG
          }
        },
        {
          path: ROUTE_NAME.QUAN_TRI_HE_THONG.CHUC_VU.XEM,
          name: ROUTE_NAME.QUAN_TRI_HE_THONG.CHUC_VU.XEM,
          menuName: MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.CHUC_VU.XEM,
          component: TrangXemChucVu,
          isShowLeftMenu: false,
          meta: {
            permissionName: PERMISSION_NAME.QUAN_TRI_HE_THONG
          }
        },
        {
          path: ROUTE_NAME.QUAN_TRI_HE_THONG.NHOM_CHUC_VU.NAME,
          name: ROUTE_NAME.QUAN_TRI_HE_THONG.NHOM_CHUC_VU.NAME,
          menuName: MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.NHOM_CHUC_VU.NAME,
          component: TrangDanhSachNhomChucVu,
          meta: {
            permissionName: PERMISSION_NAME.QUAN_TRI_HE_THONG
          }
        },
        {
          path: ROUTE_NAME.QUAN_TRI_HE_THONG.NHOM_CHUC_VU.TAO,
          name: ROUTE_NAME.QUAN_TRI_HE_THONG.NHOM_CHUC_VU.TAO,
          menuName: MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.NHOM_CHUC_VU.TAO,
          component: TrangTaoNhomChucVu,
          isShowLeftMenu: false,
          meta: {
            permissionName: PERMISSION_NAME.QUAN_TRI_HE_THONG
          }
        },
        {
          path: ROUTE_NAME.QUAN_TRI_HE_THONG.NHOM_CHUC_VU.SUA,
          name: ROUTE_NAME.QUAN_TRI_HE_THONG.NHOM_CHUC_VU.SUA,
          menuName: MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.NHOM_CHUC_VU.SUA,
          component: TrangSuaNhomChucVu,
          isShowLeftMenu: false,
          meta: {
            permissionName: PERMISSION_NAME.QUAN_TRI_HE_THONG
          }
        },
        {
          path: ROUTE_NAME.QUAN_TRI_HE_THONG.NHOM_CHUC_VU.XEM,
          name: ROUTE_NAME.QUAN_TRI_HE_THONG.NHOM_CHUC_VU.XEM,
          menuName: MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.NHOM_CHUC_VU.XEM,
          component: TrangXemNhomChucVu,
          isShowLeftMenu: false,
          meta: {
            permissionName: PERMISSION_NAME.QUAN_TRI_HE_THONG
          }
        },
        {
          path: ROUTE_NAME.QUAN_TRI_HE_THONG.DM_HE_THONG.NAME,
          name: ROUTE_NAME.QUAN_TRI_HE_THONG.DM_HE_THONG.NAME,
          menuName: MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.DM_HE_THONG.NAME,
          component: TrangDanhSachDanhMucHeThong,
          isShowLeftMenu: true,
          meta: {
            permissionName: PERMISSION_NAME.QUAN_TRI_HE_THONG
          }
        },
        {
          path: ROUTE_NAME.QUAN_TRI_HE_THONG.DM_HE_THONG.TAO,
          name: ROUTE_NAME.QUAN_TRI_HE_THONG.DM_HE_THONG.TAO,
          menuName: MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.DM_HE_THONG.TAO,
          component: TrangTaoDanhMucHeThong,
          isShowLeftMenu: false,
          meta: {
            permissionName: PERMISSION_NAME.QUAN_TRI_HE_THONG
          }
        },
        {
          path: ROUTE_NAME.QUAN_TRI_HE_THONG.DM_HE_THONG.SUA,
          name: ROUTE_NAME.QUAN_TRI_HE_THONG.DM_HE_THONG.SUA,
          menuName: MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.DM_HE_THONG.SUA,
          component: TrangSuaDanhMucHeThong,
          isShowLeftMenu: false,
          meta: {
            permissionName: PERMISSION_NAME.QUAN_TRI_HE_THONG
          }
        },
        {
          path: ROUTE_NAME.QUAN_TRI_HE_THONG.DM_HE_THONG.XEM,
          name: ROUTE_NAME.QUAN_TRI_HE_THONG.DM_HE_THONG.XEM,
          menuName: MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.DM_HE_THONG.XEM,
          component: TrangXemDanhMucHeThong,
          isShowLeftMenu: false,
          meta: {
            permissionName: PERMISSION_NAME.QUAN_TRI_HE_THONG
          }
        },
        {
          path: ROUTE_NAME.QUAN_TRI_HE_THONG.DM_MENU_HE_THONG.NAME,
          name: ROUTE_NAME.QUAN_TRI_HE_THONG.DM_MENU_HE_THONG.NAME,
          menuName: MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.DM_MENU_HE_THONG.NAME,
          component: TrangDanhSachDanhMucMenuHeThong,
          isShowLeftMenu: true,
          meta: {
            permissionName: PERMISSION_NAME.QUAN_TRI_HE_THONG
          }
        },
        {
          path: ROUTE_NAME.QUAN_TRI_HE_THONG.DM_MENU_HE_THONG.TAO,
          name: ROUTE_NAME.QUAN_TRI_HE_THONG.DM_MENU_HE_THONG.TAO,
          menuName: MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.DM_MENU_HE_THONG.TAO,
          component: TrangTaoDanhMucMenuHeThong,
          isShowLeftMenu: false,
          meta: {
            permissionName: PERMISSION_NAME.QUAN_TRI_HE_THONG
          }
        },
        {
          path: ROUTE_NAME.QUAN_TRI_HE_THONG.DM_MENU_HE_THONG.SUA,
          name: ROUTE_NAME.QUAN_TRI_HE_THONG.DM_MENU_HE_THONG.SUA,
          menuName: MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.DM_MENU_HE_THONG.SUA,
          component: TrangSuaDanhMucMenuHeThong,
          isShowLeftMenu: false,
          meta: {
            permissionName: PERMISSION_NAME.QUAN_TRI_HE_THONG
          }
        },
        {
          path: ROUTE_NAME.QUAN_TRI_HE_THONG.DM_MENU_HE_THONG.XEM,
          name: ROUTE_NAME.QUAN_TRI_HE_THONG.DM_MENU_HE_THONG.XEM,
          menuName: MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.DM_MENU_HE_THONG.XEM,
          component: TrangXemDanhMucMenuHeThong,
          isShowLeftMenu: false,
          meta: {
            permissionName: PERMISSION_NAME.QUAN_TRI_HE_THONG
          }
        },
        {
          path: ROUTE_NAME.QUAN_TRI_HE_THONG.DM_NHOM_MENU.NAME,
          name: ROUTE_NAME.QUAN_TRI_HE_THONG.DM_NHOM_MENU.NAME,
          menuName: MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.DM_NHOM_MENU.NAME,
          component: TrangDanhSachDanhMucNhomMenu,
          isShowLeftMenu: true,
          meta: {
            permissionName: PERMISSION_NAME.QUAN_TRI_HE_THONG
          }
        },
        {
          path: ROUTE_NAME.QUAN_TRI_HE_THONG.DM_NHOM_MENU.TAO,
          name: ROUTE_NAME.QUAN_TRI_HE_THONG.DM_NHOM_MENU.TAO,
          menuName: MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.DM_NHOM_MENU.TAO,
          component: TrangTaoDanhMucNhomMenu,
          isShowLeftMenu: false,
          meta: {
            permissionName: PERMISSION_NAME.QUAN_TRI_HE_THONG
          }
        },
        {
          path: ROUTE_NAME.QUAN_TRI_HE_THONG.DM_NHOM_MENU.SUA,
          name: ROUTE_NAME.QUAN_TRI_HE_THONG.DM_NHOM_MENU.SUA,
          menuName: MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.DM_NHOM_MENU.SUA,
          component: TrangSuaDanhMucNhomMenu,
          isShowLeftMenu: false,
          meta: {
            permissionName: PERMISSION_NAME.QUAN_TRI_HE_THONG
          }
        },
        {
          path: ROUTE_NAME.QUAN_TRI_HE_THONG.DM_NHOM_MENU.XEM,
          name: ROUTE_NAME.QUAN_TRI_HE_THONG.DM_NHOM_MENU.XEM,
          menuName: MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.DM_NHOM_MENU.XEM,
          component: TrangXemDanhMucNhomMenu,
          isShowLeftMenu: false,
          meta: {
            permissionName: PERMISSION_NAME.QUAN_TRI_HE_THONG
          }
        },
        // {
        //   path: ROUTE_NAME.QUAN_TRI_HE_THONG.THONG_BAO.NAME,
        //   name: ROUTE_NAME.QUAN_TRI_HE_THONG.THONG_BAO.NAME,
        //   menuName: MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.THONG_BAO.NAME,
        //   component: TrangQuanTriThongBao,
        //   isShowLeftMenu: true
        // },
        {
          path: ROUTE_NAME.QUAN_TRI_HE_THONG.VAI_TRO,
          name: ROUTE_NAME.QUAN_TRI_HE_THONG.VAI_TRO,
          menuName: MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.VAI_TRO,
          component: TrangDanhSachVaiTro,
          meta: {
            permissionName: PERMISSION_NAME.QUAN_LY_VAI_TRO
          }
        },
        {
          path: ROUTE_NAME.QUAN_TRI_HE_THONG.XEM_CHI_TIET_VAI_TRO,
          name: ROUTE_NAME.QUAN_TRI_HE_THONG.XEM_CHI_TIET_VAI_TRO,
          menuName: MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.XEM_CHI_TIET_VAI_TRO,
          component: TrangXemVaiTro,
          meta: {
            permissionName: PERMISSION_NAME.QUAN_LY_VAI_TRO
          },
          isShowLeftMenu: false
        },
        {
          path: ROUTE_NAME.QUAN_TRI_HE_THONG.CAP_NHAT_VAI_TRO,
          name: ROUTE_NAME.QUAN_TRI_HE_THONG.CAP_NHAT_VAI_TRO,
          menuName: MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.CAP_NHAT_VAI_TRO,
          component: TrangCapNhatVaiTro,
          meta: {
            permissionName: PERMISSION_NAME.QUAN_LY_VAI_TRO
          },
          isShowLeftMenu: false
        },
        {
          path: ROUTE_NAME.QUAN_TRI_HE_THONG.NGUOI_DUNG,
          name: ROUTE_NAME.QUAN_TRI_HE_THONG.NGUOI_DUNG,
          menuName: MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.NGUOI_DUNG,
          component: TrangQuanLyNguoiDung,
          meta: {
            permissionName: PERMISSION_NAME.QUAN_LY_NGUOI_DUNG
          }
        },
        {
          path: ROUTE_NAME.QUAN_TRI_HE_THONG.XEM_CHI_TIET_NGUOI_DUNG,
          name: ROUTE_NAME.QUAN_TRI_HE_THONG.XEM_CHI_TIET_NGUOI_DUNG,
          menuName: MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.XEM_CHI_TIET_NGUOI_DUNG,
          component: TrangXemNguoiDung,
          meta: {
            permissionName: PERMISSION_NAME.QUAN_LY_NGUOI_DUNG
          },
          isShowLeftMenu: false
        },
        {
          path: ROUTE_NAME.QUAN_TRI_HE_THONG.CAP_NHAT_NGUOI_DUNG,
          name: ROUTE_NAME.QUAN_TRI_HE_THONG.CAP_NHAT_NGUOI_DUNG,
          menuName: MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.CAP_NHAT_NGUOI_DUNG,
          component: TrangCapNhatNguoiDung,
          meta: {
            permissionName: PERMISSION_NAME.QUAN_LY_NGUOI_DUNG
          },
          isShowLeftMenu: false
        },
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = [ROUTE_NAME.DANG_NHAP];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = getValueFromStorageByKey("isLogin");
  const permissions = getValueFromStorageByKey("permissions");
  if (authRequired && !loggedIn) {
    store.dispatch("common/setIsLogin", false);
    return next(ROUTE_NAME.DANG_NHAP);
  } else if (!authRequired && loggedIn) {
    return next(ROUTE_NAME.TRANG_CHU);
  }

  if (
    to.meta &&
    ((to.meta.permissionName &&
        !hasPermission(permissions, to.meta.permissionName)) ||
      (to.meta.permissions &&
        !hasPermission(permissions, to.meta.permissions))
    )) {
    return next(ROUTE_NAME._403);
  }

  next();
});

export default router;
