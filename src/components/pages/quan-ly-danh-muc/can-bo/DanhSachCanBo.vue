<template>
  <div>
    <b-form-group class="border-bottom-form">
      <b-row align-v="center" class="pb-3">
        <b-col cols="3">
          <b-form @submit.prevent="layDanhSachCanBoPhanTrang(true)">
            <b-form-input
              class="border-radius-4"
              id="search"
              placeholder="Nhập tên cán bộ, email, tên đăng nhập, mã cán bộ"
              trim
              type="text"
              v-model="searchForm.keyword"
            ></b-form-input>
          </b-form>
        </b-col>
        <b-col cols="4">
          <CayDonVi :idDonViCha="idDonViCha"
                    @input="layDanhSachCanBoPhanTrang(true)"
                    v-model="searchForm.donVi"/>
          <!--          <CayDonVi :path="idDonViCha" @input="layDanhSachCanBoPhanTrang(true)" v-model="searchForm.donVi"/>-->
        </b-col>
        <b-col align="end">
          <b-button @click="openCreate" v-if="hasPermissionCreate" variant="info">
            <b-icon icon="plus"></b-icon>
            Thêm mới
          </b-button>
        </b-col>
      </b-row>
    </b-form-group>
    <form>
      <div class="box-form-result">
        <p class="color-gray-1">
          Tìm thấy {{ danhSachCanBo.totalCount }} kết quả
        </p>
        <b-table
          :fields="fieldNames"
          :items="danhSachCanBo.items"
          :no-local-sorting="true"
          bordered
          ref="canBoTable"
          responsive
          striped
        >
          <template v-slot:head()="scope">
            <div class="center">
              <span v-html="scope.label"></span>
            </div>
          </template>
          <template v-slot:table-colgroup="scope">
            <col
              :key="field.key"
              :style="{ width: field.key === 'stt' ? '1%' : '' }"
              v-for="field in scope.fields"
            />
          </template>
          <template #cell(stt)="row">
            {{ row.index + row.value }}
          </template>
          <template v-slot:cell(hoTen)="row">
            <router-link
              :to="`${ROUTE.QUAN_LY_DANH_MUC.NAME}${
                idDonViCha == 1
                  ? ROUTE.QUAN_LY_DANH_MUC.HO_SO_CAN_BO.NAME
                  : ROUTE.QUAN_LY_DANH_MUC.HO_SO_CAN_BO.XEM_THUOC_DON_VI_NAME
              }/${row.item.id}`"
            >
              {{ row.item.hoTen }}
            </router-link>
          </template>
          <template #cell(anhDaiDien_FilePath)="row">
            <b-avatar :src="row.value" rounded size="lg"></b-avatar>
          </template>
          <template #cell(thaoTac)="row">
            <div class="text-center">
              <b-button @click="openEdit(row.item)" v-if="hasPermissionEdit" variant="link">
                <font-awesome-icon
                  :style="{
                    color: '#2A6EBB',
                    cursor: 'pointer',
                    marginLeft: '5px',
                  }"
                  icon="edit"
                  title="Cập nhật cán bộ"
                />
              </b-button>
              <b-button @click="openDelete(row.item)" v-if="hasPermissionDelete" variant="link">
                <font-awesome-icon
                  :style="{
                    color: '#2A6EBB',
                    cursor: 'pointer',
                    marginLeft: '5px',
                  }"
                  icon="trash"
                  title="Xóa cán bộ"
                />
              </b-button>
            </div>
          </template>
        </b-table>
      </div>
      <BasePagination
        :current-page="danhSachCanBo.pageIndex"
        :total-pages="danhSachCanBo.totalPage"
        :total-rows="danhSachCanBo.totalCount"
        @changeNum="onChangeNum($event)"
        @changePages="onChangePages($event)"
      />
    </form>
    <ModalConfirm :title="canBoDaChon.hoTen" @confirmed="xoaCanBo"/>
    <modal-cap-nhat-can-bo :data="canBoDaChon" :is-edit.sync="isEdit" :parent-id="idDonViCha" @hidden="isEdit=false"
                           @success="onSuccess"/>

  </div>
</template>

<script>
  import BasePagination from "@/components/common/BasePagination";
  import CayDonVi from "@/components/common/CayDonVi";
  import ModalConfirm from "@/components/modal/ModalConfirm";
  import { PERMISSION_NAME, ROUTE_NAME } from "@/constants/constants";
  import { hasPermission } from "@/utils/permissionUtils";
  import { mapGetters } from "vuex";
  import ModalCapNhatCanBo from "./ModalCapNhatCanBo";

  export default {
    name: "DanhSachCanBo",
    components: {
      BasePagination,
      CayDonVi,
      ModalConfirm,
      ModalCapNhatCanBo
    },
    props: {
      idDonViCha: {
        type: Number,
        default: 1
      }
    },
    data() {
      return {
        ROUTE: ROUTE_NAME,
        PERMISSION_NAME: PERMISSION_NAME,
        searchForm: {
          keyword: "",
          donVi: this.idDonViCha || 1,
        },
        hoSoDaChon: null,
        isEdit: false,
        optionsDonVi: [],
        canBoDaChon: {},
        fieldNames: [
          {
            key: "stt",
            label: "STT",
            class: "fit-column center",
            formatter: () => {
              return (
                (this.danhSachCanBo.pageIndex - 1) * this.danhSachCanBo.pageSize +
                1
              );
            }
          },
          {
            key: "anhDaiDien_FilePath",
            label: "Ảnh đại diện",
            class: "fit-column center"
          },
          {
            key: "hoTen",
            label: "Họ tên cán bộ",
            class: "fit-column"
          },
          {
            key: "userName",
            label: "Tên đăng nhập",
            class: "fit-column"
          },
          {
            key: "maCanBo",
            label: "Mã cán bộ",
            class: "fit-column "
          },
          {
            key: "chucVu",
            label: "Chức vụ",
            class: "fit-column"
          },
          {
            key: "donVi",
            label: "Đơn Vị",
            class: "fit-column"
          },
          {
            key: "email",
            label: "Email",
            class: "fit-column"
          },
          {
            key: "thaoTac",
            label: "Thao tác",
            class: "center fit-column"
          }
        ]
      };
    },
    computed: {
      ...mapGetters({
        user: "common/user",
        permissions: "common/permissions",
        chiTietCanBo: "canBo/canBo",
        danhSachCanBo: "canBo/danhSachCanBo",
        danhSachDonViSelect: "donVi/danhSachDonViSelect",
        danhSachDonViCon: "donVi/danhSachDonViCon"
      }),
      hasPermissionCreate() {
        return this.checkAuth(PERMISSION_NAME.CAN_BO.THEM)
      },
      hasPermissionEdit() {
        return this.checkAuth(PERMISSION_NAME.CAN_BO.SUA)
      },
      hasPermissionDelete() {
        return this.checkAuth(PERMISSION_NAME.CAN_BO.XOA)
      }

    },
    created() {
      if (this.idDonViCha == 1 && !this.checkAuth(PERMISSION_NAME.QUAN_TRI_DON_VI_GOC) && !this.checkAuth(PERMISSION_NAME.QUAN_TRI_HE_THONG)) {
        this.idDonViCha = this.user.donViTrucThuoc.id
      }

      if (this.idDonViCha == 1 && this.checkAuth(PERMISSION_NAME.QUAN_TRI_DON_VI_GOC) && !this.checkAuth(PERMISSION_NAME.QUAN_TRI_HE_THONG)) {
        this.idDonViCha = this.user.donViGoc.id
      }
    },
    methods: {
      layDanhSachCanBoPhanTrang(resetPage = false) {
        if (resetPage) {
          this.danhSachCanBo.pageIndex = 1;
          this.danhSachCanBo.pageSize = 10;
        }
        let payload = {
          PageIndex: this.danhSachCanBo.pageIndex,
          PageSize: this.danhSachCanBo.pageSize
        };

        if (this.searchForm.keyword) {
          payload = Object.assign(payload, {FilterBy: this.searchForm.keyword});
        }
        if (this.searchForm.donVi) {
          payload = Object.assign(payload, {ID_DonVi: this.searchForm.donVi});
        }
        this.$store.dispatch("canBo/layDanhSachCanBo", payload);
      },
      onChangeNum(pageSize) {
        this.danhSachCanBo.pageIndex = 1;
        this.danhSachCanBo.pageSize = pageSize;
        this.layDanhSachCanBoPhanTrang();
      },
      onChangePages(page) {
        this.danhSachCanBo.pageIndex = page;
        this.layDanhSachCanBoPhanTrang();
      },
      openCreate() {
        this.isEdit = false;
        this.$bvModal.show("modal-cap-nhat-can-bo");
      },
      async openEdit(item) {
        this.canBoDaChon = item;
        this.isEdit = true;
        this.$bvModal.show("modal-cap-nhat-can-bo");
      },
      openDelete(item) {
        this.canBoDaChon = item;
        this.$bvModal.show("modal-confirm");
      },
      xoaCanBo(confirm) {
        if (confirm) {
          this.$store.dispatch("canBo/xoaCanBo", {
            data: {id: this.canBoDaChon.id},
            onSuccess: this.onSuccess
          });
          this.$bvModal.hide("modal-confirm");
        }
      },
      onSuccess() {
        this.layDanhSachCanBoPhanTrang();
        this.$emit('canBoSuccess')
      },
      checkAuth(permission) {
        return hasPermission(this.permissions, permission)
      }
    },
    watch: {
      "searchForm.keyword": {
        handler(val) {
          if (!val) {
            this.layDanhSachCanBoPhanTrang(true);
          }
        }
      },
    }
  };
</script>

<style scoped>
</style>
