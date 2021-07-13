<template>
  <SuaCanBo />
</template>

<script>
import SuaCanBo from "@/components/pages/quan-ly-danh-muc/can-bo/SuaCanBo";
import { setBreadcrumb } from "@/utils/commonUtils";
import { MENU_ROUTE_NAME } from "@/constants/constants";

export default {
  name: "TrangSuaHoSoCanBo",
  components: {
    SuaCanBo
  },
  created() {
    setBreadcrumb(
      `${MENU_ROUTE_NAME.QUAN_LY_DANH_MUC.NAME} / ${
        MENU_ROUTE_NAME.QUAN_LY_DANH_MUC.HO_SO_CAN_BO.SUA
      }`
    );
  }
};
</script>

<style scoped>
</style>
