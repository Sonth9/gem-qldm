<template>
  <div>
    <form @submit.prevent>
      <div id="tim-kiem-thong-tin" class="box box-form">
        <b-form-group label="" label-for="keyword" class="border-bottom-form">
          <div class="row">
            <div class="col-md-12 col-xs-12">
              <b-button
                :disabled="danhSachIdVaiTroDaChon.length === 0"
                class="btn search-information-btn d-block float-right mb-3 mr-2"
                @click="themDanhSachVaiTroDaChon()"
              >
                Thêm vai trò đã chọn
              </b-button>
            </div>
          </div>
        </b-form-group>
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
                id="check-all-items-to-add"
                name="checkbox_all_items_to_add"
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
            <template v-slot:cell(name)="row">
              <router-link
                :to="`${ROUTE_NAME.QUAN_TRI_HE_THONG.VAI_TRO}/${row.item.id}/xem`"
              >
                {{ row.item.name }}
              </router-link>
            </template>
            <template v-slot:table-colgroup="scope">
              <col
                v-for="field in scope.fields"
                :key="field.key"
                :style="{
                  width: ['stt', 'checkbox'].includes(field.key) ? '50px' : '',
                }"
              />
            </template>
            <template v-slot:table-busy>
              <BaseLoadingTable />
            </template>
          </b-table>
          <BaseEmptyTable :header-table="emptyHeaderTable" v-else />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import BaseLoadingTable from "@/components/common/BaseLoadingTable";
import BaseEmptyTable from "@/components/common/BaseEmptyTable";
import {
  ROUTE_NAME,
  MENU_ROUTE_NAME,
  BANG_VAI_TRO,
  BO_QUA_BUTTON_LABEL
} from "@/constants/constants";
import { mapGetters } from "vuex";
import _isEmpty from "lodash/isEmpty";
import _isNil from "lodash/isNil";
import { THEM_VAI_TRO_VAO_NGUOI_DUNG_THANH_CONG } from "@/constants/message";

export default {
  name: "DanhSachVaiTroKhongThuocNguoiDung",
  components: {
    BaseLoadingTable,
    BaseEmptyTable
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
      isLoadingTable: true,
      deletedId: null,
      nguoiDungId: null,
      danhSachIdVaiTroDaChon: [],
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
  computed: {
    ...mapGetters({
      danhSachVaiTro: "user/danhSachVaiTroKhongThuocNguoiDung"
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
        let danhSachVaiTro = this.danhSachVaiTroNoiBo.filter(quyen =>
          this.danhSachIdVaiTroDaChon.includes(quyen.Id)
        );

        return danhSachVaiTro.map((quyenDaChon, index) => {
          return Object.assign({}, quyenDaChon, {}, { stt: index + 1 });
        });
      },
      set: function() {}
    }
  },
  watch: {
    danhSachVaiTro: {
      handler() {
        this.danhSachVaiTroNoiBo = this.layDanhSachVaiTroNoiBo(
          this.danhSachVaiTro
        );
        this.danhSachIdVaiTro = this.layDanhSachIdVaiTro(
          this.danhSachVaiTroNoiBo
        );
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
  created() {
    this.nguoiDungId = this.$router.currentRoute.params.id;
    this.layDanhSachVaiTro();
  },
  methods: {
    themDanhSachVaiTroDaChon() {
      this.roleIds = this.danhSachIdVaiTroDaChon;
      this.themVaiTroTheoNguoiDung();
    },
    themVaiTroTheoNguoiDung() {
      const $vm = this;
      this.$store
        .dispatch("user/capNhatVaiTroTheoNguoiDung", {
          id: this.nguoiDungId,
          roleIds: this.roleIds,
          deleteRoleIds: []
        })
        .then(() => {
          $vm.$toasted.clear();
          $vm.$toasted.global.showSuccessMessage({
            message: THEM_VAI_TRO_VAO_NGUOI_DUNG_THANH_CONG
          });
          $vm.$emit("themVaiTroVaoNguoiDungThanhCong");
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
    layDanhSachIdVaiTro(danhSachVaiTro) {
      if (_isEmpty(danhSachVaiTro)) {
        return [];
      }
      return danhSachVaiTro.map(item => item.id);
    },
    clickSelectAllRowInPage() {
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
    layDanhSachVaiTro() {
      const payload = {
        id: this.nguoiDungId
      };
      this.isLoadingTable = true;
      this.$store
        .dispatch("user/layDanhSachVaiTroKhongThuocNguoiDung", payload)
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
          id: item.id
        };
      });
    },
    getFieldName() {
      if (_isEmpty(this.danhSachVaiTroNoiBo)) {
        return [];
      }
      return Object.keys(this.danhSachVaiTroNoiBo[0])
        .filter(key => key !== "id")
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
