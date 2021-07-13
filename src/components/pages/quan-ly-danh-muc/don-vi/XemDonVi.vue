<template>
  <ChiTietDonVi :only-view="true"/>
</template>

<script>
  import ChiTietDonVi from "./TaoDonVi";

  export default {
    name: "XemDonVi",
    components: {
      ChiTietDonVi
    }
  }
</script>

<style scoped>

</style>