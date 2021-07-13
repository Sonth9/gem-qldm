<template>
  <DanhSachDanhMucHeThong />
</template>

<script>
import DanhSachDanhMucHeThong from "@/components/pages/quan-tri-he-thong/he-thong/DanhSachDanhMucHeThong";
import { setBreadcrumb } from "@/utils/commonUtils";
import { MENU_ROUTE_NAME } from "@/constants/constants";

export default {
  name: "TrangDanhSachDanhMucHeThong",
  components: {
    DanhSachDanhMucHeThong
  },
  created() {
    setBreadcrumb(
      `${MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.NAME} / ${
        MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.DM_HE_THONG.NAME
      }`
    );
  }
};
</script>

<style scoped>
</style>
