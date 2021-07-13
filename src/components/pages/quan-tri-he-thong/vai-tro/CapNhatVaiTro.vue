<template>
  <div>
    <b-tabs content-class="mt-3">
      <b-tab
        :active="activeTab === `#${VAI_TRO_TAB.THONG_TIN_VAI_TRO}`"
        @click="changeCurrentTab(VAI_TRO_TAB.THONG_TIN_VAI_TRO)"
        title="Thông tin vai trò"
      >
        <div class="box box-form">
          <FormVaiTro
            :form="chiTietVaiTro && chiTietVaiTro.role"
            ref="cap-nhat-vai-tro"
          />
          <div class="w-100 center">
            <b-button @click="boQua()" class="btn btn-line">
              {{ BO_QUA_BUTTON_LABEL }}
            </b-button>
            <b-button @click="capNhatVaiTro()" class="btn btn-main ml-2">
              Cập nhật
            </b-button>
          </div>
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
            :key="`thuoc-vai-tro-${
              chiTietVaiTro && chiTietVaiTro.role && chiTietVaiTro.role.id
            }`"
            ref="danhSachNguoiDungTheoVaiTro"
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
            :key="`danh-sach-quyen-${
              chiTietVaiTro && chiTietVaiTro.role && chiTietVaiTro.role.id
            }`"
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
import { THONG_TIN_VAI_TRO_DUOC_CAP_NHAT_THANH_CONG } from "@/constants/message";
import FormVaiTro from "@/components/pages/quan-tri-he-thong/vai-tro/FormVaiTro";
import DanhSachNguoiDungTheoVaiTro from "@/components/pages/quan-tri-he-thong/nguoi-dung/DanhSachNguoiDungTheoVaiTro";
import DanhSachQuyenTrongVaiTro from "@/components/pages/quan-tri-he-thong/quyen/DanhSachQuyenTrongVaiTro";
import { mapGetters } from "vuex";

export default {
  name: "CapNhatVaiTro",
  data() {
    return {
      BO_QUA_BUTTON_LABEL: BO_QUA_BUTTON_LABEL,
      internalChiTietVaiTro: {},
      activeTab: "#thong-tin-nhom",
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
          name: ROUTE_NAME.QUAN_TRI_HE_THONG.CAP_NHAT_VAI_TRO,
          hash: `#${currentTab}`
        })
        .catch(() => {});
    },
    boQua() {
      this.$router.push({
        name: ROUTE_NAME.QUAN_TRI_HE_THONG.VAI_TRO
      });
    },
    async capNhatVaiTro() {
      const isValid = await this.$refs[
        "cap-nhat-vai-tro"
      ].$refs.observer.validate();
      const $vm = this;
      if (isValid) {
        this.$store
          .dispatch(
            "role/capNhatThongTinVaiTro",
            this.$refs["cap-nhat-vai-tro"].getInternalForm()
          )
          .then(response => {
            if (response.data.succeeded) {
              $vm.$toasted.clear();
              $vm.$toasted.global.showSuccessMessage({
                message: THONG_TIN_VAI_TRO_DUOC_CAP_NHAT_THANH_CONG
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
