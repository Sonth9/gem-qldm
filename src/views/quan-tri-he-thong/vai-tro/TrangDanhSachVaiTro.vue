<template>
  <DanhSachVaiTro />
</template>

<script>
import DanhSachVaiTro from "@/components/pages/quan-tri-he-thong/vai-tro/DanhSachVaiTro.vue";
import { setBreadcrumb } from "@/utils/commonUtils";
import { MENU_ROUTE_NAME } from "@/constants/constants";

export default {
  name: "TrangDanhSachVaiTro",
  components: {
    DanhSachVaiTro
  },
  created() {
    setBreadcrumb(
      `${MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.NAME} / ${
        MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.VAI_TRO
      }`
    );
  }
};
</script>

<style scoped>
</style>
