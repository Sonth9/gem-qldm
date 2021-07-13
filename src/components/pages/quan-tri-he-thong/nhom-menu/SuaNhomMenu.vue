<template>
  <ChiTietNhomMenu :is-edit="true" />
</template>

<script>
import ChiTietNhomMenu from "./TaoNhomMenu";

export default {
  name: "SuaNhomMenu",
  components: {
    ChiTietNhomMenu
  }
};
</script>

<style scoped>
</style>
