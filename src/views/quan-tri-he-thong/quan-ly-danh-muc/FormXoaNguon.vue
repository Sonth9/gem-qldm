<template>
  <b-modal
    id="xoa-nguon"
    ref="xoa-nguon"
    centered
    size="xs"
    header-class="border-bottom-none"
    footer-class="border-top-none"
  >
    <div>
      <h4 class="center font-size-20 font-weight-r">
        Bạn có chắc chắn xóa nguồn nhận thông báo này?
      </h4>
    </div>
    <template v-slot:modal-footer>
      <div class="w-100 center">
        <b-button class="btn btn-line" @click="hideModal()"> BỎ QUA </b-button>
        <b-button class="btn btn-main ml-2" @click="xoaDanhSachNguon()">
          ĐỒNG Ý
        </b-button>
      </div>
    </template>
  </b-modal>
</template>
<script>
import { ROUTE_NAME } from "@/constants/constants";

export default {
  name: "XoaChiTieuModal",
  data() {
    return {
      ROUTE_NAME: ROUTE_NAME
    };
  },
  props: {
    NguonMuonXoa: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: String | null,
      required: true
    }
  },
  methods: {
    hideModal() {
      this.$bvModal.hide("xoa-nguon");
    },
    xoaDanhSachNguon() {
      this.$bvModal.hide("xoa-nguon");
      this.$emit("xoaDanhSachNguon", this.NguonMuonXoa);
    }
  }
};
</script>
