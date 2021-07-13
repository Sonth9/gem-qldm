<template>
  <div>
    <form @submit.prevent>
      <div class="row">
        <b-form-group class="border-bottom-form col-sm-6" label-for="filterBy">
          <b-form-input
            @keyup.enter="timDanhSachNguoiDung"
            id="filterBy"
            placeholder="Nhập họ tên, tên đăng nhập"
            required
            type="text"
            v-model="requestInformation.filterBy"
          />
        </b-form-group>
        <b-form-group class="col-sm-6 border-bottom-form">
          <div class="float-right ml-2" v-if="!readonly">
            <b-button
              @click="moFormThemDanhSachNguoiDung()"
              class="btn search-information-btn d-block float-right mb-3 mr-2"
            >
              Thêm
            </b-button>
            <b-button
              :disabled="danhSachIdNguoiDungDaChon.length === 0"
              @click="xoaDanhSachNguoiDung()"
              class="btn search-information-btn d-block float-right mb-3 mr-2"
            >
              Xóa người dùng đã chọn
            </b-button>
          </div>
          <b-button
            @click="timDanhSachNguoiDung()"
            class="btn search-information-btn d-block float-right mb-3"
          >
            TÌM KIẾM
          </b-button>
        </b-form-group>
      </div>
    </form>
    <div class="box-form-result">
      <p class="color-gray-1">Tìm thấy {{ totalRows }} kết quả</p>
      <b-table
        :busy="isLoadingTable"
        :fields="fieldName"
        :items="danhSachNguoiDungNoiBo"
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
        <template v-slot:head(checkbox)="scope">
          <b-form-checkbox
            :unchecked-value="false"
            :value="true"
            id="check-all-items"
            name="checkbox_all_items"
            v-model="selectAllRowsInPage"
          >
            {{ scope.label }}
          </b-form-checkbox>
        </template>
        <template v-slot:cell(thaoTac)="row">
          <div class="text-center">
            <font-awesome-icon
              :style="{ color: '#2A6EBB', cursor: 'pointer' }"
              @click="xoaNguoiDung(row.item.id)"
              icon="trash-alt"
              title="Xóa người dùng trong vai trò"
            />
          </div>
        </template>
        <template v-slot:cell(checkbox)="row">
          <b-form-checkbox
            :value="row.item.id"
            name="selected-rows"
            v-model="danhSachIdNguoiDungDaChon"
          >
          </b-form-checkbox>
        </template>
        <template v-slot:table-colgroup="scope">
          <col
            :key="field.key"
            :style="{
              width: ['stt', 'checkbox'].includes(field.key)
                ? '50px'
                : ['thaoTac'].includes(field.key)
                ? '90px'
                : '',
            }"
            v-for="field in scope.fields"
          />
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
    <XoaNguoiDungModal
      @xoaDanhSachNguoiDungTrongVaiTro="xoaDanhSachNguoiDungTrongVaiTro"
    />
    <b-modal
      :hide-footer="true"
      id="them-nguoi-dung-modal"
      size="xl"
      title="Danh sách người dùng hệ thống"
    >
      <DanhSachNguoiDungHeThong
        :chiTietVaiTro="chiTietVaiTro"
        :key="`he-thong-${vaiTroId}`"
        @layDanhSachNguoiDungTheoVaiTro="layDanhSachNguoiDungTheoVaiTro"
        ref="danhSachNguoiDungHeThong"
      />
    </b-modal>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import _isEmpty from "lodash/isEmpty";
  import _cloneDeep from "lodash/cloneDeep";
  import _isNil from "lodash/isNil";
  import { LOI_CHUA_CHON_NGUOI_DUNG, XOA_NGUOI_DUNG_THANH_CONG } from "@/constants/message";
  import QuanLyNguoiDung from "@/mixins/QuanLyNguoiDung";
  import XoaNguoiDungModal from "@/components/pages/quan-tri-he-thong/nguoi-dung/XoaNguoiDungModal";
  import DanhSachNguoiDungHeThong
    from "@/components/pages/quan-tri-he-thong/nguoi-dung/DanhSachNguoiDungKhongThuocVaiTro";
  import { NO_RESULTS_TEXT, TREE_SELECT_PLACEHOLDER } from "@/constants/constants";

  export default {
    name: "DanhSachNguoiDungTheoVaiTro",
    mixins: [QuanLyNguoiDung],
    components: {
      XoaNguoiDungModal,
      DanhSachNguoiDungHeThong,
    },
    data() {
      return {
        NO_RESULTS_TEXT: NO_RESULTS_TEXT,
        TREE_SELECT_PLACEHOLDER: TREE_SELECT_PLACEHOLDER,
        danhSachIdNguoiDungMuonXoa: [],
        vaiTroId: null,
        options: []
      };
    },
    computed: {
      ...mapGetters({
        danhSachNguoiDung: "role/danhSachNguoiDungTheoVaiTro"
      })
    },
    methods: {
      xoaNguoiDung(nguoiDungId) {
        this.danhSachIdNguoiDungMuonXoa = [nguoiDungId];
        this.$bvModal.show("xoa-nguoi-dung");
      },
      moFormThemDanhSachNguoiDung() {
        this.$bvModal.show("them-nguoi-dung-modal");
      },
      xoaDanhSachNguoiDung() {
        if (
          _isEmpty(this.danhSachNguoiDungDaChon) ||
          this.danhSachNguoiDungDaChon.length === 0
        ) {
          this.$toasted.clear();
          this.$toasted.global.showErrorMessage({
            message: LOI_CHUA_CHON_NGUOI_DUNG
          });
          return;
        }
        this.danhSachIdNguoiDungMuonXoa = _cloneDeep(
          this.danhSachIdNguoiDungDaChon
        );
        this.$bvModal.show("xoa-nguoi-dung");
      },
      xoaDanhSachNguoiDungTrongVaiTro() {
        const $vm = this;
        const payload = {
          userIds: [],
          deleteUserIds: this.danhSachIdNguoiDungMuonXoa,
          id: this.vaiTroId
        };
        this.$store
          .dispatch("role/capNhatNguoiDungTrongVaiTro", payload)
          .then(() => {
            $vm.layDanhSachNguoiDung();
            $vm.$toasted.clear();
            $vm.$toasted.global.showSuccessMessage({
              message: XOA_NGUOI_DUNG_THANH_CONG
            });
          })
          .catch(error => {
            $vm.$toasted.clear();
            if (
              !_isEmpty(error.response) &&
              error.response.data.Errors.length > 0
            ) {
              $vm.$toasted.global.showErrorMessage({
                message: error.response.data.Errors[0].Description
              });
            }
          });
      },
      layDanhSachNguoiDungTheoVaiTro() {
        this.selectAllRowsInPage = false
        this.layDanhSachNguoiDung()
      },
      layDanhSachNguoiDung() {
        const payload = {
          ...this.requestInformation,
          id: this.vaiTroId
        };
        this.isLoadingTable = true;
        this.$store
          .dispatch("role/layDanhSachNguoiDungTheoVaiTro", payload)
          .then(() => {
            this.isLoadingTable = false;
          });
      },
      layDanhSachNguoiDungNoiBo(danhSachNguoiDung) {
        if (_isEmpty(danhSachNguoiDung.items)) {
          return [];
        }
        return danhSachNguoiDung.items.map((item, index) => {
          return {
            checkbox: null,
            stt:
              (this.requestInformation.pageIndex - 1) *
              this.requestInformation.pageSize +
              index +
              1,
            id: _isNil(item.id) ? "" : item.id,
            userName: _isNil(item.userName) ? "" : item.userName,
            name: _isNil(item.name) ? "" : item.name,
            email: _isNil(item.email) ? "" : item.email,
            thaoTac: "thaoTac"
          };
        });
      }
    }
  };
</script>

<style scoped>
</style>
