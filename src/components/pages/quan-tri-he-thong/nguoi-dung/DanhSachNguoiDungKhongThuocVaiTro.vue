<template>
  <div>
    <form @submit.prevent>
      <b-form-group class="border-bottom-form" label-for="filterBy">
        <div class="row">
          <div class="col-md-6 col-xs-12">
            <b-form-input
              @keyup.enter="timDanhSachNguoiDung"
              id="filterBy"
              placeholder="Nhập họ tên, tên đăng nhập"
              required
              type="text"
              v-model="requestInformation.filterBy"
            />
          </div>
          <div class="col-md-6 col-xs-12">
            <b-button
              :disabled="danhSachIdNguoiDungDaChon.length === 0"
              @click="chonDanhSachNguoiDung()"
              class="btn search-information-btn float-right mb-3 ml-2"
            >
              Thêm
            </b-button>
            <b-button
              @click="timDanhSachNguoiDung()"
              class="btn search-information-btn float-right mb-3"
            >
              TÌM KIẾM
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
        :items="danhSachNguoiDungNoiBo"
        :no-local-sorting="true"
        bordered
        responsive
        striped
        v-if="hasPageData"
      >
        <template v-slot:head(checkbox)="scope">
          <b-form-checkbox
            :unchecked-value="false"
            :value="true"
            id="check-all-items-to-add"
            name="checkbox_all_items_to_add"
            v-model="selectAllRowsInPage"
          >
            {{ scope.label }}
          </b-form-checkbox>
        </template>
        <template v-slot:head()="scope">
          <div class="d-inline-block">
            {{ scope.label }}
          </div>
        </template>
        <template v-slot:cell(thaoTac)="row">
          <div class="text-center">
            <font-awesome-icon
              :style="{ color: '#2A6EBB', cursor: 'pointer' }"
              @click="chonNguoiDung(row.item.id)"
              icon="plus"
              title="Thêm người dùng vào vai trò"
            />
          </div>
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
        <template v-slot:cell(checkbox)="row">
          <b-form-checkbox
            :value="row.item.id"
            name="selected-rows"
            v-model="danhSachIdNguoiDungDaChon"
          >
          </b-form-checkbox>
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
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import _isEmpty from "lodash/isEmpty";
  import _isNil from "lodash/isNil";
  import QuanLyNguoiDung from "@/mixins/QuanLyNguoiDung";
  import { LOI_CHUA_CHON_NGUOI_DUNG, THEM_NGUOI_DUNG_VAO_NHOM_THANH_CONG } from "@/constants/message";
  import { NO_RESULTS_TEXT, TREE_SELECT_PLACEHOLDER } from "@/constants/constants";

  export default {
    name: "DanhSachNguoiDungHeThong",
    mixins: [QuanLyNguoiDung],
    components: {},
    data() {
      return {
        NO_RESULTS_TEXT: NO_RESULTS_TEXT,
        TREE_SELECT_PLACEHOLDER: TREE_SELECT_PLACEHOLDER,
        donViId: null
      };
    },
    computed: {
      ...mapGetters({
        danhSachNguoiDung: "role/danhSachNguoiDungKhongThuocVaiTro"
      })
    },
    created() {
      this.layDanhSachNguoiDung();
    },
    methods: {
      chonNguoiDung(nguoiDungId) {
        this.capNhatNguoiDungTrongVaiTro([nguoiDungId]);
      },
      chonDanhSachNguoiDung() {
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
        this.capNhatNguoiDungTrongVaiTro(this.danhSachIdNguoiDungDaChon);
      },
      capNhatNguoiDungTrongVaiTro(danhSachIdNguoiDung) {
        const $vm = this;
        const payload = {
          userIds: danhSachIdNguoiDung,
          deleteUserIds: [],
          id: this.vaiTroId
        };
        this.$store
          .dispatch("role/capNhatNguoiDungTrongVaiTro", payload)
          .then(response => {
            if (response.data.succeeded) {
              $vm.layDanhSachNguoiDung();
              $vm.$emit("layDanhSachNguoiDungTheoVaiTro");
              $vm.$toasted.clear();
              $vm.$toasted.global.showSuccessMessage({
                message: THEM_NGUOI_DUNG_VAO_NHOM_THANH_CONG
              });
            }
            this.$bvModal.hide("them-nguoi-dung-modal");
          });
      },
      layDanhSachNguoiDung() {
        const payload = {
          ...this.requestInformation,
          id: this.vaiTroId
        };
        this.isLoadingTable = true;
        this.$store
          .dispatch("role/layDanhSachNguoiDungKhongThuocVaiTro", payload)
          .then(() => {
            this.isLoadingTable = false;
          });
      },
      layDanhSachNguoiDungNoiBo(nguoiDungGomQuyen) {
        if (_isEmpty(nguoiDungGomQuyen.items)) {
          return [];
        }
        return nguoiDungGomQuyen.items.map((item, index) => {
          return {
            checkbox: true,
            stt:
              (this.requestInformation.pageIndex - 1) *
              this.requestInformation.pageSize +
              index +
              1,
            id: _isNil(item.id) ? "" : item.id,
            userName: _isNil(item.userName) ? "" : item.userName,
            name: _isNil(item.name) ? "" : item.name,
            email: _isNil(item.email) ? "" : item.email,
            groups: _isNil(item.Groups) ? "" : item.Groups
          };
        });
      }
    }
  };
</script>

<style scoped>
</style>
