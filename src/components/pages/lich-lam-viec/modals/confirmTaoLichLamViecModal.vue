<template>
    <b-modal centered ref="confirmTaoLichLamViec" no-close-on-backdrop hide-footer title="Tạo lịch làm việc">
        <div class="d-block text-center">
            <h6>Bạn có chắc chắn tạo lịch làm việc này?</h6>
        </div>
        <div style="text-align: center">
            <b-button size="sm" class="btn search-information-btn mb-3 mr-2" variant="outline-secondary" @click="hideModal()">Hủy
            </b-button>
            <b-button size="sm" class="btn search-information-btn mb-3 mr-2" variant="primary" @click="onSave()">Tạo</b-button>
        </div>
    </b-modal>
</template>
<script>
export default {
  name: "confirmTaoLichLamViecModal",
  components: {},
  props: {},
  data() {
    return {};
  },
  methods: {
    hideModal() {
      this.$refs.confirmTaoLichLamViec.hide();
    },
    onSave() {
      this.$emit("onSave");
    }
  }
};
</script>

<style scoped>
</style>
