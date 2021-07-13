<template>
  <DanhSachChucVu />
</template>

<script>
import DanhSachChucVu from "@/components/pages/quan-tri-he-thong/chuc-vu/DanhSachChucVu.vue";
import { setBreadcrumb } from "@/utils/commonUtils";
import { MENU_ROUTE_NAME } from "@/constants/constants";

export default {
  name: "TrangDanhSachChucVu",
  components: {
    DanhSachChucVu
  },
  created() {
    setBreadcrumb(
      `${MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.NAME} / ${
        MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.CHUC_VU.NAME
      }`
    );
  }
};
</script>

<style scoped>
</style>
