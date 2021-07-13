<template>
  <b-modal
    id="xoa-loai"
    ref="xoa-loai"
    centered
    size="xs"
    header-class="border-bottom-none"
    footer-class="border-top-none"
  >
    <div>
      <h4 class="center font-size-20 font-weight-r">
        Bạn có chắc chắn xóa loại thông báo này?
      </h4>
    </div>
    <template v-slot:modal-footer>
      <div class="w-100 center">
        <b-button class="btn btn-line" @click="hideModal()"> BỎ QUA </b-button>
        <b-button class="btn btn-main ml-2" @click="xoaDanhSachThuocTinh()">
          ĐỒNG Ý
        </b-button>
      </div>
    </template>
  </b-modal>
</template>
<script>
import { ROUTE_NAME } from "@/constants/constants";

export default {
  name: "XoaThuocTinhModal",
  data() {
    return {
      ROUTE_NAME: ROUTE_NAME
    };
  },
  props: {
    XoaLoai: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: String | null,
      required: true
    }
  },
  methods: {
    hideModal() {
      this.$bvModal.hide("xoa-loai");
    },
    xoaDanhSachThuocTinh() {
      this.$bvModal.hide("xoa-loai");
      this.$emit("xoaDanhSachLoai", this.XoaLoai);
    }
  }
};
</script>
