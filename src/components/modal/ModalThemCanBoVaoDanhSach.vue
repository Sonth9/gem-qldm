<template>
  <b-modal
    :title="title"
    hide-footer
    id="modal-them-can-bo-vao-danh-sach"
    size="xl"
  >
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
          <CayDonVi @input="layDanhSachCanBoPhanTrang(true)"
                    v-model="searchForm.donVi" />
        </div>
        <div class="col-md-4 col-xs-12">
          <b-button
            :disabled="danhSachCanBoDaChon.length === 0"
            @click="themDanhSachCanBoDaChon()"
            class="btn search-information-btn d-block float-right mb-3 mr-2"
          >
            Thêm {{ danhSachCanBoDaChon.length > 0 ? ` + ` + danhSachCanBoDaChon.length : ''}}
          </b-button>
        </div>
      </div>
    </b-form-group>
    <b-table
      :busy="isLoadingTable"
      :fields="fieldName"
      :items="danhSachCanBo"
      :no-local-sorting="true"
      bordered
      responsive
      striped
      v-if="hasPageData"
    >
      <template v-slot:cell(thaoTac)="row">
        <font-awesome-icon
          :style="{
              color: '#2A6EBB',
              cursor: 'pointer',
              marginLeft: '10px',
            }"
          @click="themCanBo(row.item.id)"
          icon="plus-square"
          title="Thêm cán bộ"
        />
      </template>
      <template v-slot:head()="scope">
        <div class="center">
          <span v-html="scope.label"></span>
        </div>
      </template>
      <template v-slot:table-colgroup="scope">
        <col
          :key="field.key"
          :style="{
              width: ['stt', 'checkbox',].includes(field.key) ? '50px' : '',
            }"
          v-for="field in scope.fields"
        />
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
          v-model="danhSachCanBoDaChon"
        >
        </b-form-checkbox>
      </template>
      <template v-slot:table-busy>
        <BaseLoadingTable />
      </template>
    </b-table>
    <BaseEmptyTable :header-table="emptyHeaderTable" v-else />
    <BasePagination
      :current-page="dsCanBo.pageIndex"
      :total-pages="dsCanBo.totalPage"
      :total-rows="dsCanBo.totalCount"
      @changeNum="onChangeNum($event)"
      @changePages="onChangePages($event)"
    />
  </b-modal>
</template>

<script>
  import BasePagination from "@/components/common/BasePagination";
  import BaseLoadingTable from "@/components/common/BaseLoadingTable";
  import BaseEmptyTable from "@/components/common/BaseEmptyTable";
  import CayDonVi from "@/components/common/CayDonVi";
  import { mapGetters } from "vuex";
  import _isEmpty from "lodash/isEmpty";
  import _isNil from "lodash/isNil";
  import { BANG_THEM_CAN_BO_VAO_NGUOI_DUNG } from "@/constants/constants";

  export default {
    name: "ModalThemCanBoVaoDanhSach",
    components: {
      BasePagination,
      BaseLoadingTable,
      BaseEmptyTable,
      CayDonVi
    },
    props: {
      title: {
        type: String,
        default: "Thêm cán bộ vào danh sách"
      },
      showModalCanBo: {
        type: Boolean
      },
      nhomQuyenId: {
        type: String,
        default: null
      },
      isUser: {
        type: Boolean,
        default: null
      }
    },

    data() {
      return {
        searchForm: {
          keyword: "",
          donVi: 1
        },
        danhSachCanBoDaChon: [],
        danhSachIdCanBo: [],
        danhSachCanBo: [],
        canBoIds: [],
        isLoadingTable: false,
        selectAllRowsInPage: false,
        emptyHeaderTable: [
          BANG_THEM_CAN_BO_VAO_NGUOI_DUNG.stt,
          BANG_THEM_CAN_BO_VAO_NGUOI_DUNG.hoTen,
          BANG_THEM_CAN_BO_VAO_NGUOI_DUNG.userName,
          BANG_THEM_CAN_BO_VAO_NGUOI_DUNG.thaoTac
        ]
      }
    },
    async created() {
      await this.layDanhSachCanBoPhanTrang();
    },
    computed: {
      ...mapGetters({
        dsCanBo: "canBo/danhSachCanBo",
      }),
      fieldName() {
        return this.getFieldName();
      },
      hasPageData() {
        return !_isEmpty(this.dsCanBo.items);
      },
    },
    methods: {
      layDanhSachCanBoPhanTrang(resetPage = false) {
        if (resetPage) this.dsCanBo.pageIndex = 1;
        let payload = {
          PageIndex: this.dsCanBo.pageIndex,
          PageSize: this.dsCanBo.pageSize,
          NhomQuyenId: this.nhomQuyenId,
          IsUser: this.isUser
        };

        if (this.searchForm.keyword) {
          payload = Object.assign(payload, {FilterBy: this.searchForm.keyword});
        }
        if (this.searchForm.donVi) {
          payload = Object.assign(payload, {ID_DonVi: this.searchForm.donVi});
        }
        this.$store.dispatch("canBo/layDanhSachCanBo", payload);
      },
      themDanhSachCanBoDaChon() {
        this.canBoIds = this.danhSachCanBoDaChon;
        this.$emit('themCanBo', this.canBoIds)
      },
      themCanBo(id) {
        this.canBoIds = [id];
        this.$emit('themCanBo', this.canBoIds)
      },
      onChangeNum(pageSize) {
        this.dsCanBo.pageIndex = 1;
        this.dsCanBo.pageSize = pageSize;
        this.layDanhSachCanBoPhanTrang();
      },
      async onChangePages(page) {
        this.dsCanBo.pageIndex = page;
        await this.layDanhSachCanBoPhanTrang();
      },
      getFieldName() {
        if (_isEmpty(this.danhSachCanBo)) {
          return [];
        }
        return Object.keys(this.danhSachCanBo[0])
          .filter(key =>
            ["checkbox", "stt", "hoTen", "userName", "thaoTac"].includes(key)
          )
          .map(key => {
            return {
              key: key,
              label: BANG_THEM_CAN_BO_VAO_NGUOI_DUNG[key],
              tdClass: ["checkbox", "stt"].includes(key) ? "center" : ""
            };
          });
      },
      layDanhSachCanBo(data) {
        if (_isEmpty(data)) {
          return [];
        }
        let vm = this;
        return data && data.items.map((item, index) => {
          return {
            checkbox: null,
            stt: (vm.dsCanBo.pageIndex - 1) *
              vm.dsCanBo.pageSize +
              index +
              1,
            id: _isNil(item) ? "" : item.id,
            hoTen: _isNil(item) ? "" : item.hoTen,
            userName: _isNil(item) ? "" : item.userName,
            thaoTac: null
          };
        });
      },
      layDanhSachIdCanBo(danhSachCanBo) {
        if (_isEmpty(danhSachCanBo)) {
          return [];
        }
        return danhSachCanBo && danhSachCanBo.map(item => item.id);
      },
      clickSelectAllRowInPage() {
        if (this.selectAllRowsInPage) {
          this.$set(
            this,
            "danhSachCanBoDaChon",
            this.danhSachCanBoDaChon.concat(this.danhSachIdCanBo)
          );
          this.$set(this, "danhSachCanBoDaChon", [
            ...new Set(this.danhSachCanBoDaChon)
          ]);
        } else {
          this.danhSachCanBoDaChon = this.danhSachCanBoDaChon.filter(
            id => !this.danhSachIdCanBo.includes(id)
          );
        }
      },
    },
    watch: {
      "searchForm.keyword": {
        handler(val) {
          if (!val) {
            this.layDanhSachCanBoPhanTrang(true);
          }
        }
      },
      showModalCanBo() {
        this.searchForm.donVi = 1;
        this.layDanhSachCanBoPhanTrang(true);
        this.danhSachCanBoDaChon = this.danhSachCanBoDaChon.filter(
          id => !this.danhSachIdCanBo.includes(id)
        );
      },
      dsCanBo: {
        handler() {
          this.danhSachCanBo = this.layDanhSachCanBo(this.dsCanBo);
          this.danhSachIdCanBo = this.layDanhSachIdCanBo(this.danhSachCanBo);
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
  }
</script>

<style scoped>

</style>