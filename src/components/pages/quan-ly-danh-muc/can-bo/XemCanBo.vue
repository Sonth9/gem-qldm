<template>
  <div>
    <b-tabs pills vertical>
      <b-tab active title="Thông tin cán bộ">
        <b-row>
          <b-col cols="11">
            <b-form-group
              label="Tên cán bộ"
              label-align-sm="right"
              label-cols-sm="3"
              label-for="hoTen"
            >
              <b-form-input
                :value="canBo.hoTen"
                disabled
                id="hoTen"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label="Mã cán bộ"
              label-align-sm="right"
              label-cols-sm="3"
              label-for="maCanBo"
            >
              <b-form-input
                :value="canBo.maCanBo"
                disabled
                id="maCanBo"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label="Tên đăng nhập"
              label-align-sm="right"
              label-cols-sm="3"
              label-for="username"
            >
              <b-form-input
                :value="canBo.userName"
                disabled
                id="username"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label="Giới tính"
              label-align-sm="right"
              label-cols-sm="3"
              label-for="gioiTinh"
            >
              <v-select
                :options="optionsGender"
                :reduce="(item) => item.value"
                :value="canBo.gioiTinh"
                disabled=""
                id="gioiTinh"
                label="label"
              ></v-select>
            </b-form-group>
            <b-form-group
              label="Ngày sinh"
              label-align-sm="right"
              label-cols-sm="3"
              label-for="ngaySinh"
            >
              <b-form-datepicker
                :date-format-options="{
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                }"
                disabled
                v-model="canBo.ngaySinh"
              ></b-form-datepicker>
            </b-form-group>
            <b-form-group
              label="Số CMND"
              label-align-sm="right"
              label-cols-sm="3"
              label-for="cmtnd"
            >
              <b-form-input
                :value="canBo.cmtnd"
                disabled
                id="cmtnd"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label="Email"
              label-align-sm="right"
              label-cols-sm="3"
              label-for="email"
            >
              <b-form-input
                :value="canBo.email"
                disabled
                id="email"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label="Số di động cá nhân"
              label-align-sm="right"
              label-cols-sm="3"
              label-for="phone_DiDong"
            >
              <b-form-input
                :value="canBo.phone_DiDong"
                disabled
                id="phone_DiDong"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label="Số điện thoại cơ quan"
              label-align-sm="right"
              label-cols-sm="3"
              label-for="phone_CoQuan"
            >
              <b-form-input
                :value="canBo.phone_CoQuan"
                disabled
                id="phone_CoQuan"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label="Số điện thoại nhà riêng"
              label-align-sm="right"
              label-cols-sm="3"
              label-for="phone_NhaRieng"
            >
              <b-form-input
                :value="canBo.phone_NhaRieng"
                disabled
                id="phone_NhaRieng"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label="Địa chỉ liên hệ"
              label-align-sm="right"
              label-cols-sm="3"
              label-for="diaChi"
            >
              <b-form-input
                :value="canBo.diaChi"
                disabled
                id="diaChi"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label="Chức vụ"
              label-align-sm="right"
              label-cols-sm="3"
              label-for="iD_ChucVu"
            >
              <b-form-input
                :value="canBo.chucVuDetail.chucVu"
                disabled
                id="iD_ChucVu"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label="Đơn vị"
              label-align-sm="right"
              label-cols-sm="3"
              label-for="donVi"
            >
              <b-form-input
                :value="hienThiCayDonVi(canBo.donViDetail.cayDonVi)"
                disabled
                id="donVi"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label="Đơn vị biệt phái"
              label-align-sm="right"
              label-cols-sm="3"
              label-for="iD_DonVi_BietPhai"
            >
              <b-form-input
                :value="hienThiCayDonVi(canBo.donViDetail.cayDonViBietPhai)"
                disabled
                id="iD_DonVi_BietPhai"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label="Hình thức nhận tin buồn"
              label-align-sm="right"
              label-cols-sm="3"
            >
              <div class="mt-sm-2">
                <b-form-checkbox
                  :checked="canBo.bit_NhanTinBuon_SMS"
                  disabled
                  inline
                >SMS
                </b-form-checkbox>
                <b-form-checkbox
                  :checked="canBo.bit_NhanTinBuon_Email"
                  disabled
                  inline
                >Email
                </b-form-checkbox>
              </div>
            </b-form-group>
            <b-form-group label-cols-sm="3">
              <div class="mt-sm-2">
                <b-form-checkbox
                  :checked="canBo.bitDauMoiPAKN"
                  disabled
                  inline
                >Đầu mối PAKN
                </b-form-checkbox>
                <b-form-checkbox
                  :checked="canBo.bit_ThuTruongDonVi"
                  disabled
                  inline
                >
                  Là Thủ trưởng đơn vị
                </b-form-checkbox>
                <b-form-checkbox
                  :checked="canBo.bit_DanhBa"
                  disabled
                  inline
                >Hiển thị trong danh bạ app EMPI
                </b-form-checkbox>
                <b-form-checkbox
                  :checked="canBo.bit_ChuyenCongTac"
                  disabled
                  inline
                >Chuyển công tác
                </b-form-checkbox>

              </div>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row align-h="center" class="mb-3 mt-5">
          <b-col cols="auto">
            <b-form-group label="Ảnh đại diện" label-align-sm="center">
              <b-avatar
                :src="canBo.anhDaiDien_FilePath"
                rounded
                size="7em"
              ></b-avatar>
            </b-form-group>
          </b-col>
          <b-col cols="auto">
            <b-form-group label="Ảnh chữ ký" label-align-sm="center">
              <b-avatar
                :src="canBo.anhChuKy_FilePath"
                rounded
                size="7em"
              ></b-avatar>
            </b-form-group>
          </b-col>
          <b-col cols="auto">
            <b-form-group label="Ảnh ký nháy" label-align-sm="center">
              <b-avatar
                :src="canBo.anhChuKyNhay_FilePath"
                rounded
                size="7em"
              ></b-avatar>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col></b-col>
          <b-col align="end">
            <b-button
              @click="openRetire"
              class="border-radius-4"
              variant="danger"
            >
              Cán bộ về hưu
            </b-button>
            <b-button
              @click="openEdit"
              class="border-radius-4"
              variant="primary"
            >
              Chỉnh sửa
            </b-button>
          </b-col>
        </b-row>
      </b-tab>
      <b-tab title="Phân quyền menu" v-if="!isDisabledPermission">
        <PhanQuyenMenu :data-menus="dsMenu"
                       @updateMenu="capNhatMenu"
        />
      </b-tab>
    </b-tabs>
    <ModalConfirm @confirmed="retireCanBo" replace title="Bạn có chắc chắn là Cán bộ này đã về hưu?" />
    <SuaCanBo
      :hoSoDaChon="canBo"
      :is-edit.sync="isEdit"
      @hidden="isEdit=false"
      @success="layChiTietCanBo"
      ref="modalCapNhat"
    />
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import PhanQuyenMenu from "@/components/pages/quan-tri-he-thong/menu-he-thong/PhanQuyenMenu";
  import moment from "moment";
  import { ROUTE_NAME } from "@/constants/constants";
  import SuaCanBo from "./SuaCanBo";
  import ModalConfirm from "../../../modal/ModalConfirm";

  export default {
    name: "XemCanBo",
    components: {
      PhanQuyenMenu,
      SuaCanBo,
      ModalConfirm
    },
    props: {
      isDisabledPermission: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        ROUTE_NAME: ROUTE_NAME,
        idCanBo: this.$route.params.id,
        isEdit: false,
        optionsGender: [
          {label: "Nữ", value: false},
          {label: "Nam", value: true}
        ]
      };
    },
    computed: {
      ...mapGetters({
        canBo: "canBo/canBo",
        dsMenu: "canBo/danhSachMenu",
        dmMenu: "dmMenuHeThong/cayDanhMucMenu"
      })
    },
    created() {
      this.layChiTietCanBo();
      this.layDanhSachMenuCanBo();
      if (this.dmMenu.length === 0) {
        this.layDanhMucMenu();
      }
    },
    methods: {
      layChiTietCanBo() {
        this.$store.dispatch("canBo/layChiTietCanBo", {
          id: this.idCanBo
        });
      },
      layDanhSachMenuCanBo() {
        this.$store.dispatch("canBo/layDanhSachMenu", {
          idCanBo: this.idCanBo
        });
      },
      layDanhMucMenu() {
        this.$store.dispatch("dmMenuHeThong/layCayDanhMucMenuHeThong");
      },

      format(value) {
        return moment(value).format("DD/MM/YYYY");
      },
      openRetire() {
        this.$bvModal.show("modal-confirm");
      },
      retireCanBo(confirm) {
        if (confirm) {
          this.$store.dispatch("canBo/chuyenCongTac", {
            data: {idCanBo: this.canBo.id},
            onSuccess: this.backToList
          });
          this.$bvModal.hide("modal-confirm");
        }
      },
      backToList() {
        this.$router.push({
          name: ROUTE_NAME.QUAN_LY_DANH_MUC.HO_SO_CAN_BO.NAME
        });
      },
      openEdit() {
        this.isEdit = true;
        this.$refs["modalCapNhat"].$refs.modalCapNhatHoSoCanBo.show();
      },
      hienThiCayDonVi(cayDonVi) {
        let text = "";
        if (cayDonVi) {
          text = cayDonVi.tenDonVi;
        }
        if (cayDonVi && cayDonVi.children.length > 0) {
          text += ` > ${this.hienThiCayDonVi(cayDonVi.children[0])}`;
        }
        return text;
      },
      capNhatMenu(data) {
        let payload = new FormData();
        payload.append(
          "updateRequest",
          JSON.stringify({
            ID_CanBo: Number.parseInt(this.idCanBo),
            ListCanBoMenuViewModel: data
          })
        );
        this.$store.dispatch("canBo/capNhatMenuCanBo", payload);
      }
    }
    // watch: {
    //   "canBo.ngaySinh": {
    //     handler(value) {
    //       return this.format(value);
    //     }
    //   }
    // }
  };
</script>

<style scoped>
</style>
