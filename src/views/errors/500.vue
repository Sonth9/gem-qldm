<template>
  <div>
    <Error message="Lỗi máy chủ nội bộ" />
  </div>
</template>

<script>
import Error from "@/components/pages/Error.vue";
import { setBreadcrumb } from "@/utils/commonUtils";
import { MENU_ROUTE_NAME } from "@/constants/constants";
export default {
  name: "TrangChuaCoQuyen",
  components: {
    Error
  },
  created() {
    setBreadcrumb(MENU_ROUTE_NAME._500);
  }
};
</script>

<style scoped>
</style>
