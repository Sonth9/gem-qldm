<template>
  <div>
    <Error  />
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
    setBreadcrumb(MENU_ROUTE_NAME._403);
  }
};
</script>

<style scoped>
</style>
