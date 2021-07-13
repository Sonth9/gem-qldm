<template>
  <b-modal :title="this.isEdit ? 'Sửa danh mục menu' : 'Thêm mới danh mục menu'"
           @hidden="hideModal"
           centered
           no-close-on-backdrop
           ref="modalCapNhatDanhMucMenuHeThong"
           size="lg">
    <validation-observer ref="observerDanhMucMenuHeThong">
      <b-form>
        <b-row>
          <b-col>
            <validation-provider
              :rules="{ required: true }"
              name="tenMenu"
              v-slot="validationContext"
            >
              <b-form-group class="mb-4" id="tenMenu-input-group" label="Tên menu" label-class="required" label-for="tenMenu-input">
                <b-form-input
                  :state="getValidationState(validationContext)"
                  aria-describedby="tenMenu-live-feedback"
                  class="border-radius-4"
                  id="tenMenu-input"
                  name="tenMenu-input"
                  v-model="form.tenMenu"
                ></b-form-input>
                <b-form-invalid-feedback id="tenMenu-live-feedback">Tên menu bắt buộc phải nhập
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
          </b-col>
          <b-col align-self="center">
            <div class="d-flex">
              <b-form-checkbox
                class="mr-5"
                id="cb-bit_HienThiMoTa"
                name="cb-bit_HienThiMoTa"
                v-model="form.bit_HienThiMoTa"
              >
                Hiển thị mô tả
              </b-form-checkbox>
              <b-form-checkbox
                id="cb-bit_HienThiAll"
                name="cb-bit_HienThiAll"
                v-model="form.bit_HienThiAll"
              >
                Hiển thị tất cả
              </b-form-checkbox>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <validation-provider
              name="heThong"
              rules="required:select"
              v-slot="validationContext"
            >
              <b-form-group class="mb-4 required" id="heThong-input-group" label="Hệ thống" label-class="required">
                <v-select :class="selectClass(validationContext.invalid && validationContext.validated)"
                          :options="danhSachDanhMucHeThong"
                          :reduce="text => text.id"
                          label="heThong"
                          v-model="form.iD_HeThong">
                </v-select>
                <b-form-invalid-feedback :force-show="validationContext.invalid && validationContext.validated">Hệ thống
                  bắt buộc phải chọn
                </b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
          </b-col>
          <b-col>
            <b-form-group class="mb-4" id="menu-cha-input-group" label="Menu cha">
              <v-select :options="menuCha" :reduce="text => text.id" label="tenMenu"
                        v-model="form.iD_MenuCha">
                <template #option="{ tenMenu, prefix }">
                  {{prefix}}{{ tenMenu }}
                </template>
              </v-select>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group class="mb-4" id="icon-src-input-group" label="Đường dẫn icon">
              <b-form-input
                aria-describedby="icon-src-live-feedback"
                class="border-radius-4"
                id="icon-src-input"
                name="icon-src-input"
                v-model="form.icon_src"
              ></b-form-input>
            </b-form-group>
            <b-form-group class="mb-4" id="url-input-group" label="url">
              <b-form-input
                aria-describedby="url-live-feedback"
                class="border-radius-4"
                id="url-input"
                name="url-input"
                v-model="form.url"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group class="mb-4" id="moTa-input-group" label="Mô tả">
              <b-form-textarea
                aria-describedby="moTa-live-feedback"
                class="border-radius-4"
                id="moTa-input"
                max-rows="5"
                name="moTa-input"
                rows="5"
                v-model="form.moTa"
              ></b-form-textarea>
            </b-form-group>
          </b-col>
        </b-row>
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
import { mapGetters } from "vuex";

// import { isEmpty } from "lodash";

export default {
  name: "modalCapNhatDanhMucMenuHeThong",
  props: {
    data: {
      type: Object
    },
    menu: Array,
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ROUTE_NAME: ROUTE_NAME,
      BO_QUA_BUTTON_LABEL: BO_QUA_BUTTON_LABEL,
      menuCha: [],
      form: {
        tenMenu: "",
        iD_HeThong: null,
        thuTu: 0,
        soCap: 0,
        iD_MenuCha: 0,
        icon_src: "",
        url: "",
        moTa: "",
        bit_HienThiMoTa: true,
        bit_HienThiAll: true
      }
    };
  },
  computed: {
    ...mapGetters({
      danhSachDanhMucHeThong: "dmHeThong/danhSachDanhMucHeThong"
    })
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    hideModal() {
      this.resetForm();
      this.$refs["modalCapNhatDanhMucMenuHeThong"].hide();
      this.$emit("hidden");
    },
    onSuccess() {
      this.hideModal();
      this.$emit("success");
    },
    resetForm() {
      this.form = {
        tenMenu: "",
        iD_HeThong: null,
        thuTu: 0,
        soCap: 0,
        iD_MenuCha: 0,
        icon_src: "",
        url: "",
        moTa: "",
        bit_HienThiMoTa: true,
        bit_HienThiAll: true
      };
    },
    async onSubmit() {
      const isValid = await this.$refs.observerDanhMucMenuHeThong.validate();
      const type = this.isEdit
        ? "suaDanhMucMenuHeThong"
        : "themDanhMucMenuHeThong";
      const $vm = this;
      if (isValid) {
        await this.$store.dispatch(`dmMenuHeThong/${type}`, {
          data: $vm.form,
          onSuccess: this.onSuccess
        });
      }
    },
    selectClass(valid) {
      return {
        "select-invalid": valid
      };
    }
  },
  watch: {
    menu: {
      handler() {
        this.menuCha = this.menu;
      }
    },
    isEdit: function() {
      if (this.isEdit) {
        this.form = Object.assign(this.form, this.data);
        this.menuCha = this.menuCha.filter(mn => mn.id !== this.data.id);
      } else {
        this.resetForm();
      }
    }
  }
};
</script>

<style scoped>
</style>
