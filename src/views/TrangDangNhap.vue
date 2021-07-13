<template>
  <div>
    <DangNhap />
  </div>
</template>

<script>
import DangNhap from "@/components/pages/DangNhap.vue";

export default {
  name: "TrangDangNhap",
  components: {
    DangNhap
  },
  metaInfo: {
    title: "Đăng nhập",
    meta: [
      {
        name: "description",
        content: "Đăng nhập"
      }
    ]
  },
  created() {}
};
</script>

<style scoped>
</style>
