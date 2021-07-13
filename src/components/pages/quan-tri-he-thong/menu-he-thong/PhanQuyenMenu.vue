<template>
  <div>
    <b-row class="pb-3">
      <b-col cols="4">
        <b-form-input
          class="border-radius-4"
          id="search"
          placeholder="Tìm kiếm"
          trim
          type="text"
          v-model="filter"
        ></b-form-input>
      </b-col>
      <b-col align="end">
        <b-button @click="capNhatMenu" v-if="!isView" variant="info">
          Cập nhật
        </b-button>
      </b-col>
    </b-row>
    <b-table :fields="fieldNames"
             :filter="filter"
             :filter-function="filterTable"
             :items="menus"
             :no-local-sorting="true"
             bordered
             striped>
      <template v-slot:table-colgroup="scope">
        <col
          :key="field.key"
          :style="{ width: field.key === 'index' ? '3%' : '' }"
          v-for="field in scope.fields"
        />
      </template>
      <template #cell(tenMenu)="row">
        <span :class="'ml-fix-'+ row.item.level " v-if="row.item.level">
              <b-icon class="mr-2" font-scale="1.5" icon="arrow-return-right"></b-icon>{{ row.value }}
        </span>
        <span v-else>{{ row.value }}</span>
      </template>
      <template #cell(heThong)="row">
        {{ hienThiHeThong(row.value) }}
      </template>
      <template #cell(xem)="row">
        <b-form-checkbox :checked="menus[row.index].xem" :disabled="isView"
                         switch v-model="menus[row.index].xem"></b-form-checkbox>
      </template>
      <template #cell(capNhat)="row">
        <b-form-checkbox :checked="menus[row.index].capNhat" :disabled="isView"
                         switch v-model="menus[row.index].capNhat"></b-form-checkbox>
      </template>
      <template #cell(xoa)="row">
        <b-form-checkbox :checked="menus[row.index].xoa" :disabled="isView"
                         switch v-model="menus[row.index].xoa"></b-form-checkbox>
      </template>
      <template #cell(duyet)="row">
        <b-form-checkbox :checked="menus[row.index].duyet" :disabled="isView"
                         switch v-model="menus[row.index].duyet"></b-form-checkbox>
      </template>
    </b-table>
    <b-row align-h="end" class="pb-3">
      <b-col align-self="end" cols="auto">
        <b-button @click="capNhatMenu" v-if="!isView" variant="info">
          Cập nhật
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { findIndex, isEmpty } from "lodash";
import { stringToSlug } from "@/utils/convertData";

export default {
  name: "PhanQuyenMenu",
  props: {
    dataMenus: Array,
    isView: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      index: 0,
      filter: null,
      filterOn: ["tenMenu", "heThong"],
      fieldNames: [
        {
          key: "index",
          label: "STT"
        },
        {
          key: "tenMenu",
          label: "Tên Menu"
        },
        {
          key: "heThong",
          label: "Hệ thống",
          class: "fit-column"
        },
        {
          key: "xem",
          label: "Xem",
          class: "center fit-column"
        },
        {
          key: "capNhat",
          label: "Sửa",
          class: " center fit-column"
        },
        {
          key: "xoa",
          label: "Xóa",
          class: " center fit-column"
        },
        {
          key: "duyet",
          label: "Duyệt",
          class: " center fit-column"
        }
      ],
      menusUpdate: []
    };
  },
  computed: {
    ...mapGetters({
      dsHeThong: "dmHeThong/danhSachDanhMucHeThong",
      dmMenu: "dmMenuHeThong/cayDanhMucMenu"
    }),
    menus() {
      let menus = this.getDataFromTree(this.dmMenu);
      return this.mapMenus(menus, !isEmpty(this.dataMenus));
    }
  },
  created() {
    if (isEmpty(this.dsHeThong)) {
      this.layDanhSachDanhMucHeThong();
    }
    if (isEmpty(this.dmMenu)) {
      this.$store.dispatch("dmMenuHeThong/layCayDanhMucMenuHeThong");
    }
  },
  methods: {
    layDanhSachDanhMucHeThong() {
      this.$store.dispatch("dmHeThong/layDanhSachdmHeThong");
    },
    capNhatMenu() {
      let menus = [];
      this.menus.forEach(item => {
        menus.push({
          ID_Menu: item.iD_Menu,
          Bit_Xem: item.xem,
          Bit_CapNhat: item.capNhat,
          Bit_Duyet: item.duyet,
          Bit_Xoa: item.xoa
        });
      });

      this.$emit("updateMenu", menus);
    },
    hienThiHeThong(id) {
      let index = findIndex(this.dsHeThong, { id: id });
      return this.dsHeThong[index] ? this.dsHeThong[index].heThong : "";
    },
    filterTable(row, filter) {
      if (
        stringToSlug(row.tenMenu).includes(stringToSlug(filter)) ||
        stringToSlug(this.hienThiHeThong(row.heThong)).includes(
          stringToSlug(filter)
        )
      ) {
        return true;
      } else {
        return false;
      }
    },
    getDataFromTree(data, menuParent = [], level = 0) {
      let menu = [];
      let subIndex = "";
      if (menuParent.length > 0) {
        menu = menuParent;
        subIndex = menuParent[menuParent.length - 1].index;
      }
      data.forEach((item, index) => {
        menu.push(
          Object.assign({}, item.item, {
            level: level,
            index: subIndex ? `${subIndex}.${index + 1}` : index + 1
          })
        );
        if (item.children && item.children.length > 0) {
          menu = this.getDataFromTree(item.children, menu, level + 1);
        }
      });
      return menu;
    },
    mapMenus(dmMenu, hasData = false) {
      return dmMenu.map(menu => {
        let item = {
          iD_Menu: menu.id,
          heThong: menu.iD_HeThong,
          tenMenu: menu.tenMenu,
          level: menu.level,
          index: menu.index,
          xem: false,
          capNhat: false,
          xoa: false,
          duyet: false
        };
        if (hasData) {
          let index = findIndex(this.dataMenus, { iD_Menu: menu.id });
          if (index >= 0) {
            item = Object.assign({}, item, {
              xem: this.dataMenus[index].xem,
              capNhat: this.dataMenus[index].capNhat,
              xoa: this.dataMenus[index].xoa,
              duyet: this.dataMenus[index].duyet
            });
          }
        }
        return item;
      });
    }
  }
};
</script>

<style scoped>
</style>
