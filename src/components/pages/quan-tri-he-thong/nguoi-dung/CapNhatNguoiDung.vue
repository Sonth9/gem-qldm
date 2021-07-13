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
            ref="cap-nhat-nguoi-dung"
            :form="
              chiTietNguoiDung &&
              chiTietNguoiDung.data &&
              chiTietNguoiDung.data.user
            "
          />
          <!-- <div class="w-100 center">
            <b-button class="btn btn-line" @click="boQua()">
              {{ BO_QUA_BUTTON_LABEL }}
            </b-button>
            <b-button class="btn btn-main ml-2" @click="capNhatNguoiDung()">
              Cập nhật
            </b-button>
          </div> -->
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
              chiTietNguoiDung.user &&
              chiTietNguoiDung.user.id
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
              chiTietNguoiDung.user &&
              chiTietNguoiDung.user.id
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
import { THONG_TIN_NGUOI_DUNG_DUOC_CAP_NHAT_THANH_CONG } from "@/constants/message";
import FormNguoiDung from "@/components/pages/quan-tri-he-thong/nguoi-dung/FormNguoiDung";
import DanhSachVaiTroTheoNguoiDung from "@/components/pages/quan-tri-he-thong/vai-tro/DanhSachVaiTroTheoNguoiDung";
import DanhSachQuyenTheoNguoiDung from "@/components/pages/quan-tri-he-thong/quyen/DanhSachQuyenTheoNguoiDung";
import { mapGetters } from "vuex";

export default {
  name: "CapNhatNguoiDung",
  data() {
    return {
      BO_QUA_BUTTON_LABEL: BO_QUA_BUTTON_LABEL,
      internalChiTietNguoiDung: {},
      activeTab: "#thong-tin-nhom",
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
          name: ROUTE_NAME.QUAN_TRI_HE_THONG.CAP_NHAT_NGUOI_DUNG,
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
    },
    async capNhatNguoiDung() {
      const isValid = await this.$refs[
        "cap-nhat-nguoi-dung"
      ].$refs.observer.validate();
      const $vm = this;
      if (isValid) {
        this.$store
          .dispatch(
            "user/capNhatEmailNguoiDung",
            this.$refs["cap-nhat-nguoi-dung"].getInternalForm()
          )
          .then(response => {
            if (response.data.succeeded) {
              $vm.$toasted.clear();
              $vm.$toasted.global.showSuccessMessage({
                message: THONG_TIN_NGUOI_DUNG_DUOC_CAP_NHAT_THANH_CONG
              });
            }
          });
      }
    }
  }
};
</script>

<style scoped>
</style>
