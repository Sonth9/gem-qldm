<template>
  <ChiTietDonVi :is-edit="true" />
</template>

<script>
  import ChiTietDonVi from "./TaoDonVi";

  export default {
    name: "SuaDonVi",
    components: {
      ChiTietDonVi
    }
  };
</script>

<style scoped>
</style>
