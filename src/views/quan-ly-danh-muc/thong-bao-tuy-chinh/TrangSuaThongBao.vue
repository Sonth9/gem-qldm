<template>
  <SuaThongBao />
</template>

<script>
import SuaThongBao from "@/components/pages/quan-ly-danh-muc/thong-bao-tuy-chinh/SuaThongBao";
import { setBreadcrumb } from "@/utils/commonUtils";
import { MENU_ROUTE_NAME } from "@/constants/constants";
export default {
  name: "TrangSuaThongBao",
  components: {
    SuaThongBao
  },
  created() {
    setBreadcrumb(
      `${MENU_ROUTE_NAME.QUAN_LY_DANH_MUC.NAME} / ${
        MENU_ROUTE_NAME.QUAN_LY_DANH_MUC.THONG_BAO_TUY_CHINH.SUA
      }`
    );
  }
};
</script>

<style scoped>
</style>
