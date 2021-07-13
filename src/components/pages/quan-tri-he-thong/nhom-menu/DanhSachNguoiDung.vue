<template>
  <div>
    <b-form-group class="border-bottom-form">
      <b-row align-v="center" class="pb-3">
        <b-col cols="3">
          <b-form @submit.prevent="layDanhSachNguoiDungNhomMenu()">
            <b-form-input
              class="border-radius-4"
              placeholder="Nhập tên người dùng, tên đăng nhập"
              trim
              type="text"
              v-model="searchForm.keyword"
            ></b-form-input>
          </b-form>
        </b-col>

        <b-col align="end">
          <b-button @click="openCreate" variant="info" v-if="hasPermissionCanBo">
            Thêm
          </b-button>
        </b-col>
      </b-row>
    </b-form-group>
    <form>
      <div class="box-form-result">
        <p class="color-gray-1">
          Tìm thấy {{ nguoiDungNhomMenu.totalCount }} kết quả
        </p>
        <b-table
          :fields="fieldNames"
          :items="nguoiDungNhomMenu.items"
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
              :style="{ width: field.key === 'stt' ? '3%' : '' }"
              v-for="field in scope.fields"
            />
          </template>
          <template #cell(stt)="row">
            {{ row.index + 1 }}
          </template>

          <template #cell(thaoTac)="row">
            <div class="text-center">
              <b-button @click="openDelete(row.item)" variant="link">
                <font-awesome-icon
                  :style="{
                    color: '#2A6EBB',
                    cursor: 'pointer',
                    marginLeft: '5px',
                  }"
                  icon="trash"
                  title="Xóa người dùng"
                />
              </b-button>
            </div>
          </template>
        </b-table>
      </div>
    </form>
    <ModalConfirm :title="nguoiDungDaChon.hoTen" @confirmed="xoaNguoiDung" />
    <ModalThemCanBoVaoMenu :nhom-quyen-id="idNhomQuyen" @themCanBo="themCanBo" title="Thêm người dùng vào nhóm quyền" v-if="hasPermissionCanBo"/>
  </div>
</template>

<script>
  import ModalConfirm from "@/components/modal/ModalConfirm";
  import ModalThemCanBoVaoMenu from "@/components/modal/ModalThemCanBoVaoDanhSach";
  import { mapGetters } from "vuex";
  import { hasPermission } from '../../../../utils/permissionUtils';
  import { PERMISSION_NAME } from "../../../../constants/constants";

  export default {
    name: "DanhSachNguoiDung",
    components: {
      ModalConfirm,
      ModalThemCanBoVaoMenu
    },
    props: {
      idNhomQuyen: String
    },
    data() {
      return {
        PERMISSION_NAME:PERMISSION_NAME,
        fieldNames: [
          {
            key: "stt",
            label: "STT",
            class: "fit-column center"
          },
          {
            key: "hoTen",
            label: "Họ và tên",
          },
          {
            key: "userName",
            label: "Tên đăng nhập",
          },
          {
            key: "thaoTac",
            label: "Thao tác",
            class: "center fit-column"
          }
        ],
        nguoiDungDaChon: {
          hoTen: ""
        },
        searchForm: {
          keyword: "",
          idDonVi: null
        }
      };
    },
    computed: {
      ...mapGetters({
        permissions: "common/permissions",
        nguoiDungNhomMenu: "dmNhomMenu/nguoiDungNhomMenu"
      }),
      hasPermissionCanBo(){
        return hasPermission(this.permissions,this.PERMISSION_NAME.CAN_BO.XEM)
      }
    },
    methods: {
      layDanhSachNguoiDungNhomMenu() {
        let payload = {
          NhomQuyenId: this.idNhomQuyen,
          PageIndex: 1,
          PageSize: 100
        };
        if (this.searchForm.keyword) {
          payload = Object.assign(payload, {FilterBy: this.searchForm.keyword});
        }
        this.$store.dispatch("dmNhomMenu/layNguoiDungNhomMenu", payload);
      },
      openCreate() {
        this.$bvModal.show("modal-them-can-bo-vao-danh-sach");
      },
      openDelete(item) {
        this.nguoiDungDaChon = item;
        this.$bvModal.show("modal-confirm");
      },
      themCanBo(data) {
        if (data) {
          this.$store.dispatch("dmNhomMenu/themNguoiDung", {
            data: {canBoId: data.join(), nhomQuyenId: this.idNhomQuyen},
            onSuccess: this.onSuccess
          });
          this.$bvModal.hide("modal-them-can-bo-vao-danh-sach");
        }
      },
      xoaNguoiDung(confirm) {
        if (confirm) {
          this.$store.dispatch("dmNhomMenu/xoaNguoiDung", {
            data: {
              "nhomQuyenId": this.idNhomQuyen,
              "canBoId": this.nguoiDungDaChon.id
            },
            onSuccess: this.onSuccess
          });
          this.$bvModal.hide("modal-confirm");
        }
      },
      onSuccess() {
        this.layDanhSachNguoiDungNhomMenu()
      }
    },
    watch: {
      idNhomQuyen: {
        handler() {
          this.layDanhSachNguoiDungNhomMenu()
        }
      }
    }
  };
</script>

<style scoped>
</style>
