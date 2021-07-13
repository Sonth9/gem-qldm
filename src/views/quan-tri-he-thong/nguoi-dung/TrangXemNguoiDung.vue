<template>
  <XemNguoiDung />
</template>

<script>
import XemNguoiDung from "@/components/pages/quan-tri-he-thong/nguoi-dung/XemNguoiDung.vue";
import { setBreadcrumb } from "@/utils/commonUtils";
import { MENU_ROUTE_NAME } from "@/constants/constants";
export default {
  name: "TrangXemNguoiDung",
  components: {
    XemNguoiDung
  },
  created() {
    setBreadcrumb(
      `${MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.NAME} / ${
        MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.XEM_NGUOI_DUNG
      }`
    );
  }
};
</script>

<style scoped>
</style>
