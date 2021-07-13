<template>
  <XemThongBao />
</template>

<script>
import XemThongBao from "@/components/pages/quan-ly-danh-muc/thong-bao-tuy-chinh/XemThongBao";
import { setBreadcrumb } from "@/utils/commonUtils";
import { MENU_ROUTE_NAME } from "@/constants/constants";
export default {
  name: "TrangXemThongBao",
  components: {
    XemThongBao
  },
  created() {
    setBreadcrumb(
      `${MENU_ROUTE_NAME.QUAN_LY_DANH_MUC.NAME} / ${
        MENU_ROUTE_NAME.QUAN_LY_DANH_MUC.THONG_BAO_TUY_CHINH.XEM
      }`
    );
  }
};
</script>

<style scoped>
</style>
