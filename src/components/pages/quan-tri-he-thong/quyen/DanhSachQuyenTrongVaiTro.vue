<template>
  <div>
    <div class="row mb-1">
      <div class="form-title col-md-8 col-xs-12 mb-0">
        Danh sách quyền trong vai trò
      </div>
      <div class="col-md-4 col-xs-12">
        <b-button
          class="search-information-btn d-block float-right"
          size="sm"
          @click="moFormThemQuyenVaoVaiTro()"
          v-if="!readonly"
        >
          Thêm quyền
        </b-button>
        <b-button
          class="search-information-btn d-block float-right mr-1"
          size="sm"
          :disabled="danhSachIdQuyenDaChon.length === 0"
          @click="xoaDanhSachQuyenTrongVaiTro()"
          v-if="!readonly"
        >
          Xóa quyền đã chọn
        </b-button>
      </div>
    </div>
    <div class="box-form-result">
      <b-table
        striped
        bordered
        responsive
        :no-local-sorting="true"
        :items="danhSachQuyenNoiBo"
        :fields="fieldName"
        :busy="isLoadingTable"
      >
        <template v-slot:head()="scope">
          <div class="d-inline-block">
            {{ scope.label }}
          </div>
        </template>
        <template v-slot:head(checkbox)="">
          <b-form-checkbox
            id="check-all-items-in-role"
            name="checkbox_all_items_in_role"
            :value="true"
            :unchecked-value="false"
            v-model="selectAllRowsInPage"
          />
        </template>
        <template v-slot:cell(checkbox)="row">
          <b-form-checkbox
            v-model="danhSachIdQuyenDaChon"
            :value="row.item.id"
            name="selected-rows"
          >
          </b-form-checkbox>
        </template>
        <template v-slot:cell(thaoTac)="row">
          <font-awesome-icon
            title="Xóa quyền trong vai trò"
            icon="trash-alt"
            :style="{
              color: '#2A6EBB',
              cursor: 'pointer',
              marginLeft: '10px',
            }"
            @click="xoaQuyenTrongVaiTro(row.item.id)"
          />
        </template>
        <template v-slot:table-colgroup="scope">
          <col
            v-for="field in scope.fields"
            :key="field.key"
            :style="{
              width:
                field.key === 'checkbox'
                  ? '3%'
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
    </div>
    <XoaQuyenTrongVaiTroModal
      :id="vaiTroId"
      :deletePermissionIds="deletePermissionIds"
      @xoaQuyenTrongVaiTroThanhCong="xoaQuyenTrongVaiTroThanhCong"
    />
    <b-modal
      ref="themQuyenVaoVaiTroModal"
      centered
      title="Thêm quyền vào vai trò"
      size="xl"
      :hide-footer="true"
    >
      <DanhSachQuyenKhongThuocVaiTro
        ref="danhSachQuyenKhongThuocVaiTro"
        @themQuyenVaoVaiTroThanhCong="themQuyenVaoVaiTroThanhCong"
        :key="`danh-sach-quyen-${chiTietVaiTro.Id}`"
        :chiTietVaiTro="chiTietVaiTro"
      />
    </b-modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import _isEmpty from "lodash/isEmpty";
import { BANG_DANH_SACH_QUYEN } from "@/constants/constants";
import BaseLoadingTable from "@/components/common/BaseLoadingTable";
import _isNil from "lodash/isNil";
import XoaQuyenTrongVaiTroModal from "@/components/pages/quan-tri-he-thong/quyen/XoaQuyenTrongVaiTroModal";
import DanhSachQuyenKhongThuocVaiTro from "@/components/pages/quan-tri-he-thong/quyen/DanhSachQuyenKhongThuocVaiTro";

export default {
  name: "DanhSachQuyenTrongVaiTro",
  components: {
    BaseLoadingTable,
    XoaQuyenTrongVaiTroModal,
    DanhSachQuyenKhongThuocVaiTro
  },
  data() {
    return {
      danhSachQuyenTrongVaiTro: [],
      danhSachQuyenNoiBo: [],
      danhSachIdQuyenDaChon: [],
      danhSachIdQuyen: [],
      isLoadingTable: false,
      allPermissions: false,
      deletePermissionIds: [],
      vaiTroId: null,
      selectAllRowsInPage: false
    };
  },
  props: {
    chiTietVaiTro: {
      type: Object,
      required: true
    },
    readonly: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Boolean | null,
      required: false
    }
  },
  created() {
    this.vaiTroId = this.$router.currentRoute.params.id;
    this.layDanhSachQuyenTheoVaiTro(this.$router.currentRoute.params.id);
  },
  computed: {
    ...mapGetters({
      danhSachQuyenTheoVaiTro: "role/danhSachQuyenTheoVaiTro"
    }),
    fieldName() {
      return this.getFieldName();
    },
    danhSachQuyenDaChon: {
      get: function() {
        let danhSachQuyen = this.danhSachQuyenNoiBo.filter(quyen =>
          this.danhSachIdQuyenDaChon.includes(quyen.Id)
        );

        return danhSachQuyen.map((quyenDaChon, index) => {
          return Object.assign({}, quyenDaChon, {}, { stt: index + 1 });
        });
      },
      set: function() {}
    }
  },
  watch: {
    danhSachQuyenTheoVaiTro: {
      handler() {
        this.danhSachQuyenNoiBo = this.layDanhSachQuyenNoiBo(
          this.danhSachQuyenTheoVaiTro
        );
        this.danhSachIdQuyen = this.layDanhSachIdQuyen(this.danhSachQuyenNoiBo);
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
  methods: {
    moFormThemQuyenVaoVaiTro() {
      this.$refs["themQuyenVaoVaiTroModal"].show();
    },
    hideModal() {
      this.$refs["themQuyenVaoVaiTroModal"].hide();
    },
    themQuyenVaoVaiTroThanhCong() {
      this.$refs["themQuyenVaoVaiTroModal"].hide();
      this.layDanhSachQuyenTheoVaiTro();
    },
    clickSelectAllRowInPage() {
      if (this.selectAllRowsInPage) {
        this.$set(
          this,
          "danhSachIdQuyenDaChon",
          this.danhSachIdQuyenDaChon.concat(this.danhSachIdQuyen)
        );
        this.$set(this, "danhSachIdQuyenDaChon", [
          ...new Set(this.danhSachIdQuyenDaChon)
        ]);
      } else {
        this.danhSachIdQuyenDaChon = this.danhSachIdQuyenDaChon.filter(
          id => !this.danhSachIdQuyen.includes(id)
        );
      }
    },
    layDanhSachIdQuyen(danhSachQuyen) {
      if (_isEmpty(danhSachQuyen)) {
        return [];
      }
      return danhSachQuyen.map(item => item.id);
    },
    xoaQuyenTrongVaiTro(id) {
      this.deletePermissionIds = [id];
      this.$bvModal.show("xoa-quyen-trong-vai-tro");
    },
    xoaDanhSachQuyenTrongVaiTro() {
      this.deletePermissionIds = this.danhSachIdQuyenDaChon;
      this.$bvModal.show("xoa-quyen-trong-vai-tro");
    },
    xoaQuyenTrongVaiTroThanhCong() {
      this.$bvModal.hide("xoa-quyen-trong-vai-tro");
      this.layDanhSachQuyenTheoVaiTro();
    },
    layDanhSachQuyenTheoVaiTro() {
      const payload = { id: this.vaiTroId };
      this.isLoadingTable = true;
      this.$store
        .dispatch("role/layDanhSachQuyenTheoVaiTro", payload)
        .then(() => {
          this.isLoadingTable = false;
        });
    },
    layDanhSachQuyenNoiBo(danhSachQuyenTheoVaiTro) {
      if (_isEmpty(danhSachQuyenTheoVaiTro)) {
        return [];
      }
      return danhSachQuyenTheoVaiTro.map(item => {
        return {
          checkbox: null,
          id: _isNil(item) ? "" : item.id,
          name: _isNil(item) ? "" : item.name,
          displayName: _isNil(item) ? "" : item.displayName,
          thaoTac: null
        };
      });
    },
    getFieldName() {
      if (_isEmpty(this.danhSachQuyenNoiBo)) {
        return [];
      }
      return Object.keys(this.danhSachQuyenNoiBo[0])
        .filter(
          key =>
            key !== "id" &&
            (!["checkbox", "thaoTac"].includes(key) || !this.readonly)
        )
        .map(key => {
          return {
            key: key,
            label: BANG_DANH_SACH_QUYEN[key],
            tdClass: ["checkbox"].includes(key) ? "center" : ""
          };
        });
    }
  }
};
</script>

<style scoped>
</style>
