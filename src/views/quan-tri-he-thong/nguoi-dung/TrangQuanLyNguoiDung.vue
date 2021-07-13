<template>
  <QuanLyNguoiDung />
</template>

<script>
import QuanLyNguoiDung from "@/components/pages/quan-tri-he-thong/nguoi-dung/QuanLyNguoiDung.vue";
import { setBreadcrumb } from "@/utils/commonUtils";
import { MENU_ROUTE_NAME } from "@/constants/constants";

export default {
  name: "TrangQuanLyNguoiDung",
  components: {
    QuanLyNguoiDung
  },
  created() {
    setBreadcrumb(
      `${MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.NAME} / ${
        MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.NGUOI_DUNG
      }`
    );
  }
};
</script>

<style scoped>
</style>
