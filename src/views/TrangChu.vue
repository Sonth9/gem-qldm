<template>
  <Dashboard />
</template>

<script>
import Dashboard from "@/components/pages/Dashboard";
import { setBreadcrumb } from "@/utils/commonUtils";
import { MENU_ROUTE_NAME } from "@/constants/constants";

export default {
  name: "TrangChu",
  components: {
    Dashboard
  },
  mounted() {},
  created() {
    setBreadcrumb(MENU_ROUTE_NAME.TRANG_CHU);
  }
};
</script>

<style scoped>
</style>
