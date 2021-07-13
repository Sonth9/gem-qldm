<template>
  <TaoCanBo/>
</template>

<script>
import TaoCanBo from "@/components/pages/quan-ly-danh-muc/can-bo/TaoCanBo";
import { setBreadcrumb } from "@/utils/commonUtils";
import { MENU_ROUTE_NAME } from "@/constants/constants";

export default {
  name: "TrangTaoHoSoCanBo",
  components: {
    TaoCanBo
  },
  created() {
    setBreadcrumb(
      `${MENU_ROUTE_NAME.QUAN_LY_DANH_MUC.NAME} / ${
        MENU_ROUTE_NAME.QUAN_LY_DANH_MUC.HO_SO_CAN_BO.TAO
      }`
    );
  }
};
</script>

<style scoped>
</style>
