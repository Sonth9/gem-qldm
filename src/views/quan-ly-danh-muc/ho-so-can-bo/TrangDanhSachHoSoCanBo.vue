<template>
  <DanhSachCanBo />
</template>

<script>
import DanhSachCanBo from "@/components/pages/quan-ly-danh-muc/can-bo/DanhSachCanBo";
import { setBreadcrumb } from "@/utils/commonUtils";
import { MENU_ROUTE_NAME } from "@/constants/constants";
export default {
  name: "TrangDanhSachHoSoCanBo",
  components: {
    DanhSachCanBo
  },
  created() {
    setBreadcrumb(
      `${MENU_ROUTE_NAME.QUAN_LY_DANH_MUC.NAME} / ${
        MENU_ROUTE_NAME.QUAN_LY_DANH_MUC.HO_SO_CAN_BO.NAME
      }`
    );
  }
};
</script>

<style scoped>
</style>
