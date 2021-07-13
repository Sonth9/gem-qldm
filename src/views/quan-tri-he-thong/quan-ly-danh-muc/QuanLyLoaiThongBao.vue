<template>
  <div>
    <header>
      <section class="news-top-bar">
        <div class="news-top-bar__title">{{ title }}</div>
      </section>
    </header>
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
            @click="moFormTaoLoai"
          >
            TẠO Mới
          </b-button>
        </div>
      </div>
    </b-form-group>
    <form class="mt-20">
      <div id="tim-kiem-loai" class="box box-form">
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
            <template v-slot:cell(filePath)="row">
              <img class="img-lichhop" :src="row.item.filePath" />
            </template>
            <template v-slot:cell(thaoTac)="row">
              <font-awesome-icon
                :style="{
                  color: '#fff!important',
                  cursor: 'pointer',
                  textAlign: 'center',
                }"
                class="ml-2"
                icon="edit"
                title="Sủa loại thông báo"
                @click="moFormCapNhatLoai(row.item)"
              />
              <font-awesome-icon
                :style="{
                  color: '#fff!important',
                  cursor: 'pointer',
                  textAlign: 'center',
                }"
                class="ml-2"
                icon="trash-alt"
                title="Xóa loại thông báo"
                @click="moFormXoaLoai(row.item.id)"
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
      id="tao-moi-loai-modal"
      ref="tao-moi-loai-modal"
      centered
      title="Tạo mới loại thông báo"
      size="lg"
      footer-class="text-center"
    >
      <FormTaoLoai ref="tao-moi-loai" />
      <template v-slot:modal-footer>
        <div class="w-100 center">
          <b-button
            class="btn btn-line"
            @click="hideModal('tao-moi-loai-modal')"
          >
            Bỏ qua
          </b-button>
          <b-button class="btn btn-main ml-2" @click="taoMoiLoai()">
            Tạo
          </b-button>
        </div>
      </template>
    </b-modal>

    <b-modal
      ref="cap-nhat-loai-modal"
      centered
      title="Sửa loại thông báo"
      size="xl"
    >
      <FormCapNhatLoai
        ref="cap-nhat-loai"
        :thuocTinhCanCapNhat="thuocTinhCanCapNhat"
      />
      <template v-slot:modal-footer>
        <div class="w-100 center">
          <b-button
            class="btn btn-line"
            @click="hideModal('cap-nhat-loai-modal')"
          >
            Bỏ qua
          </b-button>
          <b-button class="btn btn-main ml-2" @click="capNhatLoai()">
            Cập nhật
          </b-button>
        </div>
      </template>
    </b-modal>

    <XoaLoai
      :XoaLoai="deletedId"
      @xoaDanhSachLoai="xoaDanhSachLoai"
    />
  </div>
</template>

<script>
import BasePagination from "@/components/common/BasePagination";
import FormTaoLoai from "@/components/pages/quan-tri-he-thong/quan-ly-danh-muc/FormTaoLoai";
import FormCapNhatLoai from "@/components/pages/quan-tri-he-thong/quan-ly-danh-muc/FormCapNhatLoai";
import XoaLoai from "@/components/pages/quan-tri-he-thong/quan-ly-danh-muc/FormXoaLoai";

import { mapGetters } from "vuex";
import {
  ROUTE_NAME,
  GIA_TRI_TRANG_THAI_Y_KIEN_NGUOI_DAN
} from "@/constants/constants";
import {
  TAO_LOAI,
  SUA_LOAI,
  KHONG_TIM_THAY_KET_QUA,
  XOA_DU_LIEU_KHONG_THANH_CONG
} from "@/constants/validateMessages";

export default {
  name: "QuanLyChitieu",
  components: {
    BasePagination,
    FormTaoLoai,
    FormCapNhatLoai,
    XoaLoai
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
      thuocTinhCanCapNhat: {},
      requestInformation: {
        keywork: "",
        mauBaoCaoId: "",
        tenBaoCao: "",
        AnhMinhHoa: [],
        FileDinhKem: [],
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
          key: "filePath",
          label: "Logo",
          class: "center logo width-120-px"
        },
        {
          key: "name",
          label: "Tên loại thông báo"
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
      danhSachQuanLyThuocTinh: "baoCao/danhSachQuanLyThuocTinh"
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
        .dispatch("thongBaoTuyChinh/layDanhSachQuanLyLoai", payload)
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
    moFormTaoLoai() {
      this.$refs["tao-moi-loai-modal"].show();
    },
    hideModal(modalName) {
      this.$refs[modalName].hide();
      this.getData();
    },
    async taoMoiLoai() {
      const isValid = await this.$refs[
        "tao-moi-loai"
      ].$refs.observer.validate();
      const $vm = this;
      console.log(
        'this.$refs["tao-moi-loai"].getInternalForm():',
        this.$refs["tao-moi-loai"].getInternalForm()
      );
      if (isValid) {
        this.$store
          .dispatch(
            "thongBaoTuyChinh/taoMoiLoai",
            this.$refs["tao-moi-loai"].getInternalForm()
          )
          .then(response => {
            if (response.data.succeeded) {
              $vm.$toasted.clear();
              $vm.$toasted.global.showSuccessMessage({
                message: TAO_LOAI
              });
              $vm.$refs["tao-moi-loai-modal"].hide();
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
    moFormXoaLoai(id) {
      this.deletedId = id;
      this.$bvModal.show("xoa-loai");
    },
    xoaDanhSachLoai(XoaLoai) {
      const $vm = this;
      this.$store
        .dispatch("thongBaoTuyChinh/xoaLoai", XoaLoai)
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
    moFormCapNhatLoai(thuocTinh) {
      console.log("thuocTinh:", thuocTinh);
      this.thuocTinhCanCapNhat = thuocTinh;
      this.$refs["cap-nhat-loai-modal"].show();
    },
    async capNhatLoai() {
      const isValid = await this.$refs[
        "cap-nhat-loai"
      ].$refs.observer.validate();
      const $vm = this;
      if (isValid) {
        this.$store
          .dispatch(
            "thongBaoTuyChinh/suaLoai",
            this.$refs["cap-nhat-loai"].getInternalForm()
          )
          .then(response => {
            if (response.data?.succeeded) {
              $vm.$toasted.clear();
              $vm.$toasted.global.showSuccessMessage({
                message: SUA_LOAI
              });
              $vm.$refs["cap-nhat-loai-modal"].hide();
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
.logo {
  img {
    max-width: 60px;
    max-height: 60px;
  }
}
.width-120-px {
  width: 120px;
}
</style>
