<template>
  <div>
    <form @submit.prevent>
      <b-form-group
        class="border-bottom-form"
        label=""
        label-for="filterBy"
      >
        <div class="row">
          <div class="col-md-6 col-xs-12">
            <b-form-input
              @keyup.enter="timDanhSachVaiTro"
              id="filterBy"
              placeholder="Nhập từ khóa tìm kiếm"
              required
              type="text"
              v-model="requestInformation.filterBy"
            />
          </div>
          <div class="col-md-2 col-xs-12">
            <b-button
              @click="timDanhSachVaiTro()"
              class="btn search-information-btn d-block float-left mb-3"
            >
              TÌM KIẾM
            </b-button>
          </div>
          <div class="col-md-4 col-xs-12">
            <b-button
              @click="moFormTaoVaiTro()"
              class="btn search-information-btn d-block float-right mb-3"
            >
              TẠO VAI TRÒ
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
        :items="danhSachVaiTroNoiBo"
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
        <template v-slot:cell(thaoTac)="row">
          <div class="text-center">
            <router-link
              :to="`${ROUTE_NAME.QUAN_TRI_HE_THONG.VAI_TRO}/${row.item.id}`"
            >
              <font-awesome-icon
                :style="{
                      color: '#2A6EBB',
                      cursor: 'pointer',
                      marginLeft: '10px',
                    }"
                icon="edit"
                title="Sửa vai trò"
              />
            </router-link>
            <font-awesome-icon
              :style="{
                    color: '#2A6EBB',
                    cursor: 'pointer',
                    marginLeft: '10px',
                  }"
              @click="moFormXoaVaiTro(row.item)"
              icon="trash-alt"
              title="Xóa vai trò"
            />
          </div>
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
    <b-modal centered ref="tao-vai-tro-modal" size="xl" title="Tạo vai trò">
      <FormVaiTro ref="tao-vai-tro" />
      <template v-slot:modal-footer>
        <div class="w-100 center">
          <b-button @click="hideModal()" class="btn btn-line">
            {{ BO_QUA_BUTTON_LABEL }}
          </b-button>
          <b-button @click="taoVaiTro()" class="btn btn-main ml-2">
            Thêm mới
          </b-button>
        </div>
      </template>
    </b-modal>
    <ModalConfirm :title="vaiTroDaChon.name" @confirmed="xoaVaiTroThanhCong" />
  </div>
</template>

<script>
  import BasePagination from "@/components/common/BasePagination";
  import BaseLoadingTable from "@/components/common/BaseLoadingTable";
  import BaseEmptyTable from "@/components/common/BaseEmptyTable";
  import FormVaiTro from "@/components/pages/quan-tri-he-thong/vai-tro/FormVaiTro";
  import ModalConfirm from "@/components/modal/ModalConfirm";
  import { BANG_VAI_TRO, BO_QUA_BUTTON_LABEL, ROUTE_NAME } from "@/constants/constants";
  import { TAO_VAI_TRO_THANH_CONG } from "@/constants/message";
  import { mapGetters } from "vuex";
  import _isEmpty from "lodash/isEmpty";
  import _isNil from "lodash/isNil";

  export default {
    name: "DanhSachVaiTro",
    components: {
      BasePagination,
      BaseLoadingTable,
      BaseEmptyTable,
      FormVaiTro,
      ModalConfirm
    },
    data() {
      return {
        ROUTE_NAME: ROUTE_NAME,
        BO_QUA_BUTTON_LABEL: BO_QUA_BUTTON_LABEL,
        requestInformation: {
          sortBy: "",
          sortType: "",
          pageSize: 10,
          pageIndex: 1
        },
        requestInternalForm: {},
        totalPages: 0,
        totalRows: 0,
        isLoadingTable: true,
        vaiTroDaChon: {},
        emptyHeaderTable: [
          BANG_VAI_TRO.stt,
          BANG_VAI_TRO.displayName,
          BANG_VAI_TRO.name,
          BANG_VAI_TRO.thaoTac
        ]
      };
    },
    computed: {
      ...mapGetters({
        danhSachVaiTro: "role/danhSachVaiTro",
        danhSachQuyenTheoNguoiDung: "permission/danhSachQuyenTheoNguoiDung",
        danhSachNguoiDung: "role/danhSachNguoiDungTheoVaiTro"
      }),
      danhSachVaiTroNoiBo() {
        return this.layDanhSachVaiTroNoiBo(this.danhSachVaiTro);
      },
      fieldName() {
        return this.getFieldName();
      },
      hasPageData() {
        return !_isEmpty(this.danhSachVaiTro.items);
      }
    },
    watch: {
      danhSachVaiTro: {
        handler() {
          this.totalPages = this.danhSachVaiTro.totalPage;
          this.totalRows = _isNil(this.danhSachVaiTro.totalCount)
            ? 0
            : this.danhSachVaiTro.totalCount;
        },
        immediate: true
      },
      "requestInformation.pageIndex": {
        handler() {
          this.layDanhSachVaiTro();
        }
      }
    },
    created() {
      this.layDanhSachVaiTro();
    },
    methods: {
      moFormTaoVaiTro() {
        this.$refs["tao-vai-tro-modal"].show();
      },
      hideModal() {
        this.$refs["tao-vai-tro-modal"].hide();
      },
      async taoVaiTro() {
        const isValid = await this.$refs["tao-vai-tro"].$refs.observer.validate();
        const $vm = this;
        if (isValid) {
          this.$store
            .dispatch(
              "role/taoVaiTro",
              this.$refs["tao-vai-tro"].getInternalForm()
            )
            .then(response => {
              if (response.data.succeeded) {
                $vm.$toasted.clear();
                $vm.$toasted.global.showSuccessMessage({
                  message: TAO_VAI_TRO_THANH_CONG
                });
                $vm.$refs["tao-vai-tro-modal"].hide();
                $vm.layDanhSachVaiTro();
              }
            });
        }
      },
      onChangeNum(pageSize) {
        this.requestInformation.pageIndex = 1;
        this.requestInformation.pageSize = pageSize;
        this.layDanhSachVaiTro();
      },
      onChangePages(page) {
        this.requestInformation.pageIndex = page;
      },
      timDanhSachVaiTro(requestForm) {
        this.requestInformation.pageIndex = 1;
        this.requestInternalForm = requestForm;
        this.layDanhSachVaiTro();
      },
      layDanhSachVaiTro() {
        const payload = {
          ...this.requestInternalForm,
          ...this.requestInformation
        };
        this.isLoadingTable = true;
        this.$store.dispatch("role/layDanhSachVaiTro", payload).then(() => {
          this.isLoadingTable = false;
        });
      },
      layDanhSachVaiTroNoiBo(danhSachVaiTro) {
        if (_isEmpty(danhSachVaiTro.items)) {
          return [];
        }
        return danhSachVaiTro.items.map((item, index) => {
          return {
            stt:
              (this.requestInformation.pageIndex - 1) *
              this.requestInformation.pageSize +
              index +
              1,
            name: _isNil(item.role.name) ? "" : item.role.name,
            displayName: _isNil(item.role.displayName)
              ? ""
              : item.role.displayName,
            id: item.role.id,
            thaoTac: "thaoTac"
          };
        });
      },
      moFormXoaVaiTro(item) {
        this.vaiTroDaChon = item;
        this.$bvModal.show("modal-confirm");
      },
      xoaVaiTroThanhCong(confirm) {
        if (confirm) {
          this.$bvModal.hide("modal-confirm");
          this.$store.dispatch("role/xoaVaiTro", {id: this.vaiTroDaChon.id})
            .then(() => this.layDanhSachVaiTro());
        }
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
