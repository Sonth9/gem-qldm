<template>
  <div>
    <b-tabs content-class="mt-3">
      <b-tab
        title="Thông tin người dùng"
        :active="activeTab === `#${NGUOI_DUNG_TAB.THONG_TIN_NGUOI_DUNG}`"
        @click="changeCurrentTab(NGUOI_DUNG_TAB.THONG_TIN_NGUOI_DUNG)"
      >
        <div class="box box-form">
          <FormNguoiDung
            ref="cap-nhat-vai-tro"
            :form="
              chiTietNguoiDung &&
              chiTietNguoiDung.data &&
              chiTietNguoiDung.data.user
            "
          />
        </div>
      </b-tab>
      <b-tab
        title="Quản lý vai trò"
        :active="activeTab === `#${NGUOI_DUNG_TAB.VAI_TRO}`"
        @click="changeCurrentTab(NGUOI_DUNG_TAB.VAI_TRO)"
      >
        <div class="box box-form">
          <DanhSachVaiTroTheoNguoiDung
            ref="danhSachVaiTroTheoNguoiDung"
            :key="`thuoc-nguoi-dung-${
              chiTietNguoiDung &&
              chiTietNguoiDung.data &&
              chiTietNguoiDung.data.user &&
              chiTietNguoiDung.data.user.id
            }`"
            :chiTietNguoiDung="chiTietNguoiDung"
          />
        </div>
      </b-tab>
      <b-tab
        title="Quản lý quyền"
        :active="activeTab === `#${NGUOI_DUNG_TAB.QUYEN}`"
        @click="changeCurrentTab(NGUOI_DUNG_TAB.QUYEN)"
      >
        <div class="box box-form">
          <DanhSachQuyenTheoNguoiDung
            ref="danhSachQuyenTrongNguoiDung"
            :key="`danh-sach-quyen-${
              chiTietNguoiDung &&
              chiTietNguoiDung.data &&
              chiTietNguoiDung.data.user &&
              chiTietNguoiDung.data.user.id
            }`"
            :chiTietNguoiDung="chiTietNguoiDung"
          />
        </div>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import {
  ROUTE_NAME,
  BO_QUA_BUTTON_LABEL,
  NGUOI_DUNG_TAB
} from "@/constants/constants";
import FormNguoiDung from "@/components/pages/quan-tri-he-thong/nguoi-dung/FormNguoiDung";
import DanhSachVaiTroTheoNguoiDung from "@/components/pages/quan-tri-he-thong/vai-tro/DanhSachVaiTroTheoNguoiDung";
import DanhSachQuyenTheoNguoiDung from "@/components/pages/quan-tri-he-thong/quyen/DanhSachQuyenTheoNguoiDung";
import { mapGetters } from "vuex";

export default {
  name: "XemNguoiDung",
  data() {
    return {
      BO_QUA_BUTTON_LABEL: BO_QUA_BUTTON_LABEL,
      internalChiTietVaiTro: {},
      activeTab: NGUOI_DUNG_TAB.THONG_TIN_NGUOI_DUNG,
      NGUOI_DUNG_TAB: NGUOI_DUNG_TAB
    };
  },
  components: {
    FormNguoiDung,
    DanhSachVaiTroTheoNguoiDung,
    DanhSachQuyenTheoNguoiDung
  },
  computed: {
    ...mapGetters({
      chiTietNguoiDung: "user/chiTietNguoiDung"
    })
  },
  created() {
    this.activeTab = location.hash;
    this.$store.dispatch("user/layChiTietNguoiDung", {
      id: this.$router.currentRoute.params.id
    });
  },
  watch: {
    chiTietNguoiDung: {
      handler() {
        this.internalChiTietNguoiDung = Object.assign(
          {},
          this.internalChiTietNguoiDung,
          this.chiTietNguoiDung
        );
      }
    }
  },
  methods: {
    changeCurrentTab(currentTab) {
      this.$router
        .push({
          name: ROUTE_NAME.QUAN_TRI_HE_THONG.XEM_CHI_TIET_NGUOI_DUNG,
          hash: `#${currentTab}`
        })
        .catch(() => {});
    },
    boQua() {
      this.$router.push({
        path:
          ROUTE_NAME.QUAN_TRI_HE_THONG.NAME +
          "/" +
          ROUTE_NAME.QUAN_TRI_HE_THONG.VAI_TRO
      });
    }
  }
};
</script>

<style scoped>
</style>
