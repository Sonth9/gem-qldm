<template>
  <div>
    <Error  message="Không tìm thấy!" />
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
    setBreadcrumb(MENU_ROUTE_NAME._404);
  }
};
</script>

<style scoped>
</style>
