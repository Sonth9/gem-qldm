<template>
  <b-modal
    id="xoa-lich-lam-viec"
    ref="xoa-lich-lam-viec"
    centered
    size="xs"
    header-class="border-bottom-none"
    footer-class="border-top-none"
  >
    <div>
      <h4 class="center font-size-20 font-weight-r">
        Bạn có chắc chắn xóa lịch làm việc này?
      </h4>
    </div>
    <template v-slot:modal-footer>
      <div class="w-100 center">
        <b-button class="btn btn-line" @click="hideModal()"> BỎ QUA </b-button>
        <b-button class="btn btn-main ml-2" @click="xoaLichLamViec()">
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
    LichLamViecMuonXoa: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: String | null,
      required: true
    }
  },
  methods: {
    hideModal() {
      this.$bvModal.hide("xoa-lich-lam-viec");
    },
    xoaLichLamViec() {
      this.$emit("xoaLichLamViec", this.LichLamViecMuonXoa);
      this.$bvModal.hide("xoa-lich-lam-viec");
    }
  }
};
</script>
