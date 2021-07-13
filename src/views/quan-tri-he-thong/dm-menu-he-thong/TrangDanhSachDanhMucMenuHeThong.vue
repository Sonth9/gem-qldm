<template>
  <DanhSachDanhMucMenuHeThong />
</template>

<script>
import DanhSachDanhMucMenuHeThong from "@/components/pages/quan-tri-he-thong/menu-he-thong/DanhSachDanhMucMenuHeThong";
import { setBreadcrumb } from "@/utils/commonUtils";
import { MENU_ROUTE_NAME } from "@/constants/constants";

export default {
  name: "TrangDanhSachDanhMucMenuHeThong",
  components: {
    DanhSachDanhMucMenuHeThong
  },
  created() {
    setBreadcrumb(
      `${MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.NAME} / ${
        MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.DM_MENU_HE_THONG.NAME
      }`
    );
  }
};
</script>

<style scoped>
</style>
