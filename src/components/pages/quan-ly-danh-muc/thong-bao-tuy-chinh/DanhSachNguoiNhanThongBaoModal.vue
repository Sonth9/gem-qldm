<template>
  <div>
    <div class="box-form-result">
      <b-form-group class="border-bottom-form" label="" label-for="keyword">
        <div class="row">
          <div class="col-md-4 col-xs-12">
            <b-form-input
              @blur="layDanhSachCanBoPhanTrang(true)"
              @keyup="layDanhSachCanBoPhanTrang(true)"
              @keyup.enter="layDanhSachCanBoPhanTrang(true)"
              id="keyword"
              placeholder="Nhập từ khóa tìm kiếm"
              required
              type="text"
              v-model="searchForm.keyword"
            />
          </div>
          <div class="col-md-4 col-xs-12">
            <CayDonVi :idDonViCha="idDonViCha"
                      @input="layDanhSachCanBoPhanTrang(true)"
                      v-model="searchForm.donVi" />
          </div>
          <div class="col-md-4 col-xs-12">
            <b-button
              :disabled="danhSachIdCanBoDaChon.length === 0"
              @click="themDanhSachQuyenDaChon()"
              class="btn search-information-btn d-block float-right mb-3 mr-2"
            >
              Thêm
              {{
              danhSachIdCanBoDaChon.length > 0
              ? ` + ` + danhSachIdCanBoDaChon.length
              : ""
              }}
            </b-button>
          </div>
        </div>
      </b-form-group>
      <b-table
        :busy="isLoadingTable"
        :fields="fieldName"
        :items="danhSachCanBoThemVaoNguoiDung"
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
        <template v-slot:head(checkbox)="">
          <b-form-checkbox
            :unchecked-value="false"
            :value="true"
            id="check-all-items-in-system"
            name="checkbox_all_items_in_system"
            v-model="selectAllRowsInPage"
          />
        </template>
        <template v-slot:cell(checkbox)="row">
          <b-form-checkbox
            :value="row.item.id"
            name="selected-rows"
            v-model="danhSachIdCanBoDaChon"
          >
          </b-form-checkbox>
        </template>
        <template v-slot:cell(thaoTac)="row">
          <font-awesome-icon
            :style="{
              color: '#2A6EBB',
              cursor: 'pointer',
              marginLeft: '10px',
            }"
            @click="themTungNguoiNhan(row.item)"
            icon="plus-square"
            title="Thêm người nhận thông báo"
          />
        </template>
        <template v-slot:table-colgroup="scope">
          <col
            :key="field.key"
            :style="{
              width: ['stt', 'checkbox'].includes(field.key) ? '50px' : '',
            }"
            v-for="field in scope.fields"
          />
        </template>
        <template v-slot:table-busy>
          <BaseLoadingTable />
        </template>
      </b-table>
      <BaseEmptyTable :header-table="emptyHeaderTable" v-else />
      <BasePagination
        :current-page="danhSachCanBo.pageIndex"
        :total-pages="danhSachCanBo.totalPage"
        :total-rows="danhSachCanBo.totalCount"
        @changeNum="onChangeNum($event)"
        @changePages="onChangePages($event)"
      />
    </div>
  </div>
</template>

<script>
  import BasePagination from "@/components/common/BasePagination";
  import CayDonVi from "@/components/common/CayDonVi";
  import { mapGetters } from "vuex";
  import _isEmpty from "lodash/isEmpty";
  import { BANG_THEM_CAN_BO_VAO_NGUOI_DUNG } from "@/constants/constants";
  import BaseLoadingTable from "@/components/common/BaseLoadingTable";
  import BaseEmptyTable from "@/components/common/BaseEmptyTable";
  import _isNil from "lodash/isNil";
  import { hasPermission } from "../../../../utils/permissionUtils";
  import { PERMISSION_NAME } from "../../../../constants/constants";

  export default {
    name: "DanhSachCanBoThemVaoNguoiDung",
    components: {
      BasePagination,
      BaseLoadingTable,
      BaseEmptyTable,
      CayDonVi,
    },
    data() {
      return {
        PERMISSION_NAME: PERMISSION_NAME,
        idDonViCha: 1,
        searchForm: {
          keyword: "",
          donVi: this.idDonViCha || 1,
        },
        danhSachCanBoThemVaoNguoiDung: [],
        isLoadingTable: false,
        NguoiDungId: null,
        danhSachIdCanBoDaChon: [],
        danhSachCanBoInFos: [],
        danhSachIdQuyen: [],
        danhSachIdQuyenFull: [],
        selectAllRowsInPage: false,
        requestInformation: {
          sortBy: "",
          sortType: "",
          pageSize: 10,
          pageIndex: 1,
        },
        emptyHeaderTable: [
          BANG_THEM_CAN_BO_VAO_NGUOI_DUNG.stt,
          BANG_THEM_CAN_BO_VAO_NGUOI_DUNG.hoTen,
          BANG_THEM_CAN_BO_VAO_NGUOI_DUNG.userName,
          BANG_THEM_CAN_BO_VAO_NGUOI_DUNG.thaoTac,
        ],
      };
    },

    created() {
      this.NguoiDungId = this.$router.currentRoute.params.id;
      if (this.idDonViCha == 1 && !hasPermission(this.permissions, PERMISSION_NAME.QUAN_TRI_DON_VI_GOC) && !hasPermission(this.permissions, PERMISSION_NAME.QUAN_TRI_HE_THONG)) {
        this.idDonViCha = this.user.donViTrucThuoc.id
      }

      if (this.idDonViCha == 1 && hasPermission(this.permissions, PERMISSION_NAME.QUAN_TRI_DON_VI_GOC) && !hasPermission(this.permissions, PERMISSION_NAME.QUAN_TRI_HE_THONG)) {
        this.idDonViCha = this.user.donViGoc.id
      }
      this.layDanhSachCanBoPhanTrang(true);
    },
    computed: {
      ...mapGetters({
        danhSachCanBo: "canBo/danhSachCanBo",
        permissions: "common/permissions",
        user: "common/user",
      }),
      fieldName() {
        return this.getFieldName();
      },
      hasPageData() {
        return !_isEmpty(this.danhSachCanBo.items);
      },
    },
    watch: {
      "searchForm.keyword": {
        handler(val) {
          if (!val) {
            this.layDanhSachCanBoPhanTrang(true);
          }
        },
      },
      danhSachCanBo: {
        handler() {
          this.danhSachCanBoThemVaoNguoiDung = this.layDanhSachCanBoThemVaoNguoiDung(
            this.danhSachCanBo
          );
          this.danhSachIdQuyen = this.layDanhSachIdCanBo(
            this.danhSachCanBoThemVaoNguoiDung
          );
          this.danhSachIdQuyenFull = this.layDanhSachCanBo(
            this.danhSachCanBoThemVaoNguoiDung
          );
          this.clickSelectAllRowInPage();
        },
        immediate: true,
      },
      selectAllRowsInPage: {
        handler() {
          this.clickSelectAllRowInPage();
        },
      },
      danhSachIdCanBoDaChon(val) {
        console.log('danhSachIdCanBoDaChon', val);
        for (let index = 0; index < val.length; index++) {
          const el = val[index];
          let [checkTonTai] = this.danhSachCanBoThemVaoNguoiDung.filter(item => item.id == el);
          this.danhSachCanBoInFos.push(checkTonTai);
          console.log('checkTonTai', checkTonTai);
        }
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
          PageSize: this.danhSachCanBo.pageSize,
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
      async onChangePages(page) {
        this.danhSachCanBo.pageIndex = page;
        await this.layDanhSachCanBoPhanTrang();
      },
      layDanhSachIdCanBo(danhSachCanBo) {
        if (_isEmpty(danhSachCanBo)) {
          return [];
        }
        return danhSachCanBo && danhSachCanBo.map((item) => item.id);
      },
      layDanhSachCanBo(danhSachCanBo) {
        if (_isEmpty(danhSachCanBo)) {
          return [];
        }
        return danhSachCanBo && danhSachCanBo.map((item) => item);
      },

      themDanhSachQuyenDaChon() {
        // this.permissionIds = this.danhSachIdCanBoDaChon;
        this.chonNguoiNhanSuccess();
      },
      themTungNguoiNhan(item) {
        // this.permissionIds = [id];
        this.danhSachCanBoInFos = [item];
        this.chonNguoiNhanSuccess();
      },
      clickSelectAllRowInPage() {
        if (this.selectAllRowsInPage) {
          this.$set(
            this,
            "danhSachIdCanBoDaChon",
            this.danhSachIdCanBoDaChon.concat(this.danhSachIdQuyen)
          );
          this.$set(
            this,
            "danhSachCanBoInFos",
            this.danhSachCanBoInFos.concat(this.danhSachIdQuyenFull)
          );
          
          this.$set(this, "danhSachIdCanBoDaChon", [
            ...new Set(this.danhSachIdCanBoDaChon),
          ]);
          this.$set(this, "danhSachCanBoInFos", [
            ...new Set(this.danhSachCanBoInFos),
          ]);
          
        } else {
          this.danhSachIdCanBoDaChon = this.danhSachIdCanBoDaChon.filter(
            (id) => !this.danhSachIdQuyen.includes(id)
          );
          this.danhSachCanBoInFos = this.danhSachCanBoInFos.filter(
            (item) => !this.danhSachCanBoInFos.includes(item)
          );
        }
      },
      chonNguoiNhanSuccess() {
        this.$set(this, "danhSachCanBoInFos", [
          ...new Set(this.danhSachCanBoInFos),
        ]);
        this.danhSachCanBoInFos = this.danhSachCanBoInFos.filter(item => item);
        this.$emit("chonNguoiNhanSuccess", this.danhSachCanBoInFos);
      },
      layDanhSachQuyenTrongHeThong() {
        this.isLoadingTable = true;
        this.$store
          .dispatch("user/layDanhSachQuyenKhongThuocNguoiDung", {
            id: this.NguoiDungId,
          })
          .then(() => {
            this.isLoadingTable = false;
          });
      },
      getFieldName() {
        if (_isEmpty(this.danhSachCanBoThemVaoNguoiDung)) {
          return [];
        }
        return Object.keys(this.danhSachCanBoThemVaoNguoiDung[0])
          .filter((key) =>
            ["checkbox", "stt", "hoTen", "userName", "thaoTac"].includes(key)
          )
          .map((key) => {
            return {
              key: key,
              label: BANG_THEM_CAN_BO_VAO_NGUOI_DUNG[key],
              tdClass: ["checkbox", "stt"].includes(key) ? "center" : "",
            };
          });
      },

      layDanhSachCanBoThemVaoNguoiDung(data) {
        if (_isEmpty(data)) {
          return [];
        }
        let vm = this;
        return (
          data &&
          data.items.map((item, index) => {
            return {
              checkbox: null,
              stt:
                (vm.danhSachCanBo.pageIndex - 1) *
                vm.danhSachCanBo.pageSize +
                index +
                1,
              id: _isNil(item) ? "" : item.id,
              hoTen: _isNil(item) ? "" : item.hoTen,
              userName: _isNil(item) ? "" : item.userName,
              thaoTac: null,
            };
          })
        );
      }
    },
  };
</script>

<style scoped>
</style>
