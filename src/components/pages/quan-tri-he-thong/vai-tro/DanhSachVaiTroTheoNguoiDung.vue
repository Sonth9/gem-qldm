<template>
  <div>
    <form @submit.prevent>
      <div class="row">
        <b-form-group class="col-sm-12 border-bottom-form">
          <div class="float-right ml-2" v-if="!readonly">
            <b-button
              class="btn search-information-btn d-block float-right mb-3 mr-2"
              @click="moFormThemDanhSachVaiTro()"
            >
              Thêm
            </b-button>
            <b-button
              :disabled="danhSachIdVaiTroDaChon.length === 0"
              class="btn search-information-btn d-block float-right mb-3 mr-2"
              @click="moFormXoaDanhSachVaiTro()"
            >
              Xóa vai trò đã chọn
            </b-button>
          </div>
        </b-form-group>
      </div>
      <div class="box-form-result">
        <b-table
          v-if="hasPageData"
          striped
          bordered
          responsive
          :no-local-sorting="true"
          :items="danhSachVaiTroNoiBo"
          :fields="fieldName"
          :busy="isLoadingTable"
        >
          <template v-slot:head()="scope">
            <div class="d-inline-block">
              {{ scope.label }}
            </div>
          </template>
          <template v-slot:head(checkbox)="scope">
            <b-form-checkbox
              id="check-all-items"
              name="checkbox_all_items"
              :value="true"
              :unchecked-value="false"
              v-model="selectAllRowsInPage"
            >
              {{ scope.label }}
            </b-form-checkbox>
          </template>
          <template v-slot:cell(checkbox)="row">
            <b-form-checkbox
              v-model="danhSachIdVaiTroDaChon"
              :value="row.item.id"
              name="selected-rows"
            >
            </b-form-checkbox>
          </template>
          <template v-slot:cell(thaoTac)="row">
            <div class="text-center">
              <router-link
                :to="`${ROUTE_NAME.QUAN_TRI_HE_THONG.NAME}${ROUTE_NAME.QUAN_TRI_HE_THONG.VAI_TRO}/${row.item.id}`"
              >
                <font-awesome-icon
                  title="Sửa vai trò"
                  icon="edit"
                  :style="{
                    color: '#2A6EBB',
                    cursor: 'pointer',
                    marginLeft: '10px',
                  }"
              /></router-link>
              <font-awesome-icon
                title="Xóa vai trò"
                icon="trash-alt"
                :style="{
                  color: '#2A6EBB',
                  cursor: 'pointer',
                  marginLeft: '10px',
                }"
                @click="moFormXoaVaiTro(row.item.id)"
              />
            </div>
          </template>
          <template v-slot:cell(name)="row">
            <router-link
              :to="`${ROUTE_NAME.QUAN_TRI_HE_THONG.NAME}${ROUTE_NAME.QUAN_TRI_HE_THONG.VAI_TRO}/${row.item.id}/xem`"
            >
              {{ row.item.name }}
            </router-link>
          </template>
          <template v-slot:table-colgroup="scope">
            <col
              v-for="field in scope.fields"
              :key="field.key"
              :style="{
                width: ['stt', 'checkbox'].includes(field.key)
                  ? '50px'
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
        <BaseEmptyTable :header-table="emptyHeaderTable" v-else />
      </div>
    </form>
    <XoaVaiTroThuocNguoiDungModal
      @xoaDanhSachVaiTroThuocNguoiDung="xoaDanhSachVaiTroThuocNguoiDung"
    />
    <b-modal
      id="them-vai-tro-modal"
      size="xl"
      title="Thêm vai trò cho người dùng"
      :hide-footer="true"
    >
      <DanhSachVaiTroKhongThuocNguoiDung
        ref="danhSachVaiTroKhongThuocNguoiDung"
        @themVaiTroVaoNguoiDungThanhCong="themVaiTroVaoNguoiDungThanhCong"
        :key="`vai-tro-khong-thuoc-nguoi-dung-${nguoiDungId}`"
        @laydanhSachVaiTroTheoNguoiDung="layDanhSachVaiTro"
      />
    </b-modal>
  </div>
</template>

<script>
import BaseLoadingTable from "@/components/common/BaseLoadingTable";
import BaseEmptyTable from "@/components/common/BaseEmptyTable";
import XoaVaiTroThuocNguoiDungModal from "@/components/pages/quan-tri-he-thong/vai-tro/XoaVaiTroThuocNguoiDungModal";
import DanhSachVaiTroKhongThuocNguoiDung from "@/components/pages/quan-tri-he-thong/vai-tro/DanhSachVaiTroKhongThuocNguoiDung";

import {
  ROUTE_NAME,
  MENU_ROUTE_NAME,
  BANG_VAI_TRO,
  BO_QUA_BUTTON_LABEL
} from "@/constants/constants";
import { XOA_VAI_TRO_THUOC_NGUOI_DUNG_THANH_CONG } from "@/constants/message";
import _cloneDeep from "lodash/cloneDeep";
import { mapGetters } from "vuex";
import _isNil from "lodash/isNil";
import _isEmpty from "lodash/isEmpty";
export default {
  name: "DanhSachVaiTroTheoNguoiDung",
  components: {
    BaseLoadingTable,
    BaseEmptyTable,
    XoaVaiTroThuocNguoiDungModal,
    DanhSachVaiTroKhongThuocNguoiDung
  },
  data() {
    return {
      MENU_ROUTE_NAME: `${MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.NAME} / ${
        MENU_ROUTE_NAME.QUAN_TRI_HE_THONG.VAI_TRO
      }`,
      ROUTE_NAME: ROUTE_NAME,
      BO_QUA_BUTTON_LABEL: BO_QUA_BUTTON_LABEL,
      requestInformation: {
        pageSize: 10,
        pageIndex: 1
      },
      requestInternalForm: {},
      isLoadingTable: true,
      deletedId: null,
      nguoiDungId: null,
      danhSachIdVaiTroDaChon: [],
      danhSachIdVaiTroMuonXoa: [],
      danhSachIdVaiTro: [],
      selectAllRowsInPage: false,
      emptyHeaderTable: [
        BANG_VAI_TRO.stt,
        BANG_VAI_TRO.name,
        BANG_VAI_TRO.displayName,
        BANG_VAI_TRO.thaoTac
      ]
    };
  },
  props: {
    readonly: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Boolean | null,
      required: false
    }
  },
  watch: {
    danhSachVaiTro: {
      handler() {
        this.danhSachIdVaiTro = this.layDanhSachIdVaiTro(this.danhSachVaiTro);
      },
      immediate: true
    },
    selectAllRowsInPage: {
      handler() {
        this.clickSelectAllRowsInPage();
      }
    }
  },
  computed: {
    ...mapGetters({
      danhSachVaiTro: "user/danhSachVaiTroTheoNguoiDung"
    }),
    danhSachVaiTroNoiBo() {
      return this.layDanhSachVaiTroNoiBo(this.danhSachVaiTro);
    },
    fieldName() {
      return this.getFieldName();
    },
    hasPageData() {
      return !_isEmpty(this.danhSachVaiTro);
    },
    danhSachVaiTroDaChon: {
      get: function() {
        let danhSachVaiTro = this.danhSachVaiTroNoiBo.filter(vaiTro =>
          this.danhSachIdVaiTroDaChon.includes(vaiTro.id)
        );
        return danhSachVaiTro.map((vaiTroDaChon, index) => {
          return Object.assign({}, vaiTroDaChon, {}, { stt: index + 1 });
        });
      },
      set: function() {}
    }
  },
  created() {
    this.nguoiDungId = this.$router.currentRoute.params.id;
    this.layDanhSachVaiTro();
  },
  methods: {
    moFormThemDanhSachVaiTro() {
      this.$bvModal.show("them-vai-tro-modal");
    },
    clickSelectAllRowsInPage() {
      if (this.selectAllRowsInPage) {
        this.$set(
          this,
          "danhSachIdVaiTroDaChon",
          this.danhSachIdVaiTroDaChon.concat(this.danhSachIdVaiTro)
        );
        this.$set(this, "danhSachIdVaiTroDaChon", [
          ...new Set(this.danhSachIdVaiTroDaChon)
        ]);
      } else {
        this.danhSachIdVaiTroDaChon = this.danhSachIdVaiTroDaChon.filter(
          id => !this.danhSachIdVaiTro.includes(id)
        );
      }
    },
    xoaDanhSachVaiTroThuocNguoiDung() {
      const $vm = this;
      this.$store
        .dispatch("user/capNhatVaiTroTheoNguoiDung", {
          id: this.nguoiDungId,
          roleIds: [],
          deleteRoleIds: this.danhSachIdVaiTroMuonXoa
        })
        .then(() => {
          $vm.$toasted.clear();
          $vm.$toasted.global.showSuccessMessage({
            message: XOA_VAI_TRO_THUOC_NGUOI_DUNG_THANH_CONG
          });
          this.danhSachIdVaiTroDaChon = [];
          this.layDanhSachVaiTro();
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
    themVaiTroVaoNguoiDungThanhCong() {
      this.$bvModal.hide("them-vai-tro-modal");
      this.layDanhSachVaiTro();
    },
    layDanhSachVaiTro() {
      const payload = {
        id: this.nguoiDungId
      };
      this.isLoadingTable = true;
      this.$store
        .dispatch("user/layDanhSachVaiTroTheoNguoiDung", payload)
        .then(() => {
          this.isLoadingTable = false;
        });
    },
    layDanhSachVaiTroNoiBo(danhSachVaiTro) {
      if (_isEmpty(danhSachVaiTro)) {
        return [];
      }
      return danhSachVaiTro.map((item, index) => {
        return {
          checkbox: null,
          stt:
            (this.requestInformation.pageIndex - 1) *
              this.requestInformation.pageSize +
            index +
            1,
          name: _isNil(item.name) ? "" : item.name,
          displayName: _isNil(item.displayName) ? "" : item.displayName,
          id: item.id,
          thaoTac: "thaoTac"
        };
      });
    },
    layDanhSachIdVaiTro(danhSachVaiTro) {
      if (_isEmpty(danhSachVaiTro)) {
        return [];
      }
      return danhSachVaiTro.map(item => item.id);
    },
    moFormXoaVaiTro(id) {
      this.danhSachIdVaiTroMuonXoa = [id];
      this.$bvModal.show("xoa-vai-tro-thuoc-nguoi-dung");
    },
    moFormXoaDanhSachVaiTro() {
      this.danhSachIdVaiTroMuonXoa = _cloneDeep(this.danhSachIdVaiTroDaChon);
      this.$bvModal.show("xoa-vai-tro-thuoc-nguoi-dung");
    },
    getFieldName() {
      if (_isEmpty(this.danhSachVaiTroNoiBo)) {
        return [];
      }
      return Object.keys(this.danhSachVaiTroNoiBo[0])
        .filter(
          key =>
            key !== "id" &&
            (!["checkbox", "thaoTac"].includes(key) || !this.readonly)
        )
        .map(key => {
          return {
            key: key,
            label: BANG_VAI_TRO[key],
            tdClass: ["stt"].includes(key) ? "center" : ""
          };
        });
    }
  }
};
</script>

<style scoped>
</style>
