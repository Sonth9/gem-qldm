<template>
  <div>
    <b-tabs content-class="mt-3">
      <b-tab
        :active="activeTab === `#${VAI_TRO_TAB.THONG_TIN_VAI_TRO}`"
        @click="changeCurrentTab(VAI_TRO_TAB.THONG_TIN_VAI_TRO)"
        title="Thông tin nhóm"
      >
        <div class="box box-form">
          <FormVaiTro
            :form="chiTietVaiTro.role"
            :readonly="true"
            ref="cap-nhat-vai-tro"
          />
        </div>
      </b-tab>
      <b-tab
        :active="activeTab === `#${VAI_TRO_TAB.NGUOI_DUNG}`"
        @click="changeCurrentTab(VAI_TRO_TAB.NGUOI_DUNG)"
        title="Quản lý người dùng"
      >
        <div class="box box-form">
          <DanhSachNguoiDungTheoVaiTro
            :chiTietVaiTro="chiTietVaiTro"
            :key="`thuoc-vai-tro-${chiTietVaiTro.Id}`"
            :readonly="true"
            ref="danhSachNguoiDungThuocVaiTro"
          />
        </div>
      </b-tab>
      <b-tab
        :active="activeTab === `#${VAI_TRO_TAB.QUYEN}`"
        @click="changeCurrentTab(VAI_TRO_TAB.QUYEN)"
        title="Quản lý quyền"
      >
        <div class="box box-form">
          <DanhSachQuyenTrongVaiTro
            :chiTietVaiTro="chiTietVaiTro"
            :key="`danh-sach-quyen-${chiTietVaiTro.Id}`"
            :readonly="true"
            ref="danhSachQuyenTrongVaiTro"
          />
        </div>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import {
  BO_QUA_BUTTON_LABEL,
  ROUTE_NAME,
  VAI_TRO_TAB
} from "@/constants/constants";
import FormVaiTro from "@/components/pages/quan-tri-he-thong/vai-tro/FormVaiTro";
import DanhSachNguoiDungTheoVaiTro from "@/components/pages/quan-tri-he-thong/nguoi-dung/DanhSachNguoiDungTheoVaiTro";
import DanhSachQuyenTrongVaiTro from "@/components/pages/quan-tri-he-thong/quyen/DanhSachQuyenTrongVaiTro";
import { mapGetters } from "vuex";

export default {
  name: "XemVaiTro",
  data() {
    return {
      BO_QUA_BUTTON_LABEL: BO_QUA_BUTTON_LABEL,
      internalChiTietVaiTro: {},
      activeTab: VAI_TRO_TAB.THONG_TIN_VAI_TRO,
      VAI_TRO_TAB: VAI_TRO_TAB
    };
  },
  components: {
    FormVaiTro,
    DanhSachNguoiDungTheoVaiTro,
    DanhSachQuyenTrongVaiTro
  },
  computed: {
    ...mapGetters({
      chiTietVaiTro: "role/chiTietVaiTro"
    })
  },
  created() {
    this.activeTab = location.hash;
    this.$store.dispatch("role/layChiTietVaiTro", {
      id: this.$router.currentRoute.params.id
    });
  },
  watch: {
    chiTietVaiTro: {
      handler() {
        this.internalChiTietVaiTro = Object.assign(
          {},
          this.internalChiTietVaiTro,
          this.chiTietVaiTro
        );
      }
    }
  },
  methods: {
    changeCurrentTab(currentTab) {
      this.$router
        .push({
          name: ROUTE_NAME.QUAN_TRI_HE_THONG.XEM_CHI_TIET_VAI_TRO,
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
