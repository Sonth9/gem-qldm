<template>
  <b-modal
    id="xoa-vai-tro-thuoc-nguoi-dung"
    centered
    size="xl"
    header-class="border-bottom-none"
    footer-class="border-top-none"
  >
    <div class="font-size-14">
      <h4 class="center">Bạn có chắc chắn xóa vai trò thuộc người dùng?</h4>
    </div>
    <template v-slot:modal-footer>
      <div class="w-100 center">
        <b-button class="btn btn-line" @click="hideModal()">
          {{ BO_QUA_BUTTON_LABEL }}
        </b-button>
        <b-button class="btn btn-main ml-2" @click="xoaVaiTro()">
          ĐỒNG Ý
        </b-button>
      </div>
    </template>
  </b-modal>
</template>
<script>
import { ROUTE_NAME, BO_QUA_BUTTON_LABEL } from "@/constants/constants";

export default {
  name: "XoaVaiTroThuocNguoiDungModal",
  props: {},
  data() {
    return {
      BO_QUA_BUTTON_LABEL: BO_QUA_BUTTON_LABEL,
      ROUTE_NAME: ROUTE_NAME,
      emailSelected: 1,
      modalTitle: "",
      internalForm: {}
    };
  },
  watch: {
    form: {
      handler() {
        this.internalForm = this.form;
      },
      immediate: true
    }
  },
  methods: {
    hideModal() {
      this.$bvModal.hide("xoa-vai-tro-thuoc-nguoi-dung");
    },
    xoaVaiTro() {
      this.$bvModal.hide("xoa-vai-tro-thuoc-nguoi-dung");
      this.$emit("xoaDanhSachVaiTroThuocNguoiDung");
    }
  }
};
</script>
