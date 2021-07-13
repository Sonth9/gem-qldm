<template>
  <div>
    <b-form-group class="border-bottom-form">
      <b-row align-v="center" class="pb-3">
        <b-col cols="3">
          <b-form @submit.prevent="layDanhSachThongBao(true)">
            <b-form-input
              class="border-radius-4"
              id="search"
              placeholder="Tiêu đề, mô tả"
              trim
              type="text"
              v-model="searchForm.keyword"
              @blur="layDanhSachThongBao(true)"
              @keyup="layDanhSachThongBao(true)"
            ></b-form-input>
          </b-form>
        </b-col>
        <b-col cols="4">
          <v-select
            :options="trangThaiOpt"
            placeholder="Trạng thái"
            :reduce="(text) => text.value"
            label="text"
            v-model="searchForm.trangThai"
            @input="layDanhSachThongBao(true)"
          >
          </v-select>
        </b-col>

        <b-col align="end" v-if="getPermissions('thongbao_tao')">
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
          Tìm thấy {{ danhSachThongBao.totalCount }} kết quả
        </p>
        <b-table
          :fields="fieldNames"
          :items="danhSachThongBao.items"
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
              v-for="field in scope.fields"
              :key="field.key"
              :style="{ width: field.key === 'stt' ? '1%' : '' }"
            />
          </template>
          <template #cell(stt)="row">
            {{ row.index + row.value }}
          </template>
          <template v-slot:cell(content)="row">
            <span v-html="row.item.content"></span>
          </template>
          <template v-slot:cell(publishDate)="row">
            {{ row.item.publishDate | formatDateTime }}
          </template>
          <template v-slot:cell(trangThai)="row">
            {{ row.item.trangThai == 0 ? 'Chưa gửi' : (row.item.trangThai == 1 ? 'Đã gửi' : 'Đã hủy')}}
          </template>
          <template #cell(thaoTac)="row">
            <div class="text-center row">
              <b-col cols="2 mr-3" v-if="getPermissions('thongbao_xem')">
                <b-button @click="openView(row.item)" variant="link">
                  <font-awesome-icon
                    :style="{
                        color: '#2A6EBB',
                        cursor: 'pointer',
                        marginLeft: '5px',
                      }"
                    icon="eye"
                    title="Xem thông báo"
                  />
                </b-button>
              </b-col>
                <b-button v-if="row.item.trangThai == 0 && getPermissions('thongbao_sua')" @click="openEdit(row.item.id)" variant="link">
                  <font-awesome-icon
                    :style="{
                      color: '#2A6EBB',
                      cursor: 'pointer',
                      marginLeft: '5px',
                    }"
                    icon="edit"
                    title="Cập nhật thông báo"
                  />
                </b-button>

            </div>
          </template>
        </b-table>
      </div>
      <BasePagination
        :current-page="danhSachThongBao.pageIndex"
        :total-pages="danhSachThongBao.totalPage"
        :total-rows="danhSachThongBao.totalCount"
        @changeNum="onChangeNum($event)"
        @changePages="onChangePages($event)"
      />
    </form>

  </div>
</template>

<script>
import BasePagination from "@/components/common/BasePagination";
import { mapGetters } from "vuex";
import { ROUTE_NAME, THONG_BAO_TUY_CHINH } from "../../../../constants/constants";
import { getValueFromStorageByKey } from "@/utils/localStorage";

export default {
  name: "DanhSachCanBo",
  components: {
    BasePagination,
  },
  props: {
    idDonViCha: {
      type: String,
      default: "1"
    }
  },
  data() {
    return {
      ROUTE_NAME: ROUTE_NAME,
      ROUTE_DETAIL: ROUTE_NAME.QUAN_LY_DANH_MUC.THONG_BAO_TUY_CHINH.NAME,
      searchForm: {
        keyword: "",
        trangThai: null
      },
      dataEdit: null,
      isEdit: false,
      fieldNames: [
        {
          key: "stt",
          label: "STT",
          formatter: () => {
            return (
              (this.danhSachThongBao.pageIndex - 1) * this.danhSachThongBao.pageSize +
              1
            );
          },
          class: "center "
        },
        {
          key: "title",
          label: "Tiêu đề",
          class: ""
        },
        {
          key: "content",
          label: "Mô tả",
          class: ""
        },
        {
          key: "publishDate",
          label: "Ngày gửi",
          class: "fit-column center"
        },
        {
          key: "trangThai",
          label: "Trạng thái",
          class: "fit-column center"
        },
        {
          key: "thaoTac",
          label: "Thao tác",
          class: "fit-column center"
        },
      ],
      trangThaiOpt: [
        {
          value: null,
          text: "Tất cả"
        },
        {
          value: 0,
          text: "Chưa gửi"
        },
        {
          value: 1,
          text: "Đã gửi"
        },
        {
          value: 2,
          text: "Đã hủy"
        },
      ],
      emptyHeaderTable: [
        THONG_BAO_TUY_CHINH.stt,
        THONG_BAO_TUY_CHINH.userName,
        THONG_BAO_TUY_CHINH.name,
        THONG_BAO_TUY_CHINH.vaiTro,
        THONG_BAO_TUY_CHINH.trangThai,
      ],
    };
  },
  computed: {
    ...mapGetters({
      danhSachThongBao: "thongBaoTuyChinh/danhSachThongBao",
    })
  },
  async created() {
    await this.layDanhSachThongBao();
  },
  methods: {
    onChangeNum(pageSize) {
      this.danhSachThongBao.pageIndex = 1;
      this.danhSachThongBao.pageSize = pageSize;
      this.layDanhSachThongBao();
    },
    onChangePages(page) {
      this.danhSachThongBao.pageIndex = page;
      this.layDanhSachThongBao();
    },
    layDanhSachThongBao(resetPage = false) {
      if (resetPage){
        this.danhSachThongBao.pageIndex = 1;
        this.danhSachThongBao.pageSize = 10;
      }
      let payload = {
        PageIndex: this.danhSachThongBao.pageIndex,
        PageSize: this.danhSachThongBao.pageSize,
        FilterBy: this.searchForm.keyword,
        trangThai: this.searchForm.trangThai
      };

      for (var k in payload) {
        if (payload[k] === null || payload[k] === undefined || payload[k] === "") {
          delete payload[k];
        }
      }

      this.$store.dispatch("thongBaoTuyChinh/layDanhSachThongBao", payload);
    },

    getPermissions(policy){
      let permissions = getValueFromStorageByKey("permissions");
      let checkPermission = permissions.filter(item => item.policy == policy);
      return checkPermission.length > 0 ? true : false;
    },
    openCreate() {
      this.$router.push(this.ROUTE_NAME.QUAN_LY_DANH_MUC.THONG_BAO_TUY_CHINH.TAO);
    },
    openEdit(id) {
      this.$router.push(`/quan-ly-danh-muc/thong-bao/cap-nhat/${id}`);
    },
    openView(item) {
        this.$router.push(
          `${this.ROUTE_DETAIL}/${item.id}`
        );
    },

    successCapNhat(){
      this.layDanhSachThongBao();
    },

    onSuccess() {
      this.layDanhSachThongBao(true);
    }
  },
  watch: {
    "searchForm.keyword": {
      handler(val) {
        if (!val) {
          this.layDanhSachThongBao(true);
        }
      }
    }
  }
};
</script>

<style scoped>
</style>
