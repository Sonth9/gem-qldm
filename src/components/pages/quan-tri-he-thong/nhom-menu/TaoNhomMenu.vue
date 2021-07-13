<template>
  <div>
    <validation-observer ref="obNhomMenu">
      <b-form>
        <b-col cols="10">
          <ValidationProvider
            name="Tên nhóm quyền"
            rules="required"
            v-slot="validationContext"
          >
            <b-form-group
              label="Tên nhóm quyền"
              label-align-sm="right"
              label-class="required"
              label-cols-sm="3"
              label-for="tenNhomMenu"
            >
              <b-form-input
                :disabled="isView"
                :state="getValidationState(validationContext)"
                id="tenNhomMenu"
                v-model="form.title"
              ></b-form-input>
              <b-form-invalid-feedback
              >{{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <ValidationProvider
            name="Mô tả"
            rules="required"
            v-slot="validationContext"
          >
            <b-form-group
              label="Mô tả"
              label-align-sm="right"
              label-class="required"
              label-cols-sm="3"
              label-for="mota"
            >
              <b-form-textarea
                :disabled="isView"
                :state="getValidationState(validationContext)"
                id="mota"
                max-rows="6"
                rows="3"
                v-model="form.description"
              ></b-form-textarea>
              <b-form-invalid-feedback
              >{{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </ValidationProvider>
          <b-form-group
            label="Trạng thái"
            label-align-sm="right"
            label-cols-sm="3">
            <div class="mt-sm-2">
              <b-form-checkbox
                :disabled="isView"
                inline
                v-model="form.trangThai"
              >
                Hoạt động
              </b-form-checkbox>
            </div>
          </b-form-group>
        </b-col>
        <div class="w-100 center mb-3 mt-5">
          <b-button @click="backToList()" class="btn btn-line">
            {{ isView ? QUAY_LAI_BUTTON_LABEL : HUY_BO_BUTTON_LABEL }}
          </b-button>
          <b-button @click="goToEdit()" class="btn btn-main ml-2 btn-line" v-if="isView">
            Chỉnh sửa
          </b-button>
          <b-button @click="onSubmit()" class="btn btn-main ml-2" v-else>
            {{ isEdit ? "Cập nhật" : "Thêm Mới" }}
          </b-button>
        </div>
      </b-form>
    </validation-observer>
    <b-tabs content-class="mt-3" v-if="isEdit || isView">
      <b-tab active title="Phân quyền menu">
        <PhanQuyenMenu :data-menus="quyenNhomMenu" :is-view="isView" @updateMenu="capNhatQuyenMenu"/>
      </b-tab>
      <b-tab title="Quản lý người dùng">
        <DanhSachNguoiDung :id-nhom-quyen="form.id" />
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
  import { HUY_BO_BUTTON_LABEL, QUAY_LAI_BUTTON_LABEL, ROUTE_NAME } from "@/constants/constants";
  import { objectTrim } from "@/utils/convertData";
  import { mapGetters } from "vuex";
  import { isNil, pickBy } from "lodash";
  import PhanQuyenMenu from "@/components/pages/quan-tri-he-thong/menu-he-thong/PhanQuyenMenu";
  import DanhSachNguoiDung from "@/components/pages/quan-tri-he-thong/nhom-menu/DanhSachNguoiDung";

  export default {
    name: "TaoNhomMenu",
    props: {
      isEdit: {
        type: Boolean,
        default: false
      },
      isView: {
        type: Boolean,
        default: false
      }
    },
    components: {
      PhanQuyenMenu,
      DanhSachNguoiDung
    },
    data() {
      return {
        ROUTE: ROUTE_NAME,
        HUY_BO_BUTTON_LABEL: HUY_BO_BUTTON_LABEL,
        QUAY_LAI_BUTTON_LABEL: QUAY_LAI_BUTTON_LABEL,
        form: {
          title: "",
          description: "",
          trangThai: true
        }
      };
    },
    computed: {
      ...mapGetters({
        chiTietNhomMenu: "dmNhomMenu/nhomMenu",
        quyenNhomMenu: "dmNhomMenu/quyenNhomMenu"
      })
    },
    async created() {
      if (this.isEdit || this.isView) {
        await this.layChiTietNhomMenu();
        this.layQuyenNhomMenu();
      }
    },
    methods: {
      layChiTietNhomMenu() {
        this.$store.dispatch("dmNhomMenu/layChiTietNhomMenu", {
          id: this.$route.params.id
        });
      },
      layQuyenNhomMenu() {
        this.$store.dispatch("dmNhomMenu/layQuyenNhomMenu", {id: this.$route.params.id});
      },
      getValidationState({dirty, validated, valid = null}) {
        return dirty || validated ? valid : null;
      },
      async onSubmit() {
        const isValid = await this.$refs.obNhomMenu.validate();
        const $vm = this;
        let data = $vm.form;
        data = pickBy(data, function (value) {
          return !isNil(value);
        });
        if (isValid) {
          if (this.isEdit) {
            await this.$store.dispatch("dmNhomMenu/suaNhomMenu", {
              data: data,
              onSuccess: this.backToDetail
            });
          } else {
            await this.$store.dispatch("dmNhomMenu/taoNhomMenu", {
              data: data,
              onSuccess: this.backToList
            });
          }
        }
      },
      capNhatQuyenMenu(data) {
        let formData = new FormData();
        formData.append(
          "request",
          JSON.stringify({
            NhomQuyenId: this.$route.params.id,
            DanhSachNhomQuyen: data
          })
        )
        this.$store.dispatch("dmNhomMenu/suaQuyenNhomMenu", formData);
      },
      backToDetail() {
        this.$router.push({
          name: ROUTE_NAME.QUAN_TRI_HE_THONG.DM_NHOM_MENU.XEM,
          params: {id: this.$route.params.id}
        });
      },
      backToList() {
        this.$router.push({
          name: ROUTE_NAME.QUAN_TRI_HE_THONG.DM_NHOM_MENU.NAME
        });
      },
      goToEdit() {
        this.$router.push({
          name: ROUTE_NAME.QUAN_TRI_HE_THONG.DM_NHOM_MENU.SUA,
          params: {id: this.$route.params.id}
        });
      },

    },
    watch: {
      chiTietNhomMenu: {
        handler() {
          this.form = objectTrim(this.chiTietNhomMenu);
        }
      }
    }
  };
</script>

<style scoped>
</style>
