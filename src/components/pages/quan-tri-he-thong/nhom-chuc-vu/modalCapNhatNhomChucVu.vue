<template>
  <b-modal :title="this.isEdit ? 'Sửa nhóm chức vụ' : 'Thêm mới nhóm chức vụ'"
           @hidden="hideModal"
           centered
           no-close-on-backdrop
           ref="modalCapNhatNhomChucVu" size="md">
    <validation-observer ref="observerNhomChucVu">
      <b-form>
        <validation-provider
          :rules="{ required: true }"
          name="tenNhom"
          v-slot="validationContext"
        >
          <b-form-group class="mb-4 required" id="tenNhom-input-group" label="Tên nhóm chức vụ" label-for="tenNhom-input">
            <b-form-input
              :state="getValidationState(validationContext)"
              aria-describedby="tenNhom-live-feedback"
              class="border-radius-4"
              id="tenNhom-input"
              name="tenNhom-input"
              v-model="form.tenNhom"
            ></b-form-input>
            <b-form-invalid-feedback id="tenNhom-live-feedback">Tên nhóm chức vụ bắt buộc phải nhập
            </b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>
      </b-form>
    </validation-observer>
    <template v-slot:modal-footer>
      <div class="w-100 center">
        <b-button @click="hideModal()" class="btn btn-line">
          {{ BO_QUA_BUTTON_LABEL }}
        </b-button>
        <b-button @click="onSubmit()" class="btn btn-main ml-2">
          {{ isEdit? 'Cập nhật' : 'Thêm Mới'}}
        </b-button>
      </div>
    </template>

  </b-modal>
</template>

<script>
import { BO_QUA_BUTTON_LABEL, ROUTE_NAME } from "@/constants/constants";

// import { isEmpty } from "lodash";

export default {
  name: "modalCapNhatNhomChucVu",
  props: {
    data: {
      type: Object
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ROUTE_NAME: ROUTE_NAME,
      BO_QUA_BUTTON_LABEL: BO_QUA_BUTTON_LABEL,
      form: {
        tenNhom: ""
      }
    };
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    hideModal() {
      this.resetForm();
      this.$refs["modalCapNhatNhomChucVu"].hide();
      this.$emit("hidden");
    },
    resetForm() {
      this.form = {
        tenNhom: ""
      };
    },
    async onSubmit() {
      const isValid = await this.$refs.observerNhomChucVu.validate();
      const $vm = this;
      if (isValid) {
        if (this.isEdit) {
          await this.$store.dispatch("nhomChucVu/suaNhomChucVu", {
            data: $vm.form,
            onSuccess: this.hideModal
          });
        } else {
          await this.$store.dispatch("nhomChucVu/themNhomChucVu", {
            data: $vm.form,
            onSuccess: this.hideModal
          });
        }
      }
    }
  },
  watch: {
    isEdit: function() {
      if (this.isEdit) {
        this.form = Object.assign(this.form, this.data);
      } else {
        this.resetForm();
      }
    }
  }
};
</script>

<style scoped>
</style>
