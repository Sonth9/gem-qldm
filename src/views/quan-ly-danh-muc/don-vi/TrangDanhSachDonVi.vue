<template>
  <DanhSachDonVi/>
</template>

<script>
  import DanhSachDonVi from "@/components/pages/quan-ly-danh-muc/don-vi/DanhSachDonVi.vue";
  import { setBreadcrumb } from "@/utils/commonUtils";
  import { MENU_ROUTE_NAME } from "@/constants/constants";

  export default {
    name: "TrangDanhSachDonVi",
    components: {
      DanhSachDonVi
    },
    created() {
      setBreadcrumb(
        `${MENU_ROUTE_NAME.QUAN_LY_DANH_MUC.NAME} / ${
          MENU_ROUTE_NAME.QUAN_LY_DANH_MUC.DON_VI.NAME
        }`
      );
    }
  };
</script>

<style scoped>
</style>
