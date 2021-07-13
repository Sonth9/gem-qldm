<template>
  <b-modal
    :title="this.isEdit ? 'Sửa chức vụ' : 'Thêm mới chức vụ'"
    @hidden="hideModal"
    centered
    no-close-on-backdrop
    ref="modalCapNhatChucVu"
    size="md">
    <validation-observer ref="observerChucVu">
      <b-form>
        <validation-provider
          :rules="{ required: true }"
          name="Tên chức vụ"
          v-slot="validationContext"
        >
          <b-form-group class="mb-4" id="chucVu-input-group" label="Tên chức vụ" label-class="required"
                        label-for="chucVu-input">
            <b-form-input
              :state="getValidationState(validationContext)"
              aria-describedby="chucVu-live-feedback"
              class="border-radius-4"
              id="chucVu-input"
              name="chucVu-input"
              v-model="form.chucVu"
            ></b-form-input>
            <b-form-invalid-feedback id="chucVu-live-feedback">{{validationContext.errors[0]}}
            </b-form-invalid-feedback>
          </b-form-group>
        </validation-provider>
        <validation-provider
          name="Nhóm chức vụ"
          rules="required:select"
          v-slot="validationContext"
        >
          <b-form-group class="mb-4 required" id="idNhomChucVu-input-group" label="Nhóm chức vụ" label-class="required">
            <v-select :class="selectClass(validationContext.invalid && validationContext.validated)"
                      :options="danhSachNhomChucVu" :reduce="text => text.id"
                      label="tenNhom"
                      v-model="form.iD_NhomChucVu">
            </v-select>
            <b-form-invalid-feedback :force-show="validationContext.invalid && validationContext.validated">
              {{validationContext.errors[0]}}
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
import { mapGetters } from "vuex";
import { BO_QUA_BUTTON_LABEL, ROUTE_NAME } from "@/constants/constants";

// import { isEmpty } from "lodash";

export default {
  name: "modalCapNhatChucVu",
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
        chucVu: "",
        iD_NhomChucVu: null
      }
    };
  },
  computed: {
    ...mapGetters({
      danhSachNhomChucVu: "nhomChucVu/danhSachNhomChucVu"
    })
  },
  created() {
    this.layDanhSachNhomChucVu();
  },
  methods: {
    layDanhSachNhomChucVu() {
      this.$store.dispatch("nhomChucVu/layDanhSachNhomChucVu");
    },
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    hideModal() {
      this.resetForm();
      this.$refs["modalCapNhatChucVu"].hide();
      this.$emit("hidden");
    },
    resetForm() {
      this.form = {
        chucVu: "",
        iD_NhomChucVu: null
      };
    },
    async onSubmit() {
      const isValid = await this.$refs.observerChucVu.validate();
      const $vm = this;
      if (isValid) {
        if (this.isEdit) {
          await this.$store.dispatch("chucVu/suaChucVu", {
            data: $vm.form,
            onSuccess: this.hideModal
          });
        } else {
          await this.$store.dispatch("chucVu/themChucVu", {
            data: $vm.form,
            onSuccess: this.hideModal
          });
        }
      }
    },
    selectClass(valid) {
      return {
        "select-invalid": valid
      };
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
