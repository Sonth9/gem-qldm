<template>
 <XemCanBo />
</template>

<script>
import XemCanBo from "@/components/pages/quan-ly-danh-muc/can-bo/XemCanBo";
import { setBreadcrumb } from "@/utils/commonUtils";
import { MENU_ROUTE_NAME } from "@/constants/constants";

export default {
  name: "TrangXemHoSoCanBo",
  components: {
    XemCanBo
  },
  created() {
    setBreadcrumb(
      `${MENU_ROUTE_NAME.QUAN_LY_DANH_MUC.NAME} / ${
        MENU_ROUTE_NAME.QUAN_LY_DANH_MUC.HO_SO_CAN_BO.XEM
      }`
    );
  }
};
</script>

<style scoped>
</style>
