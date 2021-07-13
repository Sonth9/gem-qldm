<template>
  <TaoNhomMenu/>
</template>

<script>
import TaoNhomMenu from "@/components/pages/quan-tri-he-thong/nhom-menu/TaoNhomMenu";
import { setBreadcrumb } from "@/utils/commonUtils";
import { MENU_ROUTE_NAME } from "@/constants/constants";

export default {
  name: "TrangTaoNhomMenu",
  components: {
    TaoNhomMenu
  },
  created() {
    setBreadcrumb(
      `${MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.NAME} / ${
        MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.DM_NHOM_MENU.TAO
      }`
    );
  }
};
</script>

<style scoped>
</style>
