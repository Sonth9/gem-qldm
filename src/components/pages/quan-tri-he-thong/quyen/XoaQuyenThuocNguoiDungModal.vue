<template>
  <b-modal
    id="xoa-quyen-theo-nguoi-dung"
    centered
    size="xl"
    header-class="border-bottom-none"
    footer-class="border-top-none"
  >
    <div class="font-size-14">
      <h4 class="center">Bạn có chắc chắn xóa quyền?</h4>
    </div>
    <template v-slot:modal-footer>
      <div class="w-100 center">
        <b-button class="btn btn-line" @click="hideModal()">
          {{ BO_QUA_BUTTON_LABEL }}
        </b-button>
        <b-button class="btn btn-main ml-2" @click="xoaQuyenTrongVaiTro()">
          ĐỒNG Ý
        </b-button>
      </div>
    </template>
  </b-modal>
</template>
<script>
import { ROUTE_NAME, BO_QUA_BUTTON_LABEL } from "@/constants/constants";
import { XOA_QUYEN_TRONG_VAI_TRO_THANH_CONG } from "@/constants/message";
import _isEmpty from "lodash/isEmpty";

export default {
  name: "XoaQuyenTrongQuyenTrongVaiTroModal",
  props: {
    id: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: String | null,
      required: true
    },
    deletePermissionIds: {
      type: Array,
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
      this.$bvModal.hide("xoa-quyen-trong-vai-tro");
    },
    xoaQuyenTrongVaiTro() {
      const $vm = this;
      this.$store
        .dispatch("user/capNhatQuyenTheoNguoiDung", {
          id: this.id,
          permissionIds: [],
          deletePermissionIds: this.deletePermissionIds
        })
        .then(() => {
          $vm.$toasted.clear();
          $vm.$toasted.global.showSuccessMessage({
            message: XOA_QUYEN_TRONG_VAI_TRO_THANH_CONG
          });
          $vm.$emit("xoaQuyenTheoNguoiDungThanhCong");
        })
        .catch(error => {
          $vm.$toasted.clear();
          if (
            !_isEmpty(error.response) &&
            error.response.data.Errors.length > 0
          ) {
            $vm.$toasted.global.showErrorMessage({
              message: error.response.data.Errors[0].Description
            });
          }
        });
    }
  }
};
</script>
