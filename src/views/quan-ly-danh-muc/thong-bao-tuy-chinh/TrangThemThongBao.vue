<template>
  <ThemThongBao />
</template>

<script>
import ThemThongBao from "@/components/pages/quan-ly-danh-muc/thong-bao-tuy-chinh/ThemThongBao";
import { setBreadcrumb } from "@/utils/commonUtils";
import { MENU_ROUTE_NAME } from "@/constants/constants";
export default {
  name: "TrangThemThongBao",
  components: {
    ThemThongBao
  },
  created() {
    setBreadcrumb(
      `${MENU_ROUTE_NAME.QUAN_LY_DANH_MUC.NAME} / ${
        MENU_ROUTE_NAME.QUAN_LY_DANH_MUC.THONG_BAO_TUY_CHINH.TAO
      }`
    );
  }
};
</script>

<style scoped>
</style>
