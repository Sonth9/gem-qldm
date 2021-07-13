<template>
  <div>
    <form @submit.prevent>
      <b-form-group class="border-bottom-form" label-for="filterBy">
        <div class="row">
          <div class="col-sm-4">
            <b-form-input
              @blur="layNguoiDungGomQuyenPhanTrang"
              @keyup="layNguoiDungGomQuyenPhanTrang"
              @keyup.enter="layNguoiDungGomQuyenPhanTrang"
              id="filterBy"
              placeholder="Nhập họ tên, tên đăng nhập"
              required
              type="text"
              v-model="requestInformation.filterBy"
            />
          </div>
          <div class="col-sm-4">

          </div>
          <div class="col-sm-4">
            <b-button
              @click="moFormThemCanBoVaoNguoiDung"
              class="btn search-information-btn d-block float-right mb-3"
            >
              THÊM
            </b-button>
          </div>
        </div>
      </b-form-group>
    </form>
    <div class="box-form-result">
      <p class="color-gray-1">Tìm thấy {{ totalRows }} kết quả</p>
      <b-table
        :busy="isLoadingTable"
        :fields="fieldName"
        :items="nguoiDungGomQuyenNoiBo"
        :no-local-sorting="true"
        bordered
        responsive
        striped
        v-if="hasPageData"
      >
        <template v-slot:head()="scope">
          <div class="d-inline-block">
            {{ scope.label }}
          </div>
        </template>
        <template v-slot:cell(userName)="row">
          <router-link
            :to="`${ROUTE_NAME.QUAN_TRI_HE_THONG.NGUOI_DUNG}/${row.item.id}/xem`"
          >
            {{ row.item.userName }}
          </router-link>
        </template>
        <template v-slot:table-colgroup="scope">
          <col
            :key="field.key"
            :style="{
              width: ['stt'].includes(field.key)
                ? '50px'
                : ['thaoTac'].includes(field.key)
                ? '90px'
                : '',
            }"
            v-for="field in scope.fields"
          />
        </template>

        <template v-slot:cell(vaiTro)="row">
          <div :key="index" v-for="(group, index) in row.item.vaiTro">
            <router-link
              :to="`${ROUTE_NAME.QUAN_TRI_HE_THONG.VAI_TRO}/${group.id}`"
            >
              {{ group.displayName }}
            </router-link>
          </div>
        </template>
        <template v-slot:cell(trangThai)="row">
          <div :key="index" v-for="(group, index) in row.item.trangThai">
            <router-link
              :to="`${ROUTE_NAME.QUAN_TRI_HE_THONG.VAI_TRO}/${group.Id}`"
            >
              {{ group.name }}
            </router-link>
          </div>
          <b-form-checkbox
            :checked="row.item.trangThai"
            @change="handleChangeTrangThai(row.item.id)"
            switch
            v-model="row.item.trangThai"
          ></b-form-checkbox>
        </template>
        <template v-slot:table-busy>
          <BaseLoadingTable />
        </template>
      </b-table>
      <BaseEmptyTable :header-table="emptyHeaderTable" v-else />
    </div>
    <BasePagination
      :current-page="requestInformation.pageIndex"
      :total-pages="totalPages"
      :total-rows="totalRows"
      @changeNum="onChangeNum($event)"
      @changePages="onChangePages($event)"
    />
    <ModalThemCanBoVaoNguoiDung :isUser="false" :showModalCanBo="showModalCanBo" @close="showModalCanBo = false"
                                @themCanBo="themCanBo" title="Thêm cán bộ vào người dùng" />

    <ModalConfirm
      :title="chonNguoiDungXoa && chonNguoiDungXoa.userName"
      @confirmed="xoaNguoiDung"
    />
  </div>
</template>

<script>
  import BasePagination from "@/components/common/BasePagination";
  import BaseLoadingTable from "@/components/common/BaseLoadingTable";
  import BaseEmptyTable from "@/components/common/BaseEmptyTable";
  import ModalThemCanBoVaoNguoiDung from "@/components/modal/ModalThemCanBoVaoDanhSach";
  import ModalConfirm from "@/components/modal/ModalConfirm";
  import { CAP_NHAT_ACTIVE_NGUOI_DUNG, THEM_CAN_BO_VAO_NGUOI_DUNG } from "@/constants/message";
  import { BANG_NGUOI_DUNG, PERMISSION_NAME, PERMISSION_ROLE, ROUTE_NAME, } from "@/constants/constants";
  import { hasPermission } from "@/utils/permissionUtils";
  import { mapGetters } from "vuex";
  import _isEmpty from "lodash/isEmpty";
  import _isNil from "lodash/isNil";

  export default {
    name: "QuanLyNguoiDung",
    components: {
      BasePagination,
      BaseLoadingTable,
      BaseEmptyTable,
      ModalThemCanBoVaoNguoiDung,
      ModalConfirm,
    },
    data() {
      return {
        ROUTE_NAME: ROUTE_NAME,
        idDonViCha: "1",
        optionsDonVi: [],
        chonNguoiDungXoa: null,
        showModalCanBo: false,
        requestInformation: {
          filterBy: "",
          donVi: this.idDonViCha || 1,
          pageSize: 10,
          pageIndex: 1,
        },
        totalPages: 0,
        totalRows: 0,
        isLoadingTable: true,
        thongTinTraCuuNguoiPhanAnh: {},
        emptyHeaderTable: [
          BANG_NGUOI_DUNG.stt,
          BANG_NGUOI_DUNG.userName,
          BANG_NGUOI_DUNG.name,
          BANG_NGUOI_DUNG.donVi,
          BANG_NGUOI_DUNG.vaiTro,
          BANG_NGUOI_DUNG.trangThai,
        ],
      };
    },
    computed: {
      ...mapGetters({
        nguoiDungGomQuyen: "user/nguoiDungGomQuyen",
        danhSachQuyenTheoNguoiDung: "permission/danhSachQuyenTheoNguoiDung",
      }),
      nguoiDungGomQuyenNoiBo() {
        return this.layNguoiDungGomQuyenNoiBo(this.nguoiDungGomQuyen);
      },
      fieldName() {
        return this.getFieldName();
      },
      hasPageData() {
        return !_isEmpty(this.nguoiDungGomQuyen.items);
      },
      hasUpdatePermission() {
        return hasPermission(
          this.danhSachQuyenTheoNguoiDung.items,
          PERMISSION_NAME.QUAN_TRI_HE_THONG,
          PERMISSION_ROLE.CAP_NHAT
        );
      },
    },
    watch: {
      nguoiDungGomQuyen: {
        handler() {
          this.totalPages = this.nguoiDungGomQuyen.totalPage;
          this.totalRows = _isNil(this.nguoiDungGomQuyen.totalCount)
            ? 0
            : this.nguoiDungGomQuyen.totalCount;
        },
        immediate: true,
      },
      "requestInformation.pageIndex": {
        handler() {
          this.layNguoiDungGomQuyenPhanTrang();
        },
      },
    },
    created() {
      this.layNguoiDungGomQuyenPhanTrang();
    },
    methods: {
      onChangeNum(pageSize) {
        this.requestInformation.pageIndex = 1;
        this.requestInformation.pageSize = pageSize;
        this.layNguoiDungGomQuyenPhanTrang();
      },
      onChangePages(page) {
        this.requestInformation.pageIndex = page;
      },
      layNguoiDungGomQuyenPhanTrang() {
        this.isLoadingTable = true;
        this.$store
          .dispatch("user/layNguoiDungGomQuyen", this.requestInformation)
          .then(() => {
            this.isLoadingTable = false;
          });
      },
      layNguoiDungGomQuyenNoiBo(nguoiDungGomQuyen) {
        if (_isEmpty(nguoiDungGomQuyen.items)) {
          return [];
        }
        return nguoiDungGomQuyen.items.map((item, index) => {
          return {
            stt:
              (this.requestInformation.pageIndex - 1) *
              this.requestInformation.pageSize +
              index +
              1,
            canBoId: _isNil(item.canBo.id) ? "" : item.canBo.id,
            id: _isNil(item.id) ? "" : item.id,
            userName: _isNil(item.canBo.userName) ? "" : item.canBo.userName,
            name: _isNil(item.canBo.hoTen) ? "" : item.canBo.hoTen,
            email: _isNil(item.canBo.email) ? "" : item.canBo.email,
            donVi: _isNil(item.donVi.tenDonVi) ? "" : item.donVi.tenDonVi,
            vaiTro: _isNil(item.vaiTro) ? 0 : item.vaiTro,
            trangThai: _isNil(item.trangThai) ? "" : item.trangThai,
            // thaoTac: "thaoTac",
          };
        });
      },
      getFieldName() {
        if (_isEmpty(this.nguoiDungGomQuyenNoiBo)) {
          return [];
        }
        return Object.keys(this.nguoiDungGomQuyenNoiBo[0])
          .filter((key) => key !== "id" && key !== "canBoId")
          .map((key) => {
            return {
              key: key,
              label: BANG_NGUOI_DUNG[key],
              tdClass: ["stt"].includes(key) ? "center" : "",
            };
          });
      },
      handleChangeTrangThai(id) {
        const payload = {
          ids: [id]
        }
        this.$store.dispatch("user/capNhatActiveNguoiDung", payload)
          .then((res) => {
            if (res.data.succeeded) {
              this.$toasted.clear();
              this.$toasted.global.showSuccessMessage({
                message: CAP_NHAT_ACTIVE_NGUOI_DUNG
              });
            }
          });
      },
      xoaNguoiDung(confirm) {
        if (confirm) {
          this.$bvModal.hide("modal-confirm");
          const payload = {
            ids: [this.chonNguoiDungXoa.canBoId],
          };
          this.$store
            .dispatch("canBo/xoaNguoiDung", payload)
            .then(() => this.layNguoiDungGomQuyenPhanTrang());
        }
      },
      moFormThemCanBoVaoNguoiDung() {
        this.$bvModal.show("modal-them-can-bo-vao-danh-sach");
        this.showModalCanBo = !this.showModalCanBo;
      },
      themCanBo(data) {
        if (data) {
          const $vm = this;
          $vm.$store
            .dispatch("canBo/themCanBoVaoNguoiDung", {
              ids: data
            })
            .then(() => {
              $vm.layNguoiDungGomQuyenPhanTrang();
              $vm.$toasted.clear();
              $vm.$toasted.global.showSuccessMessage({
                message: THEM_CAN_BO_VAO_NGUOI_DUNG
              });
            })
          $vm.$bvModal.hide("modal-them-can-bo-vao-danh-sach");

        }
      },

    },
  };
</script>

<style scoped>
</style>
