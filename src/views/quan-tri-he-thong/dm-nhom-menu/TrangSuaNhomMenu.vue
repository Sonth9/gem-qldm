<template>
  <SuaNhomMenu/>
</template>

<script>
import SuaNhomMenu from "@/components/pages/quan-tri-he-thong/nhom-menu/SuaNhomMenu";
import { setBreadcrumb } from "@/utils/commonUtils";
import { MENU_ROUTE_NAME } from "@/constants/constants";

export default {
  name: "TrangSuaNhomMenu",
  components: {
    SuaNhomMenu
  },
  created() {
    setBreadcrumb(
      `${MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.NAME} / ${
        MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.DM_NHOM_MENU.SUA
      }`
    );
  }
};
</script>

<style scoped>
</style>
