<template>
  <div>
    <div class="box-form-result">
      <b-form-group label="" label-for="keyword" class="border-bottom-form">
        <div class="row">
          <div class="col-md-6 col-xs-12">
            <b-form-input
              v-model="requestInformation.keyword"
              id="keyword"
              type="text"
              required
              placeholder="Nhập từ khóa tìm kiếm"
              @keyup.enter="timDanhSachQuyen"
            />
          </div>
          <div class="col-md-2 col-xs-12">
            <b-button
              class="btn search-information-btn d-block float-left mb-3"
              @click="timDanhSachQuyen()"
            >
              TÌM KIẾM
            </b-button>
          </div>
          <div class="col-md-4 col-xs-12">
            <b-button
              :disabled="danhSachIdQuyenDaChon.length === 0"
              class="btn search-information-btn d-block float-right mb-3 mr-2"
              @click="themDanhSachQuyenDaChon()"
            >
              Thêm quyền đã chọn
            </b-button>
          </div>
        </div>
      </b-form-group>
      <b-table
        striped
        bordered
        responsive
        :no-local-sorting="true"
        :items="danhSachQuyenNoiBo"
        :fields="fieldName"
        :busy="isLoadingTable"
      >
        <template v-slot:head()="scope">
          <div class="d-inline-block">
            {{ scope.label }}
          </div>
        </template>
        <template v-slot:head(checkbox)="">
          <b-form-checkbox
            id="check-all-items-in-system"
            name="checkbox_all_items_in_system"
            :value="true"
            :unchecked-value="false"
            v-model="selectAllRowsInPage"
          />
        </template>
        <template v-slot:cell(checkbox)="row">
          <b-form-checkbox
            v-model="danhSachIdQuyenDaChon"
            :value="row.item.id"
            name="selected-rows"
          >
          </b-form-checkbox>
        </template>
        <template v-slot:cell(thaoTac)="row">
          <font-awesome-icon
            title="Thêm quyền vào vai trò"
            icon="plus-square"
            :style="{
              color: '#2A6EBB',
              cursor: 'pointer',
              marginLeft: '10px',
            }"
            @click="themTungQuyen(row.item.id)"
          />
        </template>
        <template v-slot:table-colgroup="scope">
          <col
            v-for="field in scope.fields"
            :key="field.key"
            :style="{
              width:
                field.key === 'checkbox'
                  ? '3%'
                  : ['thaoTac'].includes(field.key)
                  ? '90px'
                  : '',
            }"
          />
        </template>
        <template v-slot:table-busy>
          <BaseLoadingTable />
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import _isEmpty from "lodash/isEmpty";
import { BANG_DANH_SACH_QUYEN } from "@/constants/constants";
import BaseLoadingTable from "@/components/common/BaseLoadingTable";
import _isNil from "lodash/isNil";
import { THEM_QUYEN_VAO_VAI_TRO_THANH_CONG } from "@/constants/message";

export default {
  name: "DanhSachQuyenKhongThuocVaiTro",
  components: {
    BaseLoadingTable
  },
  data() {
    return {
      danhSachQuyenTrongVaiTro: [],
      danhSachQuyenNoiBo: [],
      isLoadingTable: false,
      allPermissions: false,
      deletePermissionIds: [],
      vaiTroId: null,
      danhSachIdQuyenDaChon: [],
      danhSachIdQuyen: [],
      selectAllRowsInPage: false,
      requestInformation: {},
      emptyHeaderTable: [
        BANG_DANH_SACH_QUYEN.stt,
        BANG_DANH_SACH_QUYEN.name,
        BANG_DANH_SACH_QUYEN.displayName,
        BANG_DANH_SACH_QUYEN.thaoTac
      ]
    };
  },
  props: {
    chiTietVaiTro: {
      type: Object,
      required: true
    },
    readonly: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Boolean | null,
      required: false
    }
  },
  created() {
    this.vaiTroId = this.$router.currentRoute.params.id;
    this.layDanhSachQuyenTrongHeThong();
  },
  computed: {
    ...mapGetters({
      danhSachQuyenKhongThuocVaiTro: "role/danhSachQuyenKhongThuocVaiTro"
    }),
    fieldName() {
      return this.getFieldName();
    },
    hasPageData() {
      return !_isEmpty(this.danhSachQuyenKhongThuocVaiTro);
    },
    danhSachQuyenDaChon: {
      get: function() {
        let danhSachQuyen = this.danhSachQuyenNoiBo.filter(quyen =>
          this.danhSachIdQuyenDaChon.includes(quyen.Id)
        );

        return danhSachQuyen.map((quyenDaChon, index) => {
          return Object.assign({}, quyenDaChon, {}, { stt: index + 1 });
        });
      },
      set: function() {}
    }
  },
  watch: {
    danhSachQuyenKhongThuocVaiTro: {
      handler() {
        this.danhSachQuyenNoiBo = this.layDanhSachQuyenNoiBo(
          this.danhSachQuyenKhongThuocVaiTro
        );
        this.danhSachIdQuyen = this.layDanhSachIdQuyen(this.danhSachQuyenNoiBo);
        this.clickSelectAllRowInPage();
      },
      immediate: true
    },
    selectAllRowsInPage: {
      handler() {
        this.clickSelectAllRowInPage();
      }
    }
  },
  methods: {
    layDanhSachIdQuyen(danhSachQuyen) {
      if (_isEmpty(danhSachQuyen)) {
        return [];
      }
      return danhSachQuyen.map(item => item.id);
    },
    themDanhSachQuyenDaChon() {
      this.permissionIds = this.danhSachIdQuyenDaChon;
      this.themQuyenVaoVaiTro();
    },
    themTungQuyen(id) {
      this.permissionIds = [id];
      this.themQuyenVaoVaiTro();
    },
    themQuyenVaoVaiTroThanhCong() {
      this.$bvModal.hide("them-quyen-trong-vai-tro");
      this.layDanhSachQuyenTrongHeThong();
    },
    clickSelectAllRowInPage() {
      if (this.selectAllRowsInPage) {
        this.$set(
          this,
          "danhSachIdQuyenDaChon",
          this.danhSachIdQuyenDaChon.concat(this.danhSachIdQuyen)
        );
        this.$set(this, "danhSachIdQuyenDaChon", [
          ...new Set(this.danhSachIdQuyenDaChon)
        ]);
      } else {
        this.danhSachIdQuyenDaChon = this.danhSachIdQuyenDaChon.filter(
          id => !this.danhSachIdQuyen.includes(id)
        );
      }
    },
    themQuyenVaoVaiTro() {
      const $vm = this;
      this.$store
        .dispatch("role/capNhatQuyenTrongVaiTro", {
          id: this.vaiTroId,
          permissionIds: this.permissionIds,
          deletePermissionIds: []
        })
        .then(() => {
          $vm.$toasted.clear();
          $vm.$toasted.global.showSuccessMessage({
            message: THEM_QUYEN_VAO_VAI_TRO_THANH_CONG
          });
          $vm.$emit("themQuyenVaoVaiTroThanhCong");
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
    timDanhSachQuyen() {
      this.layDanhSachQuyenTrongHeThong();
    },
    layDanhSachQuyenTrongHeThong() {
      this.isLoadingTable = true;
      this.$store
        .dispatch(
          "role/layDanhSachQuyenKhongThuocVaiTro",
          this.chiTietVaiTro.role
        )
        .then(() => {
          this.isLoadingTable = false;
        });
    },
    layDanhSachQuyenNoiBo(danhSachQuyenKhongThuocVaiTro) {
      if (_isEmpty(danhSachQuyenKhongThuocVaiTro)) {
        return [];
      }
      return danhSachQuyenKhongThuocVaiTro.map(item => {
        return {
          checkbox: null,
          id: _isNil(item) ? "" : item.id,
          name: _isNil(item) ? "" : item.name,
          displayName: _isNil(item) ? "" : item.displayName,
          thaoTac: null
        };
      });
    },
    getFieldName() {
      if (_isEmpty(this.danhSachQuyenNoiBo)) {
        return [];
      }
      return Object.keys(this.danhSachQuyenNoiBo[0])
        .filter(key =>
          ["name", "displayName", "thaoTac", "checkbox"].includes(key)
        )
        .map(key => {
          return {
            key: key,
            label: BANG_DANH_SACH_QUYEN[key],
            tdClass: ["checkbox"].includes(key) ? "center" : ""
          };
        });
    }
  }
};
</script>

<style scoped>
</style>
