<template>
  <XemVaiTro />
</template>

<script>
import XemVaiTro from "@/components/pages/quan-tri-he-thong/vai-tro/XemVaiTro.vue";
import { setBreadcrumb } from "@/utils/commonUtils";
import { MENU_ROUTE_NAME } from "@/constants/constants";
export default {
  name: "TrangXemVaiTro",
  components: {
    XemVaiTro
  },
  created() {
    setBreadcrumb(
      `${MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.NAME} / ${
        MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.XEM_VAI_TRO
      }`
    );
  }
};
</script>

<style scoped>
</style>
