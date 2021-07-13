<template>
  <TaoDonVi/>
</template>

<script>
  import TaoDonVi from "@/components/pages/quan-ly-danh-muc/don-vi/TaoDonVi";
  import { setBreadcrumb } from "@/utils/commonUtils";
  import { MENU_ROUTE_NAME } from "@/constants/constants";

  export default {
    name: "TrangTaoDonVi",
    components: {
      TaoDonVi
    },
    created() {
      setBreadcrumb(
        `${MENU_ROUTE_NAME.QUAN_LY_DANH_MUC.NAME} / ${
          MENU_ROUTE_NAME.QUAN_LY_DANH_MUC.DON_VI.TAO
        }`
      );
    }
  };
</script>

<style scoped>
</style>
