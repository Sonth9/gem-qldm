<template>
  <CapNhatVaiTro />
</template>

<script>
import CapNhatVaiTro from "@/components/pages/quan-tri-he-thong/vai-tro/CapNhatVaiTro.vue";
import { setBreadcrumb } from "@/utils/commonUtils";
import { MENU_ROUTE_NAME } from "@/constants/constants";
export default {
  name: "TrangCapNhatVaiTro",
  components: {
    CapNhatVaiTro
  },
  created() {
    setBreadcrumb(
      `${MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.NAME} / ${
        MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.CAP_NHAT_VAI_TRO
      }`
    );
  }
};
</script>

<style scoped>
</style>
