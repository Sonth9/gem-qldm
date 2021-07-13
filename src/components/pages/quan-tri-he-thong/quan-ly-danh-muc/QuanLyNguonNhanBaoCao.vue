<template>
  <div>
    <b-form-group label="Tìm kiếm theo tên" label-for="ten" class="mt-20">
      <div class="row mt-10">
        <div class="col-md-4 col-xs-12">
          <b-form-input
            id=""
            v-model="requestInformation.keywork"
            type="text"
            required
            placeholder="Nhập từ khóa muốn tìm"
            @keyup.enter="getData"
          />
        </div>
        <div class="col-md-2 col-xs-12">
          <b-button
            @click="getData"
            class="btn search-information-btn d-block float-left mb-3"
          >
            TÌM KIẾM
          </b-button>
        </div>
        <div class="col-md-6 col-xs-12">
          <b-button
            class="btn search-information-btn d-block float-right mb-3 mr-2"
            @click="moFormTaoMoiNguon"
          >
            TẠO Mới
          </b-button>
        </div>
      </div>
    </b-form-group>
    <form class="mt-20">
      <div id="tim-kiem-thong-tin" class="box box-form">
        <div class="box-form-result">
          <b-form-group>
            <div class="d-inline-block">
              <span>Tìm thấy {{ totalCount }} kết quả</span>
            </div>
            <div class="float-right">
              <b-form class="float-right mr-2" inline> </b-form>
            </div>
          </b-form-group>
          <b-table
            striped
            bordered
            responsive
            :no-local-sorting="true"
            :items="danhSach"
            :fields="danhSachCot"
            show-empty
          >
            <template v-slot:head()="scope">
              <div class="d-inline-block">
                {{ scope.label }}
              </div>
            </template>
            <template #cell(stt)="row">
              {{ tinhSTT(row.index) }}
            </template>
            <template v-slot:cell(thaoTac)="row">
              <font-awesome-icon
                :style="{
                  cursor: 'pointer',
                  textAlign: 'center',
                }"
                class="ml-2"
                icon="edit"
                title="Sửa nguồn nhận thông báo"
                @click="moFormCapNhatNguon(row.item)"
              />
              <font-awesome-icon
                :style="{
                  cursor: 'pointer',
                  textAlign: 'center',
                }"
                class="ml-2"
                icon="trash-alt"
                title="Xóa nguồn nhận thông báo"
                @click="moFormXoaNguon(row.item.id, row.item.thaoTac)"
              />
            </template>
            <template #empty>
              <h4 class="center font-size-15">
                {{ KHONG_TIM_THAY_KET_QUA }}
              </h4>
            </template>
            <template #emptyfiltered>
              <h4 class="center font-size-15">
                {{ KHONG_TIM_THAY_KET_QUA }}
              </h4>
            </template>
          </b-table>
        </div>
        <BasePagination
          :total-pages="totalPage"
          :total-rows="totalCount"
          :current-page="requestInformation.pageIndex"
          @changeNum="onChangeNum($event)"
          @changePages="onChangePages($event)"
        />
      </div>
    </form>
    <b-modal
      id="tao-moi-nguon-modal"
      ref="tao-moi-nguon-modal"
      centered
      title="Tạo mới nguồn nhận thông báo"
      size="lg"
      footer-class="text-center"
    >
      <FormTaoNguon ref="tao-moi-nguon" />
      <template v-slot:modal-footer>
        <div class="w-100 center">
          <b-button
            class="btn btn-line"
            @click="hideModal('tao-moi-nguon-modal')"
          >
            Bỏ qua
          </b-button>
          <b-button class="btn btn-main ml-2" @click="taoMoiChiTieu()">
            Tạo
          </b-button>
        </div>
      </template>
    </b-modal>

    <b-modal
      ref="cap-nhat-nguon-modal"
      centered
      title="Sửa nguồn nhận thông báo"
      size="xl"
    >
      <FormCapNhatNguon
        ref="cap-nhat-nguon"
        :chiTieuCanCapNhat="chiTieuCanCapNhat"
      />
      <template v-slot:modal-footer>
        <div class="w-100 center">
          <b-button
            class="btn btn-line"
            @click="hideModal('cap-nhat-nguon-modal')"
          >
            Bỏ qua
          </b-button>
          <b-button class="btn btn-main ml-2" @click="capNhatNguon()">
            Cập nhật
          </b-button>
        </div>
      </template>
    </b-modal>

    <XoaNguon
      :NguonMuonXoa="deletedId"
      @xoaDanhSachNguon="xoaDanhSachNguon"
    />
  </div>
</template>

<script>
import BasePagination from "@/components/common/BasePagination";
import FormTaoNguon from "@/components/pages/quan-tri-he-thong/quan-ly-danh-muc/FormTaoNguon";
import FormCapNhatNguon from "@/components/pages/quan-tri-he-thong/quan-ly-danh-muc/FormCapNhatNguon";
import XoaNguon from "@/components/pages/quan-tri-he-thong/quan-ly-danh-muc/FormXoaNguon";

import { mapGetters } from "vuex";
import {
  ROUTE_NAME,
  GIA_TRI_TRANG_THAI_Y_KIEN_NGUOI_DAN
} from "@/constants/constants";
import {
  TAO_NGUON,
  SUA_NGUON,
  KHONG_TIM_THAY_KET_QUA,
  XOA_DU_LIEU_KHONG_THANH_CONG
} from "@/constants/validateMessages";

export default {
  name: "QuanLyNguonNhanBaoCao",
  components: {
    BasePagination,
    FormTaoNguon,
    FormCapNhatNguon,
    XoaNguon
  },
  props: {
    title: {
      type: String
    }
  },
  data() {
    return {
      path: "",
      ROUTE_NAME: ROUTE_NAME,
      GIA_TRI_TRANG_THAI_Y_KIEN_NGUOI_DAN: GIA_TRI_TRANG_THAI_Y_KIEN_NGUOI_DAN,
      XOA_DU_LIEU_KHONG_THANH_CONG: XOA_DU_LIEU_KHONG_THANH_CONG,
      KHONG_TIM_THAY_KET_QUA: KHONG_TIM_THAY_KET_QUA,
      chiTietYKienNguoiDan: this.$route.name,
      totalCount: 0,
      totalPage: 0,
      currentPage: 1,
      deletedId: 0,
      chiTieuCanCapNhat: {},
      requestInformation: {
        keywork: "",
        mauBaoCaoId: "",
        tenBaoCao: "",
        pageSize: 10,
        pageIndex: 1
      },
      danhSach: [],
      danhSachCot: [
        {
          key: "stt",
          label: "STT",
          class: "center width-3"
        },
        {
          key: "name",
          label: "Tên nguồn nhận thông báo"
        },
        {
          key: "description",
          label: "Mô tả"
        },
        {
          key: "thaoTac",
          label: "Thao tác",
          class: "center width-120-px"
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      danhSachQuanLyChiTieu: "baoCao/danhSachQuanLyChiTieu"
    })
  },
  created() {
    this.getData();
  },
  methods: {
    getData(resetPage = false) {
      if (resetPage) this.requestInformation.pageIndex = 1;
      const payload = {
        ...this.requestInformation
      };
      this.$store
        .dispatch("thongBaoTuyChinh/layDanhSachQuanLyNguon", payload)
        .then(res => {
          if (res.data.succeeded) {
            this.danhSach = res.data.data.items;
            this.totalCount = res.data.data.totalCount;
            this.totalPage = res.data.data.totalPage;
            this.pageSize = res.data.data.pageSize;
            this.pageIndex = res.data.data.pageIndex;
          }
        });
    },
    onChangeNum(pageSize) {
      this.requestInformation.pageIndex = 1;
      this.requestInformation.pageSize = pageSize;
      this.getData();
    },
    onChangePages(page) {
      this.requestInformation.pageIndex = page;
      this.getData();
    },
    tinhSTT(index) {
      return (
        this.requestInformation.pageSize *
          (this.requestInformation.pageIndex - 1) +
        index +
        1
      );
    },
    moFormTaoMoiNguon() {
      this.$refs["tao-moi-nguon-modal"].show();
    },
    hideModal(modalName) {
      this.$refs[modalName].hide();
      this.getData();
    },
    async taoMoiChiTieu() {
      const isValid = await this.$refs[
        "tao-moi-nguon"
      ].$refs.observer.validate();
      const $vm = this;
      if (isValid) {
        this.$store
          .dispatch(
            "thongBaoTuyChinh/taoMoiNguon",
            this.$refs["tao-moi-nguon"].getInternalForm()
          )
          .then(response => {
            if (response.data.succeeded) {
              $vm.$toasted.clear();
              $vm.$toasted.global.showSuccessMessage({
                message: TAO_NGUON
              });
              $vm.$refs["tao-moi-nguon-modal"].hide();
              $vm.getData();
            }
          })
          .catch(error => {
            $vm.$toasted.clear();
            $vm.$toasted.global.showErrorMessage({
              message: error.message
            });
          });
      }
    },
    moFormXoaNguon(id) {
      this.deletedId = id;
      this.$bvModal.show("xoa-nguon");
    },
    xoaDanhSachNguon(NguonMuonXoa) {
      const $vm = this;
      this.$store
        .dispatch("thongBaoTuyChinh/xoaNguon", NguonMuonXoa)
        .then(response => {
          if (response.data?.succeeded) {
            $vm.$toasted.clear();
            $vm.$toasted.global.showSuccessMessage({
              message: response.data.data
            });
            $vm.getData();
          }
        })
        .catch(() => {
          $vm.$toasted.clear();
          $vm.$toasted.global.showErrorMessage({
            message: XOA_DU_LIEU_KHONG_THANH_CONG
          });
        });
    },
    moFormCapNhatNguon(chiTieu) {
      this.chiTieuCanCapNhat = chiTieu;
      this.$refs["cap-nhat-nguon-modal"].show();
    },
    async capNhatNguon() {
      const isValid = await this.$refs[
        "cap-nhat-nguon"
      ].$refs.observer.validate();
      const $vm = this;
      if (isValid) {
        this.$store
          .dispatch(
            "thongBaoTuyChinh/suaNguon",
            this.$refs["cap-nhat-nguon"].getInternalForm()
          )
          .then(response => {
            if (response.data?.succeeded) {
              $vm.$toasted.clear();
              $vm.$toasted.global.showSuccessMessage({
                message: SUA_NGUON
              });
              SUA_NGUON;
              $vm.$refs["cap-nhat-nguon-modal"].hide();
              $vm.getData();
            }
          })
          .catch(error => {
            $vm.$toasted.clear();
            $vm.$toasted.global.showErrorMessage({
              message: error.message
            });
          });
      }
    }
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
$rem: 1rem / 18;
.news-top-bar {
  &__title {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 500;
    font-size: 22 * $rem;
    line-height: 20 * $rem;

    letter-spacing: -0.24px;
    margin: 0 0 18 * $rem 0;
    position: relative;
    color: #ffffff;
  }
  &::after {
    content: "";
    display: block;
    border-top: 2px solid #48627b;
  }
}
</style>
