<template>
  <div>
    <b-form-group class="border-bottom-form">
      <b-row align-v="center" class="pt-2 pb-2">
        <b-col cols="4">
          <b-form @submit.prevent="onTyping">
            <b-form-input
              @keyup="onTyping"
              class="border-radius-4"
              id="search"
              placeholder="Nhập tên đơn vị"
              trim
              type="text"
              v-model="filterForm.keyWord"
            ></b-form-input>
          </b-form>
        </b-col>
      </b-row>
      <b-row align-h="end" class="pb-3">
        <b-col align-self="end" cols="auto">
          <b-button @click="openCreate" v-if="hasPermissionCreate" variant="info">
            <b-icon icon="plus"></b-icon>
            Thêm mới
          </b-button>
        </b-col>
      </b-row>
    </b-form-group>
    <div>
      <p class="color-gray-1">
        Tìm thấy {{ danhSachDonViPhanTrang.totalCount }} kết quả
      </p>
      <div class="table-responsive">
        <table class="table b-table table-striped table-bordered">
          <thead class="center">
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Tên đơn vị</th>
            <th scope="col">Mã đơn vị</th>
            <th scope="col">Số điện thoại</th>
            <th scope="col">Mail</th>
            <th scope="col">Fax</th>
            <th scope="col">Tác vụ</th>
          </tr>
          </thead>
          <tbody>
          <tr :key="item.name" role="row" v-for="item in danhSachDonVi">
            <td class="fit-column center" role="cell">
              {{ getIndex((danhSachDonViPhanTrang.pageIndex - 1) * danhSachDonViPhanTrang.pageSize, item.index)}}
            </td>
            <td class="fit-column" role="cell">
              <span :class="'ml-fix-' + (item.capDonVi - getMargin)"></span>
              <b-button
                @click="layDanhSachTheoDonViCha(item.id)"
                v-if="item.soDonViTrucThuoc > 0"
                variant="link"
              >
                <font-awesome-icon
                  :icon="isOpenExpand(item.id)"
                  :style="{
                      color: '#2A6EBB',
                      cursor: 'pointer',
                      marginLeft: '5px',
                    }"
                  title="Cập nhật"
                />
              </b-button>
              <span class="lone" v-else></span>
              <router-link :to="{name: ROUTE_NAME.QUAN_LY_DANH_MUC.DON_VI.XEM, params: {id: item.id}}">
                {{ item.tenDonVi }}
              </router-link>

            </td>
            <td class="" role="cell">
              {{ item.maDonVi }}
            </td>
            <td class="center" role="cell">{{ item.soDienThoai }}</td>
            <td role="cell">{{ item.email }}</td>
            <td class="center" role="cell">{{ item.fax }}</td>
            <td class="fit-column" role="cell">
              <div class="text-center">
                <b-button @click="openView(item)" variant="link">
                  <font-awesome-icon
                    :style="{
                        color: '#2A6EBB',
                        cursor: 'pointer',
                        marginLeft: '5px',
                      }"
                    icon="eye"
                    title="Xem"
                  />
                </b-button>
                <b-button @click="openEdit(item)" v-if="hasPermissionEdit" variant="link">
                  <font-awesome-icon
                    :style="{
                        color: '#2A6EBB',
                        cursor: 'pointer',
                        marginLeft: '5px',
                      }"
                    icon="edit"
                    title="Cập nhật"
                  />
                </b-button>
                <b-button @click="openDelete(item)" v-if="hasPermissionDelete" variant="link">
                  <font-awesome-icon
                    :style="{
                        color: '#2A6EBB',
                        cursor: 'pointer',
                        marginLeft: '5px',
                      }"
                    icon="trash"
                    title="Xóa"
                  />
                </b-button>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <BasePagination
        :current-page="danhSachDonViPhanTrang.pageIndex"
        :total-pages="danhSachDonViPhanTrang.totalPage"
        :total-rows="danhSachDonViPhanTrang.totalCount"
        @changeNum="onChangeNum($event)"
        @changePages="onChangePages($event)"
        class="mt-1"
      />
    </div>
    <ModalConfirm :title="donViDaChon.tenDonVi" @confirmed="xoaDonVi"/>
    <ModalCapNhatDonVi :data="donViDaChon" :is-edit.sync="isEdit" @hidden="isEdit=false" @success="onSuccess"/>
  </div>
</template>

<script>
  import BasePagination from "@/components/common/BasePagination";
  import ModalConfirm from "@/components/modal/ModalConfirm";
  import { NO_RESULTS_TEXT, PERMISSION_NAME, ROUTE_NAME } from "@/constants/constants";
  import { hasPermission } from "@/utils/permissionUtils";
  import { debounce } from "lodash";
  import { mapGetters } from "vuex";
  import ModalCapNhatDonVi from "./ModalCapNhatDonVi";

  export default {
    name: "DanhSachDanhMucMenuHeThong",
    components: {
      BasePagination,
      ModalConfirm,
      ModalCapNhatDonVi
    },
    data() {
      return {
        PERMISSION_NAME: PERMISSION_NAME,
        filterForm: {
          donVi: null,
          phongBan: null,
          keyWord: null,
          isAsc: true,
        },
        ROUTE_NAME: ROUTE_NAME,
        NO_RESULTS_TEXT: NO_RESULTS_TEXT,
        danhSachDonVi: [],
        openDonVi: [],
        donViDaChon: {},
        idDaChon: null,
        getMargin: 0,
        isEdit: false
      };
    },
    created() {
      this.layDanhSachDonViPhanTrang(true);
    },
    computed: {
      ...mapGetters({
        permissions: "common/permissions",
        danhSachDonViPhanTrang: "donVi/danhSachDonViPhanTrang",
        danhSachDonViCon: "donVi/danhSachDonViCon"
      }),
      hasPermissionCreate() {
        return this.checkAuth(PERMISSION_NAME.DON_VI.THEM)
      },
      hasPermissionEdit() {
        return this.checkAuth(PERMISSION_NAME.DON_VI.SUA)
      },
      hasPermissionDelete() {
        return this.checkAuth(PERMISSION_NAME.DON_VI.XOA)
      }
    },
    methods: {
      isOpenExpand(id) {
        return this.openDonVi.indexOf(id) >= 0 ? 'minus' : 'plus';
      },
      layDanhSachTheoDonViCha(id) {
        this.$store.dispatch("donVi/layDanhSachTheoDonViCha", {
          idDonViCha: id,
          soCap: 1
        });
        this.idDaChon = id;
      },
      layDanhSachDonViPhanTrang(resetPage = false) {
        if (resetPage) {
          this.danhSachDonViPhanTrang.pageIndex = 1;
          this.danhSachDonViPhanTrang.pageSize = 10;
        }

        this.$store.dispatch(
          "donVi/layDanhSachDonViPhanTrang",
          this.getPagination()
        );
      },
      onTyping: debounce(function () {
        this.layDanhSachDonViPhanTrang(true);
      }, 350),
      getPagination() {
        return {
          FilterBy: this.filterForm.keyWord,
          pageIndex: this.danhSachDonViPhanTrang.pageIndex,
          pageSize: this.danhSachDonViPhanTrang.pageSize,
          isAsc: this.filterForm.isAsc
        };
      },
      layDanhSachDonVi(data) {
        this.danhSachDonVi = this.getDataFromTree(data);
      },
      getDataFromTree(data, dataParent = [], level = 0) {
        let menu = [];
        let subIndex = "";
        if (dataParent.length > 0) {
          menu = dataParent;
          subIndex = dataParent[dataParent.length - 1].index;
        }
        data.forEach((item, index) => {
          menu.push(
            Object.assign({}, item, {
              index: subIndex
                ? `${subIndex}.${index + 1}`
                : index + 1
            })
          );
          if (item.children && item.children.length > 0) {
            menu = this.getDataFromTree(item.children, menu, level + 1);
          }
        });
        return menu;
      },
      openCreate() {
        this.isEdit = false;
        this.$bvModal.show("modal-cap-nhat-don-vi");
      },
      openEdit(item) {
        this.donViDaChon = item;
        this.isEdit = true;
        this.$bvModal.show("modal-cap-nhat-don-vi");
      },
      openView(item) {
        this.$router.push({
          name: ROUTE_NAME.QUAN_LY_DANH_MUC.DON_VI.XEM,
          params: {id: item.id}
        });
      },
      openDelete(item) {
        this.donViDaChon = item;
        this.$bvModal.show("modal-confirm");
      },
      onSuccess() {
        this.openDonVi = []
        this.layDanhSachDonViPhanTrang();
      },
      xoaDonVi(confirm) {
        if (confirm) {
          this.$store.dispatch("donVi/xoaDonVi", {
            data: {id: this.donViDaChon.id},
            onSuccess: this.onSuccess
          });
          this.$bvModal.hide("modal-confirm");
        }
      },
      subStr(value) {
        return value ? value.substr(0, 30) + "..." : "";
      },
      updateList(child, indices, value) {
        indices.reduce((o, i) => o.child[i], {child}).text = value;
      },
      onChangeNum(pageSize) {
        this.danhSachDonViPhanTrang.pageIndex = 1;
        this.danhSachDonViPhanTrang.pageSize = pageSize;
        this.layDanhSachDonViPhanTrang();
      },
      onChangePages(page) {
        this.danhSachDonViPhanTrang.pageIndex = page;
        this.layDanhSachDonViPhanTrang();
      },
      loadMargin() {
        let min = 10;
        this.danhSachDonViPhanTrang.items.forEach(function iter(a) {
          if (a.capDonVi < min) {
            min = a.capDonVi;
          }
          Array.isArray(a.children) && a.children.forEach(iter);
        });
        this.getMargin = min;
      },
      checkAuth(permission) {
        return hasPermission(this.permissions, permission)
      },
      getIndex(page, index) {
        if (typeof index == 'string' && index.includes('.')) {
          let prIndex = index.substring(0, index.indexOf('.'));
          let subIndex = index.substring(index.indexOf('.'), index.length)
          return Number.parseInt(page) + Number.parseInt(prIndex) + `${subIndex}`
        } else {
          return Number.parseInt(page) + Number.parseInt(index)
        }
      }
    },
    watch: {
      danhSachDonViPhanTrang: {
        handler: function () {
          this.layDanhSachDonVi(this.danhSachDonViPhanTrang.items);
          this.loadMargin();
        },
        deep: true
      },
      danhSachDonViCon: function (val) {
        if (val.length > 0) {
          let insertValue = [];
          if (this.openDonVi.indexOf(this.idDaChon) < 0) {
            this.openDonVi.push(this.idDaChon);
            insertValue = val;
          } else {
            let index = this.openDonVi.indexOf(this.idDaChon);
            if (index !== -1) {
              this.openDonVi.splice(index, 1);
            }
          }
          let ids = [this.idDaChon];
          this.danhSachDonViPhanTrang.items.forEach(function iter(a) {
            if (ids.includes(a.id)) {
              a.children = insertValue;
            }
            Array.isArray(a.children) && a.children.forEach(iter);
          });
          this.layDanhSachDonVi(this.danhSachDonViPhanTrang.items);
          this.loadMargin();
        }
      }
    }
  };
</script>

<style scoped>
  .lone {
    margin-left: 3rem !important;
  }
</style>

<style lang="scss">
  // tr:nth-child(odd) {
  //   td:nth-child(1), td:nth-child(2) {
  //     background: white !important;
  //   }
  // }
</style>
