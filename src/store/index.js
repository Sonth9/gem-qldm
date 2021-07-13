import Vue from "vue";
import Vuex from "vuex";
import canBoModule from "./modules/can-bo";
import commonModule from "./modules/common";
import donViModule from "./modules/don-vi";
import thongBaoTuyChinhModule from "./modules/thong-bao-tuy-chinh";
import chucVuModule from "./modules/chuc-vu";
import nhomChucVuModule from "./modules/nhom-chuc-vu";
import dmHeThongModule from "./modules/dm-he-thong";
import dmMenuHeThongModule from "./modules/dm-menu-he-thong";
import dmNhomMenuModule from "./modules/dm-nhom-menu";
import userModule from "./modules/user";
import roleModule from "./modules/role";
import permissionModule from "./modules/permission";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    common: commonModule,
    donVi: donViModule,
    thongBaoTuyChinh: thongBaoTuyChinhModule,
    chucVu: chucVuModule,
    nhomChucVu: nhomChucVuModule,
    dmHeThong: dmHeThongModule,
    dmMenuHeThong: dmMenuHeThongModule,
    dmNhomMenu: dmNhomMenuModule,
    canBo: canBoModule,
    user: userModule,
    role: roleModule,
    permission: permissionModule,
  },
  state: {},
  getters: {},
  mutations: {}
});
