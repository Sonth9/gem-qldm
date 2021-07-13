<template>
  <DanhSachThongBao />
</template>

<script>
import DanhSachThongBao from "@/components/pages/quan-ly-danh-muc/thong-bao-tuy-chinh/DanhSachThongBao";
import { setBreadcrumb } from "@/utils/commonUtils";
import { MENU_ROUTE_NAME } from "@/constants/constants";
export default {
  name: "TrangDanhSachThongBao",
  components: {
    DanhSachThongBao
  },
  created() {
    setBreadcrumb(
      `${MENU_ROUTE_NAME.QUAN_LY_DANH_MUC.NAME} / ${
        MENU_ROUTE_NAME.QUAN_LY_DANH_MUC.THONG_BAO_TUY_CHINH.NAME
      }`
    );
  }
};
</script>

<style scoped>
</style>
