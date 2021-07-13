<template>
  <div class="middle-content">
    <font-awesome-icon
      :style="{ color: '#ff0000' }"
      class="mr-2"
      icon="exclamation-triangle"
    />
    {{ message || `Tài khoản của bạn chưa được cấp quyền. Vui lòng liên hệ quản trị của hệ thống!`}}
  </div>
</template>

<script>
export default {
  name: "Error",
  props: {
    message: String
  },
  data() {
    return {};
  },
  mounted() {}
};
</script>

<style scoped>
</style>
