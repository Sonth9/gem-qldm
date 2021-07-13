<template>
  <XemNhomMenu />
</template>

<script>
import XemNhomMenu from "@/components/pages/quan-tri-he-thong/nhom-menu/XemNhomMenu";
import { setBreadcrumb } from "@/utils/commonUtils";
import { MENU_ROUTE_NAME } from "@/constants/constants";

export default {
  name: "TrangXemNhomMenu",
  components: {
    XemNhomMenu
  },
  created() {
    setBreadcrumb(
      `${MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.NAME} / ${
        MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.DM_NHOM_MENU.XEM
      }`
    );
  }
};
</script>

<style scoped>
</style>
