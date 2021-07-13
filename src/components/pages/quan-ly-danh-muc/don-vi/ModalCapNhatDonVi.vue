<template>
  <b-modal
    :title="this.isEdit ? 'Sửa đơn vị' : 'Thêm mới đơn vị'"
    @hidden="hideModal"
    centered
    id="modal-cap-nhat-don-vi"
    no-close-on-backdrop
    size="xl"
  >
    <validation-observer ref="obDonVi">
      <b-form>
        <b-row>
          <b-col cols="10">
            <ValidationProvider
              name="Tên đơn vị tiếng Việt"
              rules="required"
              v-slot="validationContext"
            >
              <b-form-group
                label="Tên đơn vị tiếng Việt"
                label-align-sm="right"
                label-class="required"
                label-cols-sm="3"
                label-for="hoTen"
              >
                <b-form-input
                  :state="getValidationState(validationContext)"
                  id="hoTen"
                  v-model="form.tenDonVi"
                ></b-form-input>
                <b-form-invalid-feedback
                >{{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <b-form-group
              label="Mã đơn vị"
              label-align-sm="right"
              label-cols-sm="3"
              label-for="maDonVi"
            >
              <b-form-input
                id="maDonVi"
                v-model="form.maDonVi"
              ></b-form-input>
            </b-form-group>
            <ValidationProvider
              name="Đơn vị cha"
              rules="required"
              v-slot="validationContext"
            >
              <b-form-group
                label="Đơn vị cha"
                label-align-sm="right"
                label-class="required"
                label-cols-sm="3"
                label-for="donVi"
              >
                <cayDonVi :class-valid="validationContext.invalid && validationContext.validated"
                          :disabled="notDisplay"
                          :id-don-vi-cha="idDonViCha"
                          :path="form.duongDan_ID_DonVi_Cha"
                          ref-name="chonCayDonVi"
                          v-model="form.iD_DonVi_Cha"
                />
                <b-form-invalid-feedback
                  :force-show="
                    validationContext.invalid && validationContext.validated
                  "
                >{{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <b-form-group
              label="Mã liên thông"
              label-align-sm="right"
              label-cols-sm="3"
              label-for="maLienThong"
            >
              <b-form-input
                id="maLienThong"
                v-model="form.maLienThong"
              ></b-form-input>
            </b-form-group>
            <ValidationProvider
              name="Thứ tự"
              rules="numeric"
              v-slot="validationContext"
            >
              <b-form-group
                label="Thứ tự"
                label-align-sm="right"
                label-cols-sm="3"
                label-for="thuTu"
              >
                <b-form-input
                  :state="getValidationState(validationContext)"
                  id="thuTu"
                  v-model="form.thuTu"
                ></b-form-input>
                <b-form-invalid-feedback
                >{{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <ValidationProvider
              name="Số điện thoại"
              rules="phone_number:8,20"
              v-slot="validationContext"
            >
              <b-form-group
                label="Số điện thoại"
                label-align-sm="right"
                label-cols-sm="3"
                label-for="soDienThoai"
              >
                <b-form-input
                  :state="getValidationState(validationContext)"
                  id="soDienThoai"
                  v-model="form.soDienThoai"
                ></b-form-input>
                <b-form-invalid-feedback
                >{{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <ValidationProvider
              name="Email"
              rules="email"
              v-slot="validationContext"
            >
              <b-form-group
                label="Email"
                label-align-sm="right"
                label-cols-sm="3"
                label-for="email"
              >
                <b-form-input
                  :state="getValidationState(validationContext)"
                  id="email"
                  v-model="form.email"
                ></b-form-input>
                <b-form-invalid-feedback
                >{{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <b-form-group
              label="Fax"
              label-align-sm="right"
              label-cols-sm="3"
              label-for="fax"
            >
              <b-form-input
                id="fax"
                v-model="form.fax"
              ></b-form-input>
            </b-form-group>

            <b-form-group label-align-sm="right" label-cols-sm="3">
              <div class="mt-sm-2">
                <b-form-checkbox
                  id="bit_DonViBoPhan"
                  inline
                  v-model="form.bit_DonViBoPhan"
                >Đơn vị bộ phận
                </b-form-checkbox>
                <b-form-checkbox
                  id="bit_NhanTinBuon_Email"
                  inline
                  v-model="form.bit_LanhDao"
                >Thuộc ban lãnh đạo
                </b-form-checkbox>
              </div>
            </b-form-group>
            <b-form-group label-cols-sm="3">
              <div class="mt-sm-2">
                <b-form-checkbox
                  id="bit_DonViThuocBo"
                  inline
                  v-model="form.bit_DonViThuocBo"
                >
                  Trực thuộc bộ KHDT
                </b-form-checkbox>
                <b-form-checkbox
                  id="bit_DonViSuNghiep"
                  inline
                  v-model="form.bit_DonViSuNghiep"
                >Đơn vị sự nghiệp
                </b-form-checkbox>
              </div>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
    <template v-slot:modal-footer>
      <div class="w-100 center">
        <b-button @click="hideModal()" class="btn btn-line">
          {{ HUY_BO_BUTTON_LABEL }}
        </b-button>
        <b-button @click="onSubmit()" class="btn btn-main ml-2">
          {{ isEdit? 'Cập nhật' : 'Thêm Mới'}}
        </b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
  import CayDonVi from "@/components/common/CayDonVi";
  import { HUY_BO_BUTTON_LABEL, PERMISSION_NAME, ROUTE_NAME } from "@/constants/constants";
  import { hasPermission } from "@/utils/permissionUtils";
  import { objectTrim } from "@/utils/convertData";
  import { mapGetters } from "vuex";

  export default {
    name: "ModalCapNhatDonVi",
    components: {
      CayDonVi,
    },
    props: {
      isEdit: {
        type: Boolean,
        default: false
      },
      isEditParent: {
        type: Boolean,
        default: false
      },
      parentId: {
        type: Number,
        default: null
      },
      data: {
        type: Object
      },
    },
    data() {
      return {
        ROUTE: ROUTE_NAME,
        PERMISSION_NAME: PERMISSION_NAME,
        HUY_BO_BUTTON_LABEL: HUY_BO_BUTTON_LABEL,
        activeTab: 1,
        items: [],
        donViDaChon: {
          tenDonVi: ""
        },
        form: {
          tenDonVi: "",
          iD_DonVi_Cha: null,
          iD_DonVi_Goc: 1,
          maDonVi: "",
          capDonVi: 0,
          duongDan_ID_DonVi_Cha: "",
          duongDan_ID_DonVi: "",
          maLienThong: "",
          bit_DonViBoPhan: false,
          thuTu: 0,
          bit_LanhDao: false,
          soDienThoai: "",
          email: "",
          fax: "",
          bit_DonViThuocBo: false,
          bit_DonViSuNghiep: false
        },
        optionsDonVi: [],
        listDonViCon: [],
      };
    },
    computed: {
      ...mapGetters({
        user: "common/user",
        permissions: "common/permissions",
        dsDonViCon: "donVi/danhSachDonViCon",
        danhSachDonViCon: "donVi/danhSachDonViCon",
        danhSachDonViPhanTrang: "donVi/danhSachDonViPhanTrang"
      }),
      notDisplay() {
        return this.isEdit && ((hasPermission(this.permissions, this.PERMISSION_NAME.QUAN_TRI_DON_VI_GOC) && this.form.id == this.user.donViGoc.id) ||
          (!hasPermission(this.permissions, this.PERMISSION_NAME.QUAN_TRI_DON_VI_GOC) && !hasPermission(this.permissions, this.PERMISSION_NAME.QUAN_TRI_HE_THONG) &&
            (this.user.donViGoc.id == this.user.donViTrucThuoc.id || this.form.id == this.user.donViTrucThuoc.id)))
      },
      idDonViCha() {
        let idDonViCha = !this.isEditParent && this.parentId ? this.parentId : 1;
        if (hasPermission(this.permissions, this.PERMISSION_NAME.QUAN_TRI_DON_VI_GOC) && !hasPermission(this.permissions, this.PERMISSION_NAME.QUAN_TRI_HE_THONG))
          idDonViCha = this.user.donViGoc.id

        if (!hasPermission(this.permissions, this.PERMISSION_NAME.QUAN_TRI_DON_VI_GOC) && !hasPermission(this.permissions, this.PERMISSION_NAME.QUAN_TRI_HE_THONG))
          idDonViCha = this.user.donViTrucThuoc.id

        return idDonViCha
      }
    },
    async created() {
      if (!this.isEdit) {
        this.form.iD_DonVi_Cha = this.parentId || 1;
      }
    },
    methods: {
      hideModal() {
        this.$bvModal.hide("modal-cap-nhat-don-vi");
        this.$emit("hidden");
        this.resetForm();
      },
      onSuccess() {
        this.hideModal();
        this.$emit("success");
      },
      getValidationState({dirty, validated, valid = null}) {
        return dirty || validated ? valid : null;
      },
      async onSubmit() {
        const isValid = await this.$refs.obDonVi.validate();
        const $vm = this;
        let data = $vm.form;
        data.iD_DonVi_Cha = parseInt(data.iD_DonVi_Cha);
        data.iD_DonVi_Goc = parseInt(data.iD_DonVi_Goc);
        data.capDonVi = parseInt(data.capDonVi);
        data.thuTu = parseInt(data.thuTu);
        if (isValid) {
          if (this.isEdit) {
            await this.$store.dispatch("donVi/suaDonVi", {
              data: data,
              onSuccess: this.onSuccess
            });
          } else {
            await this.$store.dispatch("donVi/themDonVi", {
              data: data,
              onSuccess: this.onSuccess
            });
          }
        }
      },
      resetForm() {
        this.form = {
          tenDonVi: "",
          iD_DonVi_Cha: null,
          iD_DonVi_Goc: 1,
          maDonVi: "",
          capDonVi: 0,
          duongDan_ID_DonVi_Cha: "",
          duongDan_ID_DonVi: "",
          maLienThong: "",
          bit_DonViBoPhan: false,
          thuTu: 0,
          bit_LanhDao: false,
          soDienThoai: "",
          email: "",
          fax: "",
          bit_DonViThuocBo: false,
          bit_DonViSuNghiep: false
        }
      }
    },
    watch: {
      isEdit: function () {
        if (this.isEdit) {
          this.form = Object.assign(this.form, objectTrim(this.data));
        } else {
          this.resetForm();
        }
      }
    }
  }
</script>

<style scoped>

</style>