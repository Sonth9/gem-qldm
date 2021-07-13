<template>
  <div>
    <div class="row mb-1">
      <div class="form-title col-md-8 col-xs-12 mb-0">
        Danh sách quyền theo người dùng
      </div>
      <div class="col-md-4 col-xs-12">
        <b-button
          class="search-information-btn d-block float-right"
          size="sm"
          @click="moFormThemQuyenVaoNguoiDung()"
          v-if="!readonly"
        >
          Thêm quyền
        </b-button>
        <b-button
          class="search-information-btn d-block float-right mr-1"
          size="sm"
          :disabled="danhSachIdQuyenDaChon.length === 0"
          @click="xoaDanhSachQuyenTheoNguoiDung()"
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
            title="Xóa quyền trong người dùng"
            icon="trash-alt"
            :style="{
              color: '#2A6EBB',
              cursor: 'pointer',
              marginLeft: '10px',
            }"
            @click="xoaQuyenTheoNguoiDung(row.item.id)"
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
    <XoaQuyenThuocNguoiDungModal
      :id="NguoiDungId"
      :deletePermissionIds="deletePermissionIds"
      @xoaQuyenTheoNguoiDungThanhCong="xoaQuyenTheoNguoiDungThanhCong"
    />
    <b-modal
      ref="themQuyenVaoNguoiDungModal"
      centered
      title="Thêm quyền vào người dùng"
      size="xl"
      :hide-footer="true"
    >
      <DanhSachQuyenKhongThuocNguoiDung
        ref="danhSachQuyenKhongThuocNguoiDung"
        @themQuyenVaoNguoiDungThanhCong="themQuyenVaoNguoiDungThanhCong"
        :key="`danh-sach-quyen-${chiTietNguoiDung.Id}`"
        :chiTietNguoiDung="chiTietNguoiDung"
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
import XoaQuyenThuocNguoiDungModal from "@/components/pages/quan-tri-he-thong/quyen/XoaQuyenThuocNguoiDungModal";
import DanhSachQuyenKhongThuocNguoiDung from "@/components/pages/quan-tri-he-thong/quyen/DanhSachQuyenKhongThuocNguoiDung";

export default {
  name: "DanhSachQuyenTheoNguoiDung",
  components: {
    BaseLoadingTable,
    XoaQuyenThuocNguoiDungModal,
    DanhSachQuyenKhongThuocNguoiDung
  },
  data() {
    return {
      danhSachQuyenTheoNguoiDung: [],
      danhSachQuyenNoiBo: [],
      danhSachIdQuyenDaChon: [],
      danhSachIdQuyen: [],
      isLoadingTable: false,
      allPermissions: false,
      deletePermissionIds: [],
      NguoiDungId: null,
      selectAllRowsInPage: false
    };
  },
  props: {
    chiTietNguoiDung: {
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
    this.NguoiDungId = this.$router.currentRoute.params.id;
    this.layDanhSachQuyenTheoNguoiDung(this.$router.currentRoute.params.id);
  },
  computed: {
    ...mapGetters({
      danhSachQuyen: "user/danhSachQuyenTheoNguoiDung"
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
    danhSachQuyen: {
      handler() {
        this.danhSachQuyenNoiBo = this.layDanhSachQuyenNoiBo(
          this.danhSachQuyen
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
    moFormThemQuyenVaoNguoiDung() {
      this.$refs["themQuyenVaoNguoiDungModal"].show();
    },
    hideModal() {
      this.$refs["themQuyenVaoNguoiDungModal"].hide();
    },
    themQuyenVaoNguoiDungThanhCong() {
      this.$refs["themQuyenVaoNguoiDungModal"].hide();
      this.layDanhSachQuyenTheoNguoiDung();
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
    xoaQuyenTheoNguoiDung(id) {
      this.deletePermissionIds = [id];
      this.$bvModal.show("xoa-quyen-theo-nguoi-dung");
    },
    xoaDanhSachQuyenTheoNguoiDung() {
      this.deletePermissionIds = this.danhSachIdQuyenDaChon;
      this.$bvModal.show("xoa-quyen-theo-nguoi-dung");
    },
    xoaQuyenTheoNguoiDungThanhCong() {
      this.$bvModal.hide("xoa-quyen-theo-nguoi-dung");
      this.layDanhSachQuyenTheoNguoiDung();
    },
    layDanhSachQuyenTheoNguoiDung() {
      const payload = { id: this.NguoiDungId };
      this.isLoadingTable = true;
      this.$store
        .dispatch("user/layDanhSachQuyenTheoNguoiDung", payload)
        .then(() => {
          this.isLoadingTable = false;
        });
    },
    layDanhSachQuyenNoiBo(danhSachQuyenTheoNguoiDung) {
      if (_isEmpty(danhSachQuyenTheoNguoiDung)) {
        return [];
      }
      return danhSachQuyenTheoNguoiDung.map(item => {
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
