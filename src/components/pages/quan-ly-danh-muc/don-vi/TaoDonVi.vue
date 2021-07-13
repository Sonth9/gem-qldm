<template>
  <div>
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
                  :disabled="onlyView"
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
                :disabled="onlyView"
                id="maDonVi"
                v-model="form.maDonVi"
              ></b-form-input>
            </b-form-group>
              <b-form-group
                label="Đơn vị cha"
                label-align-sm="right"
                label-class="required"
                label-cols-sm="3"
                label-for="donVi"
              >
                <b-form-input
                  :disabled="onlyView"
                  v-model="form.tenDonViCha"
                ></b-form-input>
              </b-form-group>
            <b-form-group
              label="Đơn vị gốc"
              label-align-sm="right"
              label-cols-sm="3"
              label-for="donVi"
              v-if="onlyView"
            >
              <b-form-input
                :disabled="onlyView"
                id="tenDonViGoc"
                v-model="form.tenDonViGoc"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label="Mã liên thông"
              label-align-sm="right"
              label-cols-sm="3"
              label-for="maLienThong"
            >
              <b-form-input
                :disabled="onlyView"
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
                  :disabled="onlyView"
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
                  :disabled="onlyView"
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
                  :disabled="onlyView"
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
                :disabled="onlyView"
                id="fax"
                v-model="form.fax"
              ></b-form-input>
            </b-form-group>

            <b-form-group label-align-sm="right" label-cols-sm="3">
              <div class="mt-sm-2">
                <b-form-checkbox
                  :disabled="onlyView"
                  id="bit_DonViBoPhan"
                  inline
                  v-model="form.bit_DonViBoPhan"
                >Đơn vị bộ phận
                </b-form-checkbox>
                <b-form-checkbox
                  :disabled="onlyView"
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
                  :disabled="onlyView"
                  id="bit_DonViThuocBo"
                  inline
                  v-model="form.bit_DonViThuocBo"
                >
                  Trực thuộc bộ KHDT
                </b-form-checkbox>
                <b-form-checkbox
                  :disabled="onlyView"
                  id="bit_DonViSuNghiep"
                  inline
                  v-model="form.bit_DonViSuNghiep"
                >Đơn vị sự nghiệp
                </b-form-checkbox>
              </div>
            </b-form-group>
          </b-col>
        </b-row>
        <div class="w-100 center mb-3 mt-5">
          <b-button @click="backToList()" class="btn btn-line">
            {{ onlyView ? "Đóng" : HUY_BO_BUTTON_LABEL }}
          </b-button>
          <b-button
            @click="onSubmit()"
            class="btn btn-main ml-2"
            v-if="!onlyView"
          >
            {{ isEdit ? "Cập nhật" : "Thêm Mới" }}
          </b-button>
          <b-button @click="openEdit(form,true)" class="btn btn-main ml-2" v-if="hasPermissionEdit">
            Chỉnh sửa
          </b-button>
        </div>
      </b-form>
    </validation-observer>
    <b-tabs content-class="mt-3" v-if="isEdit || onlyView">
      <b-tab
        :active="activeTab === 1"
        @click="changeCurrentTab(1)"
        title="Đơn vị con"
      >
        <div class="box box-form">
          <b-row align-h="end" class="pb-3">
            <b-col align-self="end" cols="auto">
              <b-button @click="themDonViCon(form.id)" v-if="hasPermissionCreate" variant="info">
                <b-icon icon="plus"></b-icon>
                Thêm mới
              </b-button>
            </b-col>
          </b-row>
          <table class="table b-table table-striped table-bordered">
            <thead class="center">
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Tên đơn vị</th>
              <th scope="col">Thao tác</th>
            </tr>
            </thead>
            <draggable
              @change="capNhatThuTuDonVi"
              @end="drag = false"
              @start="drag = true"
              element="tbody"
              handle=".handle"
              v-model="items"
            >
              <tr
                :key="item.name"
                class="draggable"
                role="row"
                v-for="(item, index) in items"
              >
                <td class="center fit-column" role="cell">{{ index + 1 }}</td>
                <td role="cell">
                  <a :href="$router.resolve({name: ROUTE.QUAN_LY_DANH_MUC.DON_VI.XEM, params: {id: item.id}}).href">
                    {{ item.tenDonVi }}
                  </a>
                </td>
                <td class="fit-column" role="cell">
                  <div class="text-center">
                    <b-button class="handle" variant="link">
                      <font-awesome-icon
                        :style="{
                          color: '#2A6EBB',
                          cursor: 'move',
                          marginLeft: '5px',
                        }"
                        icon="align-justify"
                        title="Thay đổi thứ tự"
                      />
                    </b-button>
                    <b-button @click="openEdit(item)" variant="link">
                      <font-awesome-icon
                        :style="{
                          color: '#2A6EBB',
                          cursor: 'pointer',
                          marginLeft: '5px',
                        }"
                        icon="edit"
                        title="Cập nhật"
                      />
                    </b-button>
                    <b-button @click="openDelete(item)" variant="link">
                      <font-awesome-icon
                        :style="{
                          color: '#2A6EBB',
                          cursor: 'pointer',
                          marginLeft: '5px',
                        }"
                        icon="trash"
                        title="Xóa nhóm"
                      />
                    </b-button>
                  </div>
                </td>
              </tr>
            </draggable>
          </table>
        </div>
      </b-tab>
      <b-tab
        :active="activeTab === 2"
        @click="changeCurrentTab(2)"
        title="Cán bộ trực thuộc"
      >
        <div class="box box-form">
          <DanhSachCanBo :idDonViCha="Number.parseInt($route.params.id)" @canBoSuccess="layChiTietDonVi"/>
        </div>
      </b-tab>
    </b-tabs>
    <ModalConfirm :title="donViDaChon.tenDonVi" @confirmed="xoaDonVi" id="modal-confirm-donvi"/>
    <ModalCapNhatDonVi :data="donViDaChon"
                       :is-edit.sync="isEdit"
                       :is-editParent.sync="isEditParent"
                       :parent-id="parentId"
                       @hidden="hidden"
                       @success="onModalSuccess(isEditParent)"/>
  </div>
</template>

<script>
  import CayDonVi from "@/components/common/CayDonVi";
  import ModalConfirm from "@/components/modal/ModalConfirm";
  import ModalCapNhatDonVi from "./ModalCapNhatDonVi";
  import DanhSachCanBo from "@/components/pages/quan-ly-danh-muc/can-bo/DanhSachCanBo";
  import {HUY_BO_BUTTON_LABEL, PERMISSION_NAME, ROUTE_NAME} from "@/constants/constants";
  import {hasPermission} from "@/utils/permissionUtils";
  import {mapGetters} from "vuex";
  import draggable from "vuedraggable";

  export default {
    name: "TaoCanBo",
    components: {
      draggable,
      DanhSachCanBo,
      ModalConfirm,
      ModalCapNhatDonVi
    },
    props: {
      // isEdit: {
      //   type: Boolean,
      //   default: false
      // },
      onlyView: {
        type: Boolean,
        default: false
      }
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
        isEdit: false,
        isEditParent: false,
        parentId: null
      };
    },
    computed: {
      ...mapGetters({
        permissions: "common/permissions",
        user: "common/user",
        dsDonViCon: "donVi/danhSachDonViCon",
        danhSachDonViCon: "donVi/danhSachDonViCon",
        danhSachDonViPhanTrang: "donVi/danhSachDonViPhanTrang"
      }),
      notDisplay() {
        return (hasPermission(this.permissions, this.PERMISSION_NAME.QUAN_TRI_DON_VI_GOC) && this.form.id == this.user.donViGoc.id)
      },
      idDonViCha() {
        return hasPermission(this.permissions, this.PERMISSION_NAME.QUAN_TRI_DON_VI_GOC) && !this.isEdit && !this.onlyView ? this.user.donViGoc.id : 1
      },
      hasPermissionCreate() {
        return hasPermission(this.permissions, this.PERMISSION_NAME.DON_VI.THEM)
      },
      hasPermissionEdit() {
        return hasPermission(this.permissions, this.PERMISSION_NAME.DON_VI.SUA)
      },
    },
    async created() {
      if (this.isEdit || this.onlyView) {
        await this.layChiTietDonVi();
        await this.layDanhSachDonViCon(this.$route.params.id);
      } else {
        this.form.iD_DonVi_Cha = this.$route.query.idDonViCha || 1;
      }
    },
    methods: {
      hidden() {
        this.isEdit = false;
        this.isEditParent = false
      },
      themDonViCon(idDonViCha) {
        this.isEdit = false;
        this.parentId = idDonViCha;
        this.$bvModal.show("modal-cap-nhat-don-vi");
      },
      onModalSuccess(isEditParent) {
        if (isEditParent) {
          this.layChiTietDonVi();
        } else {
          this.layDanhSachDonViCon(this.$route.params.id);
        }
      },
      openEdit(item, editParent = false) {
        this.donViDaChon = item;
        this.isEdit = true;
        this.isEditParent = editParent
        this.parentId = null
        this.$bvModal.show("modal-cap-nhat-don-vi");
      },
      openDelete(item) {
        this.donViDaChon = item;
        this.$bvModal.show("modal-confirm-donvi");
      },
      xoaDonVi(confirm) {
        if (confirm) {
          this.$store.dispatch("donVi/xoaDonVi", {
            data: {id: this.donViDaChon.id},
            onSuccess: this.onSuccessDelete
          });
          this.$bvModal.hide("modal-confirm-donvi");
        }
      },
      onSuccessDelete() {
        this.layDanhSachDonViCon(this.$route.params.id);
      },
      layDanhSachTheoDonViCha(id) {
        this.$store.dispatch("donVi/layDanhSachTheoDonViCha", {
          idDonViCha: id,
          soCap: 1
        });
        this.idDaChon = id;
      },
      capNhatThuTuDonVi() {
        let listUpdate = [];
        this.items.forEach(function (item, index) {
          listUpdate.push({Id: item.id, ThuTu: index + 1});
        });
        let payload = new FormData();
        payload.append("arrangeRequest", JSON.stringify(listUpdate));
        this.$store.dispatch("donVi/capNhatThuTu", {
          data: payload
          // onSuccess: null
        });
      },
      changeCurrentTab(tab) {
        this.activeTab = tab;
      },
      getValidationState({dirty, validated, valid = null}) {
        return dirty || validated ? valid : null;
      },
      layDanhSachDonViCon(parentId = null) {
        return this.$store
          .dispatch("donVi/layDanhSachTheoDonViCha", {
            idDonViCha: parentId,
            soCap: 1
          })
          .then(response => {
            this.listDonViCon = response;
          });
      },
      layChiTietDonVi() {
        this.$store.dispatch("donVi/layChiTietDonVi", {
          data: {
            id: this.$route.params.id
          },
          onSuccess: this.onSuccess
        });
      },
      onSuccess(data) {
        this.form = data;
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
              onSuccess: this.backToDetail
            });
          } else {
            await this.$store.dispatch("donVi/themDonVi", {
              data: data,
              onSuccess: this.backToList
            });
          }
        }
      },
      backToList() {
        this.$router.push({
          name: ROUTE_NAME.QUAN_LY_DANH_MUC.DON_VI.NAME
        });
      },
      backToDetail() {
        this.$router.push({
          name: ROUTE_NAME.QUAN_LY_DANH_MUC.DON_VI.XEM,
          params: {id: this.form.id}
        });
      },
    },
    watch: {
      listDonViCon: {
        handler(value) {
          this.items = value;
        }
      }
    }
  };
</script>
