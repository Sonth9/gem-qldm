<template>
  <DanhSachNhomChucVu />
</template>

<script>
import DanhSachNhomChucVu from "@/components/pages/quan-tri-he-thong/nhom-chuc-vu/DanhSachNhomChucVu";
import { setBreadcrumb } from "@/utils/commonUtils";
import { MENU_ROUTE_NAME } from "@/constants/constants";

export default {
  name: "TrangDanhSachNhomChucVu",
  components: {
    DanhSachNhomChucVu
  },
  created() {
    setBreadcrumb(
      `${MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.NAME} / ${
        MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.NHOM_CHUC_VU.NAME
      }`
    );
  }
};
</script>

<style scoped>
</style>
