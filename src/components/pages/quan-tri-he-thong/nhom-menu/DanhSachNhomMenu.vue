<template>
  <div>
    <b-form-group class="border-bottom-form">
      <b-row align-v="center" class="pb-3">
        <b-col cols="3">
          <b-form @submit.prevent="layDanhSachNhomMenu(true)">
            <b-form-input
              class="border-radius-4"
              placeholder="Tên nhóm menu, mô tả"
              trim
              type="text"
              v-model="searchForm.keyword"
            ></b-form-input>
          </b-form>
        </b-col>

        <b-col align="end">
          <b-button @click="openCreate" variant="info">
            <b-icon icon="plus"></b-icon>
            Thêm mới
          </b-button>
        </b-col>
      </b-row>
    </b-form-group>
    <form>
      <div class="box-form-result">
        <p class="color-gray-1">
          Tìm thấy {{ dsNhomMenu.totalCount }} kết quả
        </p>
        <b-table
          :fields="fieldNames"
          :items="dsNhomMenu.items"
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
            {{ row.index + row.value }}
          </template>
          <template v-slot:cell(title)="row">
            <router-link
              :to="`${ROUTE.QUAN_TRI_HE_THONG.NAME}${ROUTE.QUAN_TRI_HE_THONG.DM_NHOM_MENU.NAME}/${row.item.id}`"
            >
              {{ row.item.title }}
            </router-link>
          </template>
          <template #cell(trangThai)="row">
            <b-form-checkbox
              disabled
              inline
              v-model="row.item.trangThai"
            >Hoạt động
            </b-form-checkbox>
          </template>
          <template #cell(thaoTac)="row">
            <div class="text-center">
              <b-button @click="openEdit(row.item)" variant="link">
                <font-awesome-icon
                  :style="{
                    color: '#2A6EBB',
                    cursor: 'pointer',
                    marginLeft: '5px',
                  }"
                  icon="edit"
                  title="Cập nhật nhóm quyền"
                />
              </b-button>
              <b-button @click="openDelete(row.item)" variant="link">
                <font-awesome-icon
                  :style="{
                    color: '#2A6EBB',
                    cursor: 'pointer',
                    marginLeft: '5px',
                  }"
                  icon="trash"
                  title="Xóa nhóm quyền"
                />
              </b-button>
            </div>
          </template>
        </b-table>
      </div>
      <BasePagination
        :current-page="dsNhomMenu.pageIndex"
        :total-pages="dsNhomMenu.totalPage"
        :total-rows="dsNhomMenu.totalCount"
        @changeNum="onChangeNum($event)"
        @changePages="onChangePages($event)"
      />
    </form>
    <ModalConfirm :title="nhomMenuDaChon.title" @confirmed="xoaNhomMenu"/>
  </div>
</template>

<script>
import BasePagination from "@/components/common/BasePagination";
import ModalConfirm from "@/components/modal/ModalConfirm";
import { ROUTE_NAME } from "@/constants/constants";
import { mapGetters } from "vuex";

export default {
  name: "DanhSachNhomMenu",
  components: {
    BasePagination,
    ModalConfirm
  },
  data() {
    return {
      ROUTE: ROUTE_NAME,
      searchForm: {
        keyword: ""
      },
      nhomMenuDaChon: {},
      fieldNames: [
        {
          key: "stt",
          label: "STT",
          class: "center fit-column",
          formatter: () => {
            return (
              (this.dsNhomMenu.pageIndex - 1) * this.dsNhomMenu.pageSize + 1
            );
          },
        },
        {
          key: "title",
          label: "Tên nhóm quyền",
        },
        {
          key: "description",
          label: "Mô tả"
        },
        {
          key: "trangThai",
          label: "Trạng thái",
          class: "center fit-column"
        },
        {
          key: "thaoTac",
          label: "Thao tác",
          class: "center fit-column"
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      dsNhomMenu: "dmNhomMenu/danhSachNhomMenu"
    })
  },
  created() {
    this.layDanhSachNhomMenu();
  },
  methods: {
    layDanhSachNhomMenu(resetPage = false) {
      if (resetPage) this.dsNhomMenu.pageIndex = 1;
      let payload = {
        PageIndex: this.dsNhomMenu.pageIndex,
        PageSize: this.dsNhomMenu.pageSize
      };

      if (this.searchForm.keyword) {
        payload = Object.assign(payload, { FilterBy: this.searchForm.keyword });
      }

      this.$store.dispatch("dmNhomMenu/layDanhSachNhomMenu", payload);
    },
    openCreate() {
      this.$router.push({
        name: ROUTE_NAME.QUAN_TRI_HE_THONG.DM_NHOM_MENU.TAO
      });
    },
    openEdit(item) {
      this.$router.push({
        name: ROUTE_NAME.QUAN_TRI_HE_THONG.DM_NHOM_MENU.SUA,
        params: { id: item.id }
      });
    },
    openDelete(item) {
      this.nhomMenuDaChon = item;
      this.$bvModal.show("modal-confirm");
    },
    xoaNhomMenu(confirm) {
      if (confirm) {
        this.$store.dispatch("dmNhomMenu/xoaNhomMenu", {
          data: { id: this.nhomMenuDaChon.id },
          onSuccess: this.onSuccess
        });
        this.$bvModal.hide("modal-confirm");
      }
    },
    onSuccess() {
      this.layDanhSachNhomMenu(true);
    },
    onChangeNum(pageSize) {
      this.dsNhomMenu.pageIndex = 1;
      this.dsNhomMenu.pageSize = pageSize;
      this.layDanhSachNhomMenu();
    },
    onChangePages(page) {
      this.dsNhomMenu.pageIndex = page;
      this.layDanhSachNhomMenu();
    }
  }
};
</script>

<style scoped>
</style>
