import BasePagination from "@/components/common/BasePagination";
import BaseLoadingTable from "@/components/common/BaseLoadingTable";
import BaseEmptyTable from "@/components/common/BaseEmptyTable";
import _isEmpty from "lodash/isEmpty";
import _isNil from "lodash/isNil";
import { BANG_NGUOI_DUNG } from "@/constants/constants";

/**This mixins to common code DanhSachNguoiDungTheoVaiTro & DanhSachNguoiDungHeThong components**/
export default {
  components: {
    BasePagination,
    BaseLoadingTable,
    BaseEmptyTable
  },
  data() {
    return {
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
      danhSachIdNguoiDungDaChon: [],
      danhSachIdNguoiDung: [],
      emptyHeaderTable: [
        BANG_NGUOI_DUNG.stt,
        BANG_NGUOI_DUNG.name,
        BANG_NGUOI_DUNG.userName,
        BANG_NGUOI_DUNG.thaoTac
      ],
      selectAllRowsInPage: false,
      vaiTroId: null
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
  computed: {
    danhSachNguoiDungNoiBo() {
      return this.layDanhSachNguoiDungNoiBo(this.danhSachNguoiDung);
    },
    fieldName() {
      return this.getFieldName();
    },
    hasPageData() {
      return !_isEmpty(this.danhSachNguoiDung.items);
    },
    danhSachNguoiDungDaChon: {
      get: function() {
        let danhSachNguoiDung = this.danhSachNguoiDungNoiBo.filter(nguoiDung =>
          this.danhSachIdNguoiDungDaChon.includes(nguoiDung.id)
        );

        return danhSachNguoiDung.map((nguoiDungDaChon, index) => {
          return Object.assign({}, nguoiDungDaChon, {}, { stt: index + 1 });
        });
      },
      set: function() {}
    }
  },
  created() {
    this.vaiTroId = this.$router.currentRoute.params.id;
    this.layDanhSachNguoiDung();
  },
  watch: {
    danhSachNguoiDung: {
      handler() {
        this.totalPages = this.danhSachNguoiDung.totalPage;
        this.totalRows = _isNil(this.danhSachNguoiDung.totalCount)
          ? 0
          : this.danhSachNguoiDung.totalCount;
        this.danhSachIdNguoiDung = this.layDanhSachIdNguoiDung(
          this.danhSachNguoiDung
        );
        this.clickSelectAllRowsInPage();
      },
      immediate: true
    },
    "requestInformation.pageIndex": {
      handler() {
        this.layDanhSachNguoiDung();
      }
    },
    selectAllRowsInPage: {
      handler() {
        this.clickSelectAllRowsInPage();
      }
    }
  },
  methods: {
    clickSelectAllRowsInPage() {
      if (this.selectAllRowsInPage) {
        this.$set(
          this,
          "danhSachIdNguoiDungDaChon",
          this.danhSachIdNguoiDungDaChon.concat(this.danhSachIdNguoiDung)
        );
        this.$set(this, "danhSachIdNguoiDungDaChon", [
          ...new Set(this.danhSachIdNguoiDungDaChon)
        ]);
      } else {
        this.danhSachIdNguoiDungDaChon = this.danhSachIdNguoiDungDaChon.filter(
          id => !this.danhSachIdNguoiDung.includes(id)
        );
      }
    },
    onChangeNum(pageSize) {
      this.requestInformation.pageIndex = 1;
      this.requestInformation.pageSize = pageSize;
      this.layDanhSachNguoiDung();
    },
    onChangePages(page) {
      this.requestInformation.pageIndex = page;
    },
    timDanhSachNguoiDung() {
      this.requestInformation.pageIndex = 1;
      this.layDanhSachNguoiDung();
    },
    layDanhSachNguoiDungNoiBo(danhSachNguoiDung) {
      if (_isEmpty(danhSachNguoiDung.items)) {
        return [];
      }
      return danhSachNguoiDung.items.map((item, index) => {
        return {
          stt:
            (this.requestInformation.pageIndex - 1) *
              this.requestInformation.pageSize +
            index +
            1,
          userName: _isNil(item.userName) ? "" : item.userName,
          name: _isNil(item.name) ? "" : item.name,
          email: _isNil(item.email) ? "" : item.email,
          thaoTac: "thaoTac"
        };
      });
    },
    layDanhSachIdNguoiDung(danhSachNguoiDung) {
      if (_isEmpty(danhSachNguoiDung.items)) {
        return [];
      }
      return danhSachNguoiDung.items.map(item => item.id);
    },
    getFieldName() {
      if (_isEmpty(this.danhSachNguoiDungNoiBo)) {
        return [];
      }
      return Object.keys(this.danhSachNguoiDungNoiBo[0])
        .filter(
          key =>
            key !== "id" &&
            (!["checkbox", "thaoTac"].includes(key) || !this.readonly)
        )
        .map(key => {
          return {
            key: key,
            label: BANG_NGUOI_DUNG[key],
            tdClass: ["stt"].includes(key) ? "center" : ""
          };
        });
    }
  }
};
