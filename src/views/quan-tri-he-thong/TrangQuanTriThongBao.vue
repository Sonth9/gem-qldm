<template>
  <QuanTriThongBao />
</template>

<script>
import QuanTriThongBao from "@/components/pages/quan-tri-he-thong/QuanTriThongBao";
import { MENU_ROUTE_NAME } from "@/constants/constants";
//import { setBreadcrumb } from "@/utils/commonUtils";
export default {
  name: "TrangQuanTriThongBao",
  components: {
    QuanTriThongBao
    //setBreadcrumb
  }
  // created() {
  //   setBreadcrumb(`${MENU_ROUTE_NAME.THONG_BAO.NAME}`);
  // }
};
</script>

<style scoped>
</style>
