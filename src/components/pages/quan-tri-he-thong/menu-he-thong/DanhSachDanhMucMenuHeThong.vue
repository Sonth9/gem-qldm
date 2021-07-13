<template>
  <div>
    <b-form-group class="border-bottom-form">
      <b-row align-v="center" class="pb-3">
        <b-col cols="5">
          <v-select :options="danhSachDanhMucHeThong"
                    :reduce="text => text.id"
                    label="heThong"
                    v-model="filter"
                    :clearable="false"
          v-if="!treeDisplay">
          </v-select>
        </b-col>
        <b-col align="end">
          <b-button @click="treeDisplay=true" class="mr-2" title="Thay đổi thứ tự hiển thị" variant="link">
            <img alt="Thay đổi thứ tự hiển thị" src="@/assets/icon/file-tree.png">
          </b-button>
          <b-button @click="treeDisplay=false" class="mr-2" title="Danh sách danh mục menu" variant="link">
            <img alt="Danh sách danh mục menu" src="@/assets/icon/format-align-justify.png">
          </b-button>
          <b-button @click="openCreate" variant="info">
            <b-icon icon="plus"></b-icon>
            Thêm mới
          </b-button>
        </b-col>
      </b-row>
    </b-form-group>
    <div v-show="!treeDisplay">
      <p class="color-gray-1">Tìm thấy {{ danhSachMenu.length }} kết quả</p>
      <div class="table-responsive">
        <table class="table b-table table-striped table-bordered">
          <thead class="center">
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Tên menu</th>
            <th scope="col">Tên Hệ thống</th>
            <th scope="col"  class="fit-column" >Số cấp</th>
            <th scope="col">Mô tả</th>
            <th scope="col">Url</th>
            <th scope="col">Thao tác</th>
          </tr>
          </thead>
          <tbody>
          <tr :key="item.name" role="row" v-for="(item) in danhSachMenu">
            <td class=" fit-column center" role="cell">{{ item.index }}</td>
            <td class="fit-column" role="cell">
            <span :class="'ml-fix-'+ item.level  " v-if="item.level">
              <b-icon class="mr-2" font-scale="1.5" icon="arrow-return-right"></b-icon>{{ item.tenMenu }}
            </span>
              <span v-else>{{ item.tenMenu }}</span>
            </td>
            <td class="fit-column" role="cell">{{ hienThiTenHeThong(item.iD_HeThong) }}</td>
            <td role="cell" class="center">{{ item.soCap }}</td>
            <td role="cell">{{ item.moTa }}</td>
            <td class="fit-column" role="cell"><a :href="item.url" :title="item.url">{{ subStr(item.url) }}</a></td>
            <td class="fit-column" role="cell">
              <div class="text-center">
                <b-button @click="openEdit(item)" variant="link">
                  <font-awesome-icon
                    :style="{
                    color: '#2A6EBB',
                    cursor: 'pointer',
                    marginLeft: '5px',
                  }"
                    icon="edit"
                    title="Cập nhật menu"
                  />
                </b-button>
                <b-button @click="openDelete(item)" variant="link">
                  <font-awesome-icon
                    :style="{
                    color: '#2A6EBB',
                    cursor: 'pointer',
                    marginLeft: '5px',
                  }"
                    icon="trash"
                    title="Xóa menu"
                  />
                </b-button>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-show="treeDisplay">
      <b-row>
        <b-col align="end">
          <b-button @click="cancelOrder" class="mr-3">
            Hủy bỏ
          </b-button>
          <b-button @click="capNhatThuTu" variant="info">
            Cập nhật
          </b-button>
        </b-col>
      </b-row>
      <p class="drag-note"> ※ Kéo thả để thay đổi thứ tự hiển thị menu.</p>
      <nested-draggable :items="cayDanhMucMenu"/>
      <b-row>
        <b-col align="end">
          <b-button @click="cancelOrder" class="mr-3">
            Hủy bỏ
          </b-button>
          <b-button @click="capNhatThuTu" variant="info">
            Cập nhật
          </b-button>
        </b-col>
      </b-row>
    </div>

    <ModalCapNhatDanhMucMenuHeThong :data="menuDaChon"
                                    :is-edit.sync="isEdit"
                                    :menu.sync="menuCha"
                                    @hidden="isEdit=false"
                                    @success="layCayDanhMucMenu"
                                    ref="modalCapNhatDanhMucMenuHeThong"/>
    <ModalConfirm :title="menuDaChon.tenMenu" @confirmed="xoaMenu"/>

  </div>
</template>

<script>
import ModalConfirm from "@/components/modal/ModalConfirm";
import ModalCapNhatDanhMucMenuHeThong from "./modalCapNhatDanhMucMenuHeThong";
import nestedDraggable from "@/components/common/BaseDragNested";
import { NO_RESULTS_TEXT, ROUTE_NAME } from "@/constants/constants";
import { mapGetters } from "vuex";

export default {
  name: "DanhSachDanhMucMenuHeThong",
  components: {
    ModalCapNhatDanhMucMenuHeThong,
    ModalConfirm,
    nestedDraggable
  },
  data() {
    return {
      ROUTE_NAME: ROUTE_NAME,
      NO_RESULTS_TEXT: NO_RESULTS_TEXT,
      filter: null,
      danhSachMenu: [],
      menuCha: [],
      menuDaChon: {},
      isEdit: false,
      treeDisplay: false
    };
  },
  created() {
    this.layDanhSachDanhMucHeThong();
    this.layCayDanhMucMenu();
  },
  computed: {
    ...mapGetters({
      danhSachDanhMucHeThong: "dmHeThong/danhSachDanhMucHeThong",
      cayDanhMucMenu: "dmMenuHeThong/cayDanhMucMenu"
    })
  },
  methods: {
    layCayDanhMucMenu() {
      this.$store.dispatch("dmMenuHeThong/layCayDanhMucMenuHeThong");
    },
    layDanhSachDanhMucHeThong() {
      this.$store.dispatch("dmHeThong/layDanhSachdmHeThong");
    },
    hienThiTenHeThong(id) {
      const index = this.danhSachDanhMucHeThong.findIndex(
        obj => obj.id === parseInt(id)
      );
      return (
        (this.danhSachDanhMucHeThong[index] &&
          this.danhSachDanhMucHeThong[index].heThong) ||
        ""
      );
    },
    layDanhSachMenu(data) {
      this.danhSachMenu = this.hierarchyToFlat(data);
    },
    hierarchyToFlat(data, menuParent = [], level = 0) {
      let menu = [];
      let index = 0
      let subIndex = "";
      if (menuParent.length > 0) {
        menu = menuParent;
        subIndex = menuParent[menuParent.length - 1].index;
      }
      data.forEach((item) => {
        if (item.item.iD_HeThong === this.filter) {
          menu.push(
            Object.assign({}, item.item, {
              level: level,
              index: subIndex ? `${subIndex}.${index + 1}` : index + 1
            })
          );
          if (item.children && item.children.length > 0) {
            menu = this.hierarchyToFlat(item.children, menu, level + 1);
          }
          index++;
        }
      });
      return menu;
    },
    capNhatThuTu() {
      let listUpdate = this.layThuTu(this.cayDanhMucMenu);
      let payload = new FormData();
      payload.append("arrangeRequest", JSON.stringify(listUpdate));
      this.$store.dispatch("dmMenuHeThong/capNhatThuTu", {
        data: payload
        // onSuccess: null
      });
    },
    layThuTu(data, menuCha, menus = [], level = 1) {
      let menu = [];
      if (menus.length > 0) {
        menu = menus;
      }
      data.forEach(item => {
        menu.push({
          Id: item.item.id,
          ThuTu: level,
          iD_MenuCha: menuCha || 0
        });
        if (item.children && item.children.length > 0) {
          menu = this.layThuTu(item.children, item.item.id, menu);
        }
        level++;
      });
      return menu;
    },
    cancelOrder() {
      this.treeDisplay = false;
      this.layCayDanhMucMenu();
    },
    setTreeLevelLimits(data, isChild = false) {
      let cls = "";
      if (isChild) {
        cls = "no-drag";
      }
      data.forEach((item, index) => {
        item.class = cls;
        item.name = item.item.tenMenu;
        if (item.children && item.children.length > 0) {
          data[index].children = this.setTreeLevelLimits(item.children, true);
        }
      });
      return data;
    },
    openCreate() {
      this.isEdit = false;
      this.$refs[
        "modalCapNhatDanhMucMenuHeThong"
      ].$refs.modalCapNhatDanhMucMenuHeThong.show();
    },
    openEdit(item) {
      this.menuDaChon = item;
      this.isEdit = true;
      this.$refs[
        "modalCapNhatDanhMucMenuHeThong"
      ].$refs.modalCapNhatDanhMucMenuHeThong.show();
    },
    openDelete(item) {
      this.menuDaChon = item;
      this.$bvModal.show("modal-confirm");
    },
    xoaMenu(confirm) {
      if (confirm) {
        this.$store.dispatch("dmMenuHeThong/xoaDanhMucMenuHeThong", {
          data: { id: this.menuDaChon.id },
          onSuccess: this.onSuccess
        });
        this.$bvModal.hide("modal-confirm");
      }
    },
    onSuccess() {
      this.layCayDanhMucMenu();
    },
    subStr(value) {
      return value ? value.substr(0, 30) + "..." : "";
    },
    setFilterDefault() {
      this.filter = this.danhSachDanhMucHeThong[0].id;
    }
  },
  watch: {
    cayDanhMucMenu: {
      handler() {
        this.layDanhSachMenu(this.cayDanhMucMenu);
        this.setTreeLevelLimits(this.cayDanhMucMenu);
        this.menuCha = this.cayDanhMucMenu.map(item => item.item);
      }
    },
    danhSachDanhMucHeThong: {
      handler() {
        this.setFilterDefault();
      }
    },
    filter: {
      handler(value) {
        if (!value) {
          this.setFilterDefault();
        } else {
          this.layDanhSachMenu(this.cayDanhMucMenu);
        }
      }
    }
  }
};
</script>

<style scoped>
</style>
