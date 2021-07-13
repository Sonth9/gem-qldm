<template>
  <b-modal
    centered
    footer-class="border-top-none"
    header-class="border-bottom-none"
    hide-footer
    id="xoa-nguoi-dung"
    size="md"
    title="Bạn có muốn xóa người dùng này ?"
  >
    <div class="font-size-14">
      <div class="w-100 center">
        <b-button @click="hideModal()" class="btn btn-line">
          {{ BO_QUA_BUTTON_LABEL }}
        </b-button>
        <b-button
          @click="xoaDanhSachNguoiDungTrongVaiTro()"
          class="btn btn-main ml-2"
        >
          ĐỒNG Ý
        </b-button>
      </div>
    </div>
  </b-modal>
</template>
<script>
  import { BO_QUA_BUTTON_LABEL, ROUTE_NAME } from "@/constants/constants";

  export default {
    name: "XoaNguoiDungModal",
    data() {
      return {
        BO_QUA_BUTTON_LABEL: BO_QUA_BUTTON_LABEL,
        ROUTE_NAME: ROUTE_NAME
      };
    },
    methods: {
      hideModal() {
        this.$bvModal.hide("xoa-nguoi-dung");
      },
      xoaDanhSachNguoiDungTrongVaiTro() {
        this.$bvModal.hide("xoa-nguoi-dung");
        this.$emit("xoaDanhSachNguoiDungTrongVaiTro");
      }
    }
  };
</script>
