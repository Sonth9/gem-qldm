<template>
  <b-modal :title="this.isEdit ? 'Sửa danh mục hệ thống' : 'Thêm mới danh mục hệ thống'"
           @hidden="hideModal"
           centered
           no-close-on-backdrop
           ref="modalCapNhatDanhMucHeThong" size="md">
    <validation-observer ref="observerDanhMucHeThong">
      <b-form>
        <validation-provider
          :rules="{ required: true }"
          name="heThong"
          v-slot="validationContext"
        >
          <b-form-group class="mb-4" id="heThong-input-group" label="Tên danh mục hệ thống" label-class="required" label-for="heThong-input">
            <b-form-input
              :state="getValidationState(validationContext)"
              aria-describedby="heThong-live-feedback"
              class="border-radius-4"
              id="heThong-input"
              name="heThong-input"
              v-model="form.heThong"
            ></b-form-input>
            <b-form-invalid-feedback id="heThong-live-feedback">Tên danh mục hệ thống bắt buộc phải nhập
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
  name: "modalCapNhatDanhMucHeThong",
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
        heThong: ""
      }
    };
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    hideModal() {
      this.resetForm();
      this.$refs["modalCapNhatDanhMucHeThong"].hide();
      this.$emit("hidden");
    },
    resetForm() {
      this.form = {
        heThong: ""
      };
    },
    async onSubmit() {
      const isValid = await this.$refs.observerDanhMucHeThong.validate();
      const $vm = this;
      if (isValid) {
        if (this.isEdit) {
          await this.$store.dispatch("dmHeThong/suaDanhMucHeThong", {
            data: $vm.form,
            onSuccess: this.hideModal
          });
        } else {
          await this.$store.dispatch("dmHeThong/themDanhMucHeThong", {
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
