<template>
  <b-modal
    :title="this.isEdit ? 'Sửa hồ sơ cán bộ' : 'Thêm mới hồ sơ cán bộ'"
    @hidden="hideModal"
    centered
    id="modal-cap-nhat-can-bo"
    no-close-on-backdrop
    size="xl"
  >
    <validation-observer ref="obCanBo">
      <b-form>
        <b-row>
          <b-col cols="10">
            <ValidationProvider
              name="Tên cán bộ"
              rules="required"
              v-slot="validationContext"
            >
              <b-form-group
                label="Tên cán bộ"
                label-align-sm="right"
                label-class="required"
                label-cols-sm="3"
                label-for="hoTen"
              >
                <b-form-input
                  :state="getValidationState(validationContext)"
                  id="hoTen"
                  v-model="form.hoTen"
                ></b-form-input>
                <b-form-invalid-feedback
                >{{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <b-form-group
              label="Mã cán bộ"
              label-align-sm="right"
              label-cols-sm="3"
              label-for="maCanBo"
            >
              <b-form-input id="maCanBo" v-model="form.maCanBo"></b-form-input>
            </b-form-group>
            <ValidationProvider
              name="Tên đăng nhập"
              rules="required"
              v-slot="validationContext"
            >
              <b-form-group
                label="Tên đăng nhập"
                label-align-sm="right"
                label-class="required"
                label-cols-sm="3"
                label-for="username"
              >
                <b-form-input
                  :state="getValidationState(validationContext)"
                  id="username"
                  v-model="form.userName"
                ></b-form-input>
                <b-form-invalid-feedback
                >{{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <b-form-group
              label="Giới tính"
              label-align-sm="right"
              label-cols-sm="3"
              label-for="gioiTinh"
            >
              <v-select
                :clearable="false"
                :options="optionsGender"
                :reduce="(item) => item.value"
                id="gioiTinh"
                label="label"
                v-model="form.gioiTinh"
              ></v-select>
            </b-form-group>
            <b-form-group
              label="Ngày sinh"
              label-align-sm="right"
              label-cols-sm="3"
              label-for="ngaySinh"
            >
              <b-form-datepicker
                :date-format-options="{
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                }"
                locale="vi"
                v-model="form.ngaySinh"
              ></b-form-datepicker>
            </b-form-group>
            <b-form-group
              label="Số CMND"
              label-align-sm="right"
              label-cols-sm="3"
              label-for="cmtnd"
            >
              <b-form-input id="cmtnd" v-model="form.cmtnd"></b-form-input>
            </b-form-group>
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
            <ValidationProvider
              name="Số di động cá nhân"
              rules="phone_number:8,20"
              v-slot="validationContext"
            >
              <b-form-group
                label="Số di động cá nhân"
                label-align-sm="right"
                label-cols-sm="3"
                label-for="phone_DiDong"
              >
                <b-form-input
                  :state="getValidationState(validationContext)"
                  id="phone_DiDong"
                  v-model="form.phone_DiDong"
                ></b-form-input>
                <b-form-invalid-feedback
                >{{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <ValidationProvider
              name="Số di động cơ quan"
              rules="phone_number:8,20"
              v-slot="validationContext"
            >
              <b-form-group
                label="Số điện thoại cơ quan"
                label-align-sm="right"
                label-cols-sm="3"
                label-for="phone_CoQuan"
              >
                <b-form-input
                  :state="getValidationState(validationContext)"
                  id="phone_CoQuan"
                  v-model="form.phone_CoQuan"
                ></b-form-input>
                <b-form-invalid-feedback
                >{{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <ValidationProvider
              name="Số di động cơ quan"
              rules="phone_number:8,20"
              v-slot="validationContext"
            >
              <b-form-group
                label="Số điện thoại nhà riêng"
                label-align-sm="right"
                label-cols-sm="3"
                label-for="phone_NhaRieng"
              >
                <b-form-input
                  :state="getValidationState(validationContext)"
                  id="phone_NhaRieng"
                  v-model="form.phone_NhaRieng"
                ></b-form-input>
                <b-form-invalid-feedback
                >{{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>
            <b-form-group
              label="Địa chỉ liên hệ"
              label-align-sm="right"
              label-cols-sm="3"
              label-for="diaChi"
            >
              <b-form-input id="diaChi" v-model="form.diaChi"></b-form-input>
            </b-form-group>
            <ValidationProvider
              name="Chức vụ"
              rules="required:select"
              v-slot="validationContext"
            >
              <b-form-group
                label="Chức vụ"
                label-align-sm="right"
                label-class="required"
                label-cols-sm="3"
                label-for="iD_ChucVu"
              >
                <v-select
                  :class="selectClass(validationContext.invalid && validationContext.validated)"
                  :options="danhSachChucVu"
                  :reduce="(chucVu) => chucVu.id"
                  id="iD_ChucVu"
                  label="chucVu"
                  v-model="form.iD_ChucVu"
                >
                </v-select>
                <b-form-invalid-feedback
                  :force-show="
                    validationContext.invalid && validationContext.validated
                  "
                >{{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </validationprovider>
            <ValidationProvider
              name="Đơn vị"
              rules="required:select"
              v-slot="validationContext"
            >
              <b-form-group
                label="Đơn vị"
                label-align-sm="right"
                label-class="required"
                label-cols-sm="3"
                label-for="donVi"
              >
                <cayDonVi :class-valid="validationContext.invalid && validationContext.validated"
                          :id-don-vi-cha="idDonViCha"
                          :path="form.duongDanIdDonViCha"
                          ref-name="chonCayDonVi"
                          v-model="form.iD_DonVi"
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
              label="Đơn vị biệt phái"
              label-align-sm="right"
              label-cols-sm="3"
              label-for="iD_DonVi_BietPhai"
            >

              <cayDonVi
                :id-don-vi-cha="idDonViBietPhaiCha"
                :path="form.duongDanIdDonViBietPhaiCha"
                ref-name="chonCayDonViBietPhai"
                v-model="form.iD_DonVi_BietPhai"
              />
            </b-form-group>
            <b-form-group
              label="Hình thức nhận tin buồn"
              label-align-sm="right"
              label-cols-sm="3"
            >
              <div class="mt-sm-2">
                <b-form-checkbox
                  inline
                  v-model="form.bit_NhanTinBuon_SMS"
                >SMS
                </b-form-checkbox>
                <b-form-checkbox
                  inline
                  v-model="form.bit_NhanTinBuon_Email"
                >Email
                </b-form-checkbox>
              </div>
            </b-form-group>
            <b-form-group label-cols-sm="3">
              <div class="mt-sm-2">
                <b-form-checkbox
                  inline
                  v-model="form.bitDauMoiPAKN"
                >
                  Đầu mối PAKN
                </b-form-checkbox>
                <b-form-checkbox
                  inline
                  v-model="form.bit_ThuTruongDonVi"
                >
                  Là Thủ trưởng đơn vị
                </b-form-checkbox>
                <b-form-checkbox
                  inline
                  v-model="form.bit_DanhBa"
                >Hiển thị trong danh bạ app EMPI
                </b-form-checkbox>
              </div>
            </b-form-group>
          </b-col>
        </b-row>
        <div
          class="w-100 center mt-3 d-flex"
          style="justify-content: center"
          v-if="isEdit"
        >
          <BaseUploadImage
            :image="form.anhDaiDien_FilePath"
            @input="upLoadFileToServer($event, imageType.anhDaiDien)"
            label="Ảnh đại diện"
          />
          <BaseUploadImage
            :image="form.anhChuKy_FilePath"
            @input="upLoadFileToServer($event, imageType.anhChuKy)"
            label="Ảnh chữ ký"
          />
          <BaseUploadImage
            :image="form.anhChuKyNhay_FilePath"
            @input="upLoadFileToServer($event, imageType.anhChuKyNhay)"
            label="Ảnh ký nháy"
          />
        </div>
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
  import BaseUploadImage from "@/components/common/BaseUploadImage";
  import CayDonVi from "@/components/common/CayDonVi";
  import { HUY_BO_BUTTON_LABEL, PERMISSION_NAME, ROUTE_NAME } from "@/constants/constants";
  import { objectTrim } from "@/utils/convertData";
  import { hasPermission } from "@/utils/permissionUtils";
  import { isNil, pickBy } from "lodash";
  import moment from "moment";
  import { mapGetters } from "vuex";

  export default {
    name: "ModalCapNhatCanBo",
    props: {
      data: {
        type: Object
      },
      isEdit: {
        type: Boolean,
        default: false
      },
      parentId: {
        type: Number,
        default: null
      }
    },
    components: {
      CayDonVi,
      BaseUploadImage
    },
    data() {
      return {
        ROUTE: ROUTE_NAME,
        PERMISSION_NAME: PERMISSION_NAME,
        HUY_BO_BUTTON_LABEL: HUY_BO_BUTTON_LABEL,

        form: {
          maCanBo: "",
          hoTen: "",
          phone_DiDong: "",
          phone_CoQuan: "",
          phone_NhaRieng: "",
          email: "",
          gioiTinh: false,
          ngaySinh: "1970-01-01",
          iD_ChucVu: null,
          userName: "",
          iD_DonVi: null,
          iD_DonVi_BietPhai: null,
          cmtnd: "",
          diaChi: "",
          bit_ChuyenCongTac: false,
          bit_NhanTinBuon_Email: false,
          bit_NhanTinBuon_SMS: false,
          bit_DanhBa: false,
          bit_ThuTruongDonVi: false,
          bitDauMoiPAKN: false,
          anhDaiDien_FilePath: "",
          anhChuKy_FilePath: "",
          anhChuKyNhay_FilePath: "",
          duongDanIdDonViCha: "",
          duongDanIdDonViBietPhaiCha: "1"
        },
        imageType: {
          anhDaiDien: 1,
          anhChuKy: 2,
          anhChuKyNhay: 2
        },
        optionsGender: [
          {label: "Nữ", value: false},
          {label: "Nam", value: true}
        ],
        optionsDonVi: [],
        optionsDonViBietPhai: [],
        reloadDonVI: false,
        reloadDonVIBietPhai: false,
        idDonViCha: this.parentId || 1,
        idDonViBietPhaiCha: 1
      };
    },
    computed: {
      ...mapGetters({
        user: "common/user",
        permissions: "common/permissions",
        chiTietCanBo: "canBo/canBo",
        danhSachChucVu: "chucVu/danhSachChucVu",
      }),
    },
    async created() {
      this.layDanhSachChucVu();
      if (!this.checkAuth(PERMISSION_NAME.QUAN_TRI_DON_VI_GOC) && !this.checkAuth(PERMISSION_NAME.QUAN_TRI_HE_THONG)) {
        this.idDonViCha = this.user.donViTrucThuoc.id
        this.form.duongDanIdDonViCha = this.user.donViTrucThuoc.duongDan
      }

      if (this.checkAuth(PERMISSION_NAME.QUAN_TRI_DON_VI_GOC) && !this.checkAuth(PERMISSION_NAME.QUAN_TRI_HE_THONG)) {
        this.idDonViCha = this.user.donViGoc.id
        this.form.duongDanIdDonViCha = this.user.donViGoc.duongDan
      }

      this.form.iD_DonVi = this.parentId || 1

    },

    methods: {
      hideModal() {
        this.$bvModal.hide("modal-cap-nhat-can-bo");
        this.$emit("hidden");
      },
      onSuccess() {
        this.hideModal();
        this.$emit("success");
      },
      getValidationState({dirty, validated, valid = null}) {
        return dirty || validated ? valid : null;
      },
      layDanhSachChucVu() {
        this.$store.dispatch("chucVu/layDanhSachChucVu");
      },
      layChiTietCanBo() {
        this.$store.dispatch("canBo/layChiTietCanBo", {
          id: this.data.id
        });
      },
      async onSubmit() {
        const isValid = await this.$refs.obCanBo.validate();
        const $vm = this;
        let data = $vm.form;
        data = pickBy(data, function (value) {
          return !isNil(value);
        });
        if (isValid) {
          if (this.isEdit) {
            await this.$store.dispatch("canBo/capNhatCanBo", {
              data: data,
              onSuccess: this.onSuccess
            });
          } else {
            await this.$store.dispatch("canBo/taoCanBo", {
              data: data,
              onSuccess: this.onSuccess
            });
          }
        }
      },
      format(value) {
        return moment(value).format("YYYY-MM-DD");
      },
      backToDetail() {
        this.$router.push({
          name: ROUTE_NAME.QUAN_LY_DANH_MUC.HO_SO_CAN_BO.XEM,
          params: {id: this.$route.params.id}
        });
      },
      backToList() {
        this.$router.push({
          name: ROUTE_NAME.QUAN_LY_DANH_MUC.HO_SO_CAN_BO.NAME
        });
      },
      upLoadFileToServer(image, type) {
        let payload = new FormData();
        payload.append("File", image);
        payload.append("ImageType", type);
        payload.append("Id", this.$route.params.id);
        this.$store.dispatch("canBo/upload", payload);
      },
      selectClass(valid) {
        return {
          "select-invalid": valid
        };
      },
      checkAuth(permission) {
        return hasPermission(this.permissions, permission)
      },
      resetForm() {
        this.form = {
          maCanBo: "",
          hoTen: "",
          phone_DiDong: "",
          phone_CoQuan: "",
          phone_NhaRieng: "",
          email: "",
          gioiTinh: false,
          ngaySinh: "1970-01-01",
          iD_ChucVu: null,
          userName: "",
          iD_DonVi: null,
          iD_DonVi_BietPhai: null,
          cmtnd: "",
          diaChi: "",
          bit_ChuyenCongTac: false,
          bit_NhanTinBuon_Email: false,
          bit_NhanTinBuon_SMS: false,
          bit_DanhBa: false,
          bit_ThuTruongDonVi: false,
          bitDauMoiPAKN: false,
          anhDaiDien_FilePath: "",
          anhChuKy_FilePath: "",
          anhChuKyNhay_FilePath: "",
          duongDanIdDonViCha: "",
          duongDanIdDonViBietPhaiCha: "1"
        };
      },
    },
    watch: {
      isEdit: function () {
        if (this.isEdit) {
          this.layChiTietCanBo();
        } else {
          this.resetForm();
        }
      },
      chiTietCanBo: function () {
        this.form = Object.assign(this.form, objectTrim(this.chiTietCanBo));
        this.form.iD_DonVi_BietPhai =
          this.form.iD_DonVi_BietPhai == 0
            ? null
            : this.form.iD_DonVi_BietPhai;
        this.form.ngaySinh = moment(this.form.ngaySinh).format("YYYY-MM-DD");
      }
    }
  }
</script>

<style scoped>

</style>
