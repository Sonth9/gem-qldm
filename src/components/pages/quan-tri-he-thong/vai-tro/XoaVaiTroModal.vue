<template>
  <b-modal
    centered
    footer-class="border-top-none"
    header-class="border-bottom-none"
    id="xoa-vai-tro"
    size="md"
  >
    <div class="font-size-14">
      <h4 class="center">Bạn có chắc chắn xóa vai trò?</h4>
    </div>
    <template v-slot:modal-footer>
      <div class="w-100 center">
        <b-button @click="hideModal()" class="btn btn-line">
          {{ BO_QUA_BUTTON_LABEL }}
        </b-button>
        <b-button @click="xoaVaiTro()" class="btn btn-main ml-2">
          ĐỒNG Ý
        </b-button>
      </div>
    </template>
  </b-modal>
</template>
<script>
import { BO_QUA_BUTTON_LABEL, ROUTE_NAME } from "@/constants/constants";

export default {
  name: "XoaVaiTroModal",
  props: {
    id: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: String | null,
      required: true
    }
  },
  data() {
    return {
      BO_QUA_BUTTON_LABEL: BO_QUA_BUTTON_LABEL,
      ROUTE_NAME: ROUTE_NAME,
      emailSelected: 1,
      modalTitle: "",
      internalForm: {}
    };
  },
  watch: {
    form: {
      handler() {
        this.internalForm = this.form;
      },
      immediate: true
    }
  },
  methods: {
    hideModal() {
      this.$bvModal.hide("xoa-vai-tro");
    },
    xoaVaiTro() {
      this.$store.dispatch("role/xoaVaiTro", { id: this.id });
    }
  }
};
</script>
