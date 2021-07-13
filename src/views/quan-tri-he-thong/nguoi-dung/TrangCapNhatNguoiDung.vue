<template>
  <CapNhatNguoiDung />
</template>

<script>
import CapNhatNguoiDung from "@/components/pages/quan-tri-he-thong/nguoi-dung/CapNhatNguoiDung.vue";
import { setBreadcrumb } from "@/utils/commonUtils";
import { MENU_ROUTE_NAME } from "@/constants/constants";
export default {
  name: "TrangCapNhatNguoiDung",
  components: {
    CapNhatNguoiDung
  },
  created() {
    setBreadcrumb(
      `${MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.NAME} / ${
        MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.CAP_NHAT_NGUOI_DUNG
      }`
    );
  }
};
</script>

<style scoped>
</style>
