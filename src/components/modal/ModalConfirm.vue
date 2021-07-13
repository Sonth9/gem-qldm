<template>
  <b-modal
    :id="id"
    :title="replace? title: 'Bạn có muốn xóa \''+title+'\' ?'"
    centered
    footer-class="border-top-none"
    header-class="border-bottom-none"
    hide-footer
    size="md"
  >
    <div class="font-size-14">
      <div class="w-100 center">
        <b-button @click="hideModal()" class="btn btn-line">
          {{ BO_QUA_BUTTON_LABEL }}
        </b-button>
        <b-button @click="confirm()" class="btn btn-main ml-2">
          {{DONG_Y_BUTTON_LABEL}}
        </b-button>
      </div>
    </div>
  </b-modal>
</template>

<script>
  import { BO_QUA_BUTTON_LABEL, DONG_Y_BUTTON_LABEL } from "@/constants/constants";

  export default {
    name: "ModalConfirm",
    props: {
      title: {
        // eslint-disable-next-line vue/require-prop-type-constructor
        type: String | null,
        required: true
      },
      id: {
        type: String,
        default: 'modal-confirm'
      },
      replace: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        BO_QUA_BUTTON_LABEL: BO_QUA_BUTTON_LABEL,
        DONG_Y_BUTTON_LABEL: DONG_Y_BUTTON_LABEL
      };
    },
    methods: {
      hideModal() {
        this.$bvModal.hide(this.id);
      },
      confirm() {
        this.$emit("confirmed", true);
      }
    }
  };
</script>

<style scoped>
</style>
