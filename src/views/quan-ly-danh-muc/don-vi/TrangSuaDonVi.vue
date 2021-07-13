<template>
  <SuaDonVi/>
</template>

<script>
  import SuaDonVi from "@/components/pages/quan-ly-danh-muc/don-vi/SuaDonVi";
  import { setBreadcrumb } from "@/utils/commonUtils";
  import { MENU_ROUTE_NAME } from "@/constants/constants";

  export default {
    name: "TrangSuaDonVi",
    components: {
      SuaDonVi
    },
    created() {
      setBreadcrumb(
        `${MENU_ROUTE_NAME.QUAN_LY_DANH_MUC.NAME} / ${
          MENU_ROUTE_NAME.QUAN_LY_DANH_MUC.DON_VI.SUA
        }`
      );
    }
  };
</script>

<style scoped>
</style>
