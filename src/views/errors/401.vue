<template>
  <div>
    <Error message="Token hết hạn" />
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
    setBreadcrumb(MENU_ROUTE_NAME._401);
  }
};
</script>

<style scoped>
</style>
