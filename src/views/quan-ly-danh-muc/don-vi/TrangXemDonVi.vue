<template>
  <XemDonVi/>
</template>

<script>
  import XemDonVi from "@/components/pages/quan-ly-danh-muc/don-vi/XemDonVi";
  import { setBreadcrumb } from "@/utils/commonUtils";
  import { MENU_ROUTE_NAME } from "@/constants/constants";

  export default {
    name: "TrangXemDonVi",
    components: {
      XemDonVi
    },
    created() {
      setBreadcrumb(
        `${MENU_ROUTE_NAME.QUAN_LY_DANH_MUC.NAME} / ${
          MENU_ROUTE_NAME.QUAN_LY_DANH_MUC.DON_VI.XEM
        }`
      );
    }
  };
</script>

<style scoped>
</style>
