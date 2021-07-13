<template>
  <DanhSachNhomMenu />
</template>

<script>
import DanhSachNhomMenu from "@/components/pages/quan-tri-he-thong/nhom-menu/DanhSachNhomMenu";
import { setBreadcrumb } from "@/utils/commonUtils";
import { MENU_ROUTE_NAME } from "@/constants/constants";

export default {
  name: "TrangDanhSachNhomMenu",
  components: {
    DanhSachNhomMenu
  },
  created() {
    setBreadcrumb(
      `${MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.NAME} / ${
        MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.DM_NHOM_MENU.NAME
      }`
    );
  }
};
</script>

<style scoped>
</style>
