<template>
  <div>
    <div id="tim-kiem-thong-tin1" class="box box-form mt-20" style="padding-bottom: 0px;">
      <div class="box-form-result">
        <div class="row" style="border-bottom: 1px solid #48627b;">
          <div class="col-md-1 col-xs-12">
            <label class="tgl" style="font-size:14px">
              <input type="checkbox" v-model="requestInfo.pageType" v-on:change="onChangePageType()" true-value="1" false-value="0"/>
              <span data-on="Ngày" data-off="Tuần"></span>
            </label>
          </div>
          <div :class="$route.params.id == LICH_LAM_VIEC_CUA_DON_VI ? 'col-md-3 col-xs-12' : 'col-md-4 col-xs-12'">
            <b-form-group v-show="requestInfo.pageType !== '1'">
              <date-picker
                  type="week"
                  class="custom-datepicker"
                  :placeholder="placeHolderChonTuan"
                  :highlighted="highlighted"
                  @change="onChangeWeek($event)"
              ></date-picker>
            </b-form-group>
            <b-form-group v-show="requestInfo.pageType == '1'">
              <date-picker
                  format="DD/MM/YYYY"
                  value-type="format"
                  type="day"
                  v-model="searchDate"
                  class="custom-datepicker"
                  placeholder="Chọn ngày"
                  @change="onChangeDate($event)"
              ></date-picker>
            </b-form-group>
          </div>
          <div class="col-md-4 col-xs-12" v-if="$route.params.id == LICH_LAM_VIEC_CUA_LANH_DAO">
            <b-form-group label-for="lanhDao">
              <v-select
                  ref="lanhDao"
                  v-model="requestInfo.canBoId"
                  :options="optionsDanhSachLanhDao.items"
                  label="hoTen"
                  :reduce="(hoTen) => hoTen.id"
                  title="Chọn lãnh đạo"
                  placeholder="Chọn lãnh đạo"
                  @input="onChangLanhDao"
              >
              </v-select>
            </b-form-group>
          </div>
          <div class="col-md-2 col-xs-12"  v-if="$route.params.id == LICH_LAM_VIEC_CUA_DON_VI">
            <b-form-group label-for="phongBan">
              <v-select
                  ref="phongBan"
                  v-model="requestInfo.donViId"
                  :options="optionsDanhSachDonVi.items"
                  label="tenDonVi"
                  :reduce="(tenDonVi) => tenDonVi.id"
                  title="Chọn phòng ban"
                  placeholder="Chọn phòng ban"
                  @input="onChangDonVi"
              >
              </v-select>
            </b-form-group>
          </div>
          <div class="col-md-2 col-xs-12" v-if="$route.params.id == LICH_LAM_VIEC_CUA_DON_VI">
            <b-form-group label-for="canBo">
              <v-select
                  ref="canBo"
                  v-model="requestInfo.canBoId"
                  :options="optionsDanhSachCanBo.items"
                  label="hoTen"
                  :reduce="(hoTen) => hoTen.id"
                  title="Chọn cán bộ"
                  placeholder="Chọn cán bộ"
                  @input="onChangCanBo"
              >
              </v-select>
            </b-form-group>
          </div>
          <div class="col-md-2 col-xs-12"  v-if="$route.params.id == LICH_LAM_VIEC_CUA_DON_VI">
            <b-form-group label-for="loaiLich">
              <v-select
                  ref="canBo"
                  v-model="requestInfo.scheduleTypeId"
                  :options="optionsLoaiLichLamViec"
                  label="name"
                  :reduce="(name) => name.id"
                  title="Chọn loại lịch"
                  placeholder="Chọn loại lịch"
                  @input="onChangLoaiLichLamViec"
              >
              </v-select>
            </b-form-group>
          </div>
          <div class="col-md-2 col-xs-12" v-show="requestInfo.pageType == 0">
            <a @click="xuatLichLamViec()" style="cursor: pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="black" width="16" height="16" viewBox="0 0 24 24"><path d="M16 11h5l-9 10-9-10h5v-11h8v11zm3 8v3h-14v-3h-2v5h18v-5h-2z"/></svg> Tải lịch tuần
            </a>
          </div>
        </div>
        <b-row v-show="requestInfo.pageType == '1'">
          <b-col v-for="(day, index) in dayInThisWeek" v-bind:key="'dayInWeek_' + index" :class="(isCurrentDay(day)) ? 'text-center current-day' : 'text-center'"
                 :style="index !== 6 ? 'border-right: 1px solid #48627b;padding-top: 10px;cursor: pointer;' : 'padding-top: 10px;cursor: pointer;'"
                 @click="onChangeDate(day)"
          >
            {{index !== 6 ? ('Thứ ' + (index + 2)) : 'Chủ Nhật'}} <p>{{day}}</p>
          </b-col>
        </b-row>
      </div>
    </div>
    <div id="tim-kiem-thong-tin" class="box box-form mt-20">
      <div class="box-form-result">
        <b-form-group>
          <div class="d-inline-block">
            <span>Tìm thấy {{ totalRows }} kết quả</span>
          </div>
          <div class="float-right">
            <b-form class="float-right mr-2" inline> </b-form>
          </div>
        </b-form-group>
        <b-table-simple bordered responsive v-show="requestInfo.pageType == 1 && totalRows > 0">
          <b-thead>
            <b-tr>
              <b-th style="text-align:center;font-weight: 500;">Thời gian</b-th>
              <b-th style="text-align:center;font-weight: 500;">Nội dung làm việc</b-th>
              <b-th style="text-align:center;font-weight: 500;" v-show="$route.params.id == LICH_LAM_VIEC_CUA_LANH_DAO || $route.params.id == LICH_LAM_VIEC_CUA_DON_VI">
                {{ $route.params.id == LICH_LAM_VIEC_CUA_LANH_DAO ? 'Lãnh đạo' : 'Cán bộ phụ trách'}}
              </b-th>
              <b-th style="text-align:center;font-weight: 500;">Địa điểm</b-th>
              <b-th style="text-align:center;font-weight: 500;">Thao tác</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <b-tr v-if="danhSachLichLamViecTheoNgay.trongTuan.length > 0">
              <b-td colspan="5">Lịch trong tuần</b-td>
            </b-tr>
            <template v-for="(lichLamViec, index) in danhSachLichLamViecTheoNgay.trongTuan">
              <b-tr v-if="lichLamViec.id" v-bind:key="'trongTuan_' + index">
                <b-td class="text-center">{{getGioHopLichTrongTuan(lichLamViec)}}</b-td>
                <b-td>{{lichLamViec.content}}</b-td>
                <b-td class="text-center" v-show="$route.params.id == LICH_LAM_VIEC_CUA_LANH_DAO || $route.params.id == LICH_LAM_VIEC_CUA_DON_VI">{{lichLamViec.dsTenCanBo}}</b-td>
                <b-td>{{lichLamViec.location}}</b-td>
                <b-td style="text-align:center;">
                  <font-awesome-icon
                      title="Sửa thông tin lịch làm việc"
                      icon="edit"
                      class="ml-2"
                      :style="{ cursor: 'pointer' }"
                      @click="goToEditModal(lichLamViec.id)"
                  />
                  <font-awesome-icon
                      title="Xóa lịch làm việc"
                      icon="trash-alt"
                      class="ml-2"
                      :style="{ cursor: 'pointer' }"
                      @click="confirmDelete(lichLamViec.id)"
                  />
                </b-td>
              </b-tr>
            </template>
            <b-tr v-if="danhSachLichLamViecTheoNgay.sang.length > 0">
              <b-td colspan="5">Sáng</b-td>
            </b-tr>
            <template v-for="(lichLamViec, index) in danhSachLichLamViecTheoNgay.sang">
              <b-tr v-if="lichLamViec.id" v-bind:key="'sang_' + index">
                <b-td class="text-center">{{getGioHop(lichLamViec)}}</b-td>
                <b-td>{{lichLamViec.content}}</b-td>
                <b-td class="text-center" v-show="$route.params.id == LICH_LAM_VIEC_CUA_LANH_DAO || $route.params.id == LICH_LAM_VIEC_CUA_DON_VI">{{lichLamViec.dsTenCanBo}}</b-td>
                <b-td>{{lichLamViec.location}}</b-td>
                <b-td style="text-align:center;">
                  <font-awesome-icon
                      title="Sửa thông tin lịch làm việc"
                      icon="edit"
                      class="ml-2"
                      :style="{ cursor: 'pointer' }"
                      @click="goToEditModal(lichLamViec.id)"
                  />
                  <font-awesome-icon
                      title="Xóa lịch làm việc"
                      icon="trash-alt"
                      class="ml-2"
                      :style="{ cursor: 'pointer' }"
                      @click="confirmDelete(lichLamViec.id)"
                  />
                </b-td>
              </b-tr>
            </template>
            <b-tr v-if="danhSachLichLamViecTheoNgay.chieu.length > 0">
              <b-td colspan="5">Chiều</b-td>
            </b-tr>
            <template v-for="(lichLamViec, index) in danhSachLichLamViecTheoNgay.chieu">
              <b-tr v-if="lichLamViec.id" v-bind:key="'chieu_' + index">
                <b-td class="text-center">{{getGioHop(lichLamViec)}}</b-td>
                <b-td>{{lichLamViec.content}}</b-td>
                <b-td class="text-center" v-show="$route.params.id == LICH_LAM_VIEC_CUA_LANH_DAO || $route.params.id == LICH_LAM_VIEC_CUA_DON_VI">{{lichLamViec.dsTenCanBo}}</b-td>
                <b-td>{{lichLamViec.location}}</b-td>
                <b-td style="text-align:center;">
                  <font-awesome-icon
                      title="Sửa thông tin lịch làm việc"
                      icon="edit"
                      class="ml-2"
                      :style="{ cursor: 'pointer' }"
                      @click="goToEditModal(lichLamViec.id)"
                  />
                  <font-awesome-icon
                      title="Xóa lịch làm việc"
                      icon="trash-alt"
                      class="ml-2"
                      :style="{ cursor: 'pointer' }"
                      @click="confirmDelete(lichLamViec.id)"
                  />
                </b-td>
              </b-tr>
            </template>
          </b-tbody>
        </b-table-simple>

        <b-table-simple bordered responsive v-show="requestInfo.pageType == 0 && totalRows > 0">
          <b-thead>
            <b-tr>
              <b-th style="text-align:center;font-weight: 500;">Ngày</b-th>
              <b-th style="text-align:center;font-weight: 500;">Thời gian</b-th>
              <b-th style="text-align:center;font-weight: 500;">Nội dung làm việc</b-th>
              <b-th style="text-align:center;font-weight: 500;" v-show="$route.params.id == LICH_LAM_VIEC_CUA_LANH_DAO || $route.params.id == LICH_LAM_VIEC_CUA_DON_VI">
                {{ $route.params.id == LICH_LAM_VIEC_CUA_LANH_DAO ? 'Lãnh đạo' : 'Cán bộ phụ trách'}}
              </b-th>
              <b-th style="text-align:center;font-weight: 500;">Địa điểm</b-th>
              <b-th style="text-align:center;font-weight: 500;">Thao tác</b-th>
            </b-tr>
          </b-thead>
          <b-tbody>
            <template v-if="danhSachLichLamViecTheoTuan['lichTrongTuan'].length > 0">
              <template v-for="(lichLamViec, index) in danhSachLichLamViecTheoTuan['lichTrongTuan']">
                <b-tr v-if="lichLamViec.length !== 0" v-bind:key="'tuan_' + index">
                  <b-th :rowspan="danhSachLichLamViecTheoTuan['lichTrongTuan'].length" style="text-align:center;vertical-align: middle;font-weight: 500;" v-if="index==0">
                    Lịch trong tuần
                  </b-th>
                  <b-td class="text-center">{{getGioHopLichTrongTuan(lichLamViec) }}</b-td>
                  <b-td>{{lichLamViec.content}}</b-td>
                  <b-td class="text-center" v-show="$route.params.id == LICH_LAM_VIEC_CUA_LANH_DAO || $route.params.id == LICH_LAM_VIEC_CUA_DON_VI">{{lichLamViec.dsTenCanBo}}</b-td>
                  <b-td>{{lichLamViec.location}}</b-td>
                  <b-td style="text-align:center;">
                    <font-awesome-icon
                        title="Sửa thông tin lịch làm việc"
                        icon="edit"
                        class="ml-2"
                        :style="{ cursor: 'pointer' }"
                        @click="goToEditModal(lichLamViec.id)"
                    />
                    <font-awesome-icon
                        title="Xóa lịch làm việc"
                        icon="trash-alt"
                        class="ml-2"
                        :style="{ cursor: 'pointer' }"
                        @click="confirmDelete(lichLamViec.id)"
                    />
                  </b-td>
                </b-tr>
              </template>
            </template>
            <template v-for="(day) in dayInThisWeek">
              <template v-for="(lichLamViec, index) in danhSachLichLamViecTheoTuan[day]">
                <b-tr v-if="lichLamViec.length !== 0" v-bind:key="day + '_' + index">
                  <b-th :rowspan="danhSachLichLamViecTheoTuan[day].length" style="text-align:center;vertical-align: middle;font-weight: 500;" :class="(isCurrentDay(day)) ? 'current-day' : ''" v-if="index==0">
                    {{dayInThisWeek.indexOf(day) !== 6 ? ('Thứ' + (dayInThisWeek.indexOf(day) + 2)) : 'Chủ Nhật'}} <p>{{day}}</p>
                  </b-th>
                  <b-td class="text-center">{{ lichLamViec.isFullDay ? 'Cả ngày' : getGioHop(lichLamViec)}}</b-td>
                  <b-td>{{lichLamViec.content}}</b-td>
                  <b-td class="text-center" v-show="$route.params.id == LICH_LAM_VIEC_CUA_LANH_DAO || $route.params.id == LICH_LAM_VIEC_CUA_DON_VI">{{lichLamViec.dsTenCanBo}}</b-td>
                  <b-td>{{lichLamViec.location}}</b-td>
                  <b-td style="text-align:center;">
                    <font-awesome-icon
                        title="Sửa thông tin lịch làm việc"
                        icon="edit"
                        class="ml-2"
                        :style="{ cursor: 'pointer' }"
                        @click="goToEditModal(lichLamViec.id)"
                    />
                    <font-awesome-icon
                        title="Xóa lịch làm việc"
                        icon="trash-alt"
                        class="ml-2"
                        :style="{ cursor: 'pointer' }"
                        @click="confirmDelete(lichLamViec.id)"
                    />
                  </b-td>
                </b-tr>
              </template>
            </template>
          </b-tbody>
        </b-table-simple>
      </div>
    </div>
    <b-modal
      id="cap-nhat-lich-lam-viec-modal"
      ref="cap-nhat-lich-lam-viec-modal"
      centered
      title="Sửa thông tin lịch làm việc"
      size="xl"
    >
      <FormSuaLichLamViec
        ref="cap-nhat-lich-lam-viec"
        :lichLamViecId="lichLamViecId"
        @capNhatThanhCong="capNhatThanhCong"
      />
      <template v-slot:modal-footer>
        <div class="w-100 center">
          <b-button
                  class="btn btn-line"
                  @click="hideModal('cap-nhat-lich-lam-viec-modal')"
          >
            Bỏ qua
          </b-button>
          <b-button class="btn btn-main ml-2" @click="goToEdit()">
            Cập nhật
          </b-button>
        </div>
      </template>
    </b-modal>
    <FormXoaLichLamViec
      :LichLamViecMuonXoa="deletedId"
      @xoaLichLamViec="xoaLichLamViec"
    />
  </div>
</template>

<script>
// import BaseMultipleSelect from "@/components/common/BaseMultipleSelect";
import FormSuaLichLamViec from "@/components/pages/lich-lam-viec/FormSuaLichLamViec";
import FormXoaLichLamViec from "@/components/pages/lich-lam-viec/FormXoaLichLamViec";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import { mapGetters } from "vuex";
import {
  callApiGetLoaiLichLamViec,
  callApiGetDanhSanhLichLamViec,
  callApiInLichLamViec
} from "@/api/lich-lam-viec/index";
import moment from "moment";
import {
  ROUTE_NAME,
  LICH_LAM_VIEC_CUA_LANH_DAO,
  LICH_LAM_VIEC_CUA_DON_VI,
  LICH_LAM_VIEC_CUA_CA_NHAN
} from "@/constants/constants";
import _cloneDeep from "lodash/cloneDeep";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { setBreadcrumb } from "@/utils/commonUtils";

export default {
  name: "DanhSachLichLamViecCanBo",
  components: {
    // BaseMultipleSelect,
    FormSuaLichLamViec,
    FormXoaLichLamViec,
    DatePicker,
    vSelect
  },
  props: {},
  data() {
    return {
      ROUTE_NAME: ROUTE_NAME,
      LICH_LAM_VIEC_CUA_LANH_DAO: LICH_LAM_VIEC_CUA_LANH_DAO,
      LICH_LAM_VIEC_CUA_DON_VI: LICH_LAM_VIEC_CUA_DON_VI,
      LICH_LAM_VIEC_CUA_CA_NHAN: LICH_LAM_VIEC_CUA_CA_NHAN,
      totalPages: 0,
      totalRows: 0,
      currentPage: 1,
      deletedId: 0,
      searchDate: moment().format("DD/MM/YYYY"),
      searchWeek: moment().format("DD/MM/YYYY"),
      danhSachDonVi: [],
      dayInThisWeek: [],
      lichLamViecId: "",
      danhSachLichLamViecTheoNgay: {
        sang: [],
        chieu: [],
        trongTuan: []
      },
      danhSachLichLamViecTheoTuan: {},
      requestInfo: {
        pageType: "1",
        isCaNhan: false,
        isLanhDao: false,
        donViId: null,
        canBoId: null,
        scheduleTypeId: null,
        dateFrom: moment().format("DD/MM/YYYY"),
        dateTo: moment().format("DD/MM/YYYY"),
        keywork: "",
        pageIndex: 1,
        pageSize: 1000,
        isSortAsc: true
      },
      placeHolderChonTuan: "Chọn tuần",
      highlighted: {
        to: moment().format("DD/MM/YYYY"),
        from: moment().format("DD/MM/YYYY")
      },
      currentSelectDay: moment().format("DD/MM/YYYY")
    };
  },
  created() {
    setBreadcrumb(this.getTitlePage());
    let currentDate = moment();
    let weekStart = currentDate.clone().startOf("isoweek");
    this.dayInThisWeek = [];
    this.danhSachLichLamViecTheoTuan["lichTrongTuan"] = [];
    for (var i = 0; i <= 6; i++) {
      let day = moment(weekStart)
        .add(i, "days")
        .format("DD/MM/YYYY");
      this.dayInThisWeek.push(day);
      this.danhSachLichLamViecTheoTuan[day] = [];
    }
    if (this.requestInfo.pageType == 1) {
      this.requestInfo.dateFrom = moment().format("DD/MM/YYYY");
      this.requestInfo.dateTo = moment().format("DD/MM/YYYY");
    } else {
      this.requestInfo.dateFrom = this.dayInThisWeek[0];
      this.requestInfo.dateTo = this.dayInThisWeek[6];
      this.highlighted.from = this.dayInThisWeek[0];
      this.highlighted.to = this.dayInThisWeek[6];
      let weekNumber = currentDate.isoWeek();
      this.placeHolderChonTuan =
        "TUẦN " +
        weekNumber +
        ": Từ ngày " +
        this.requestInfo.dateFrom +
        " đến ngày " +
        this.requestInfo.dateTo;
    }
    this.layDanhSachLichLamViec();
    this.layLoaiLichLamViec();
    this.layDanhSachLanhDao();
    this.layDanhSachDonVi();
    this.layDanhSachCanBoTheoDonVi();
  },
  computed: {
    ...mapGetters({
      optionsDanhSachLanhDao: "canBo/danhSachLanhDao",
      optionsDanhSachCanBo: "canBo/danhSachCanBo",
      optionsLoaiLichLamViec: "lichLamViec/danhSachLoaiLichLamViec",
      optionsDanhSachDonVi: "donVi/danhSachDonViPhanTrang"
    })
  },
  methods: {
    getTitlePage() {
      if (this.$route.params.id == this.LICH_LAM_VIEC_CUA_LANH_DAO) {
        return "Lịch làm việc của Lãnh đạo";
      } else if (this.$route.params.id == this.LICH_LAM_VIEC_CUA_DON_VI) {
        return "Lịch làm việc của đơn vị";
      } else if (this.$route.params.id == this.LICH_LAM_VIEC_CUA_CA_NHAN) {
        return "Lịch làm việc của cá nhân";
      }
    },
    onChangePageType() {
      let currentDate = moment(this.searchDate, "DD/MM/YYYY");
      let weekStart = currentDate.clone().startOf("isoweek");
      this.dayInThisWeek = [];
      for (var i = 0; i <= 6; i++) {
        let day = moment(weekStart)
          .add(i, "days")
          .format("DD/MM/YYYY");
        this.dayInThisWeek.push(day);
        this.danhSachLichLamViecTheoTuan[day] = [];
      }
      if (this.requestInfo.pageType == 1) {
        this.requestInfo.dateFrom = moment().format("DD/MM/YYYY");
        this.requestInfo.dateTo = moment().format("DD/MM/YYYY");
      } else {
        this.requestInfo.dateFrom = this.dayInThisWeek[0];
        this.requestInfo.dateTo = this.dayInThisWeek[6];
        this.highlighted.from = this.dayInThisWeek[0];
        this.highlighted.to = this.dayInThisWeek[6];
        let weekNumber = currentDate.isoWeek();
        this.placeHolderChonTuan =
          "TUẦN " +
          weekNumber +
          ": Từ ngày " +
          this.requestInfo.dateFrom +
          " đến ngày " +
          this.requestInfo.dateTo;
      }
      this.layDanhSachLichLamViec();
    },
    confirmDelete(id) {
      this.deletedId = id;
      this.$bvModal.show("xoa-lich-lam-viec");
    },
    hideModal(modalName) {
      this.$refs[modalName].hide();
    },
    capNhatThanhCong() {
      this.$refs["cap-nhat-lich-lam-viec-modal"].hide();
      this.layDanhSachLichLamViec();
    },
    xoaLichLamViec(xoaLichLamViec) {
      const $vm = this;
      this.$store
        .dispatch("lichLamViec/xoaLichLamViec", xoaLichLamViec)
        .then(response => {
          if (response.data?.succeeded) {
            $vm.$toasted.clear();
            $vm.$toasted.global.showSuccessMessage({
              message: response.data.data
            });
            $vm.layDanhSachLichLamViec();
          }
        })
        .catch(e => {
          console.log(e);
          $vm.$toasted.clear();
          $vm.$toasted.global.showErrorMessage({
            message: "Xóa dữ liệu không thành công"
          });
        });
    },
    goToEditModal(id) {
      this.lichLamViecId = id;
      this.$refs["cap-nhat-lich-lam-viec-modal"].show();
    },
    async goToEdit() {
      await this.$refs["cap-nhat-lich-lam-viec"].onSave();
    },
    isCurrentDay(day) {
      if (day == this.currentSelectDay) {
        return true;
      }
      return false;
    },
    getGioHop(lichLamViec) {
      return (
        moment(lichLamViec.dateFrom).format("HH:mm") +
        " - " +
        moment(lichLamViec.dateTo).format("HH:mm")
      );
    },
    getGioHopLichTrongTuan(lichLamViec) {
      if (lichLamViec.isFullDay) {
        return "Cả ngày " + moment(lichLamViec.dateFrom).format("DD/MM/YYYY");
      }
      return (
        "Từ " +
        moment(lichLamViec.dateFrom).format("HH:mm") +
        " Ngày " +
        moment(lichLamViec.dateFrom).format("DD/MM/YYYY") +
        " - Đến " +
        moment(lichLamViec.dateTo).format("HH:mm") +
        " Ngày " +
        moment(lichLamViec.dateTo).format("DD/MM/YYYY")
      );
    },
    layLoaiLichLamViec() {
      this.$store.dispatch("lichLamViec/layDanhSachLoaiLichLamViec", {});
    },
    layDanhSachDonVi() {
      this.$store.dispatch("donVi/layDanhSachDonViPhanTrang", {});
    },
    layDanhSachLichLamViec() {
      if (this.$route.params.id == this.LICH_LAM_VIEC_CUA_LANH_DAO) {
        this.requestInfo.isLanhDao = true;
        this.requestInfo.isCaNhan = false;
      } else if (this.$route.params.id == this.LICH_LAM_VIEC_CUA_DON_VI) {
        this.requestInfo.isLanhDao = false;
        this.requestInfo.isCaNhan = false;
      } else if (this.$route.params.id == this.LICH_LAM_VIEC_CUA_CA_NHAN) {
        this.requestInfo.isLanhDao = false;
        this.requestInfo.isCaNhan = true;
      }
      let vm = this;
      let requestData = _cloneDeep(this.requestInfo);
      requestData.pageType = parseInt(requestData.pageType);
      if (requestData.pageType !== 1) {
        delete requestData.pageType;
      }
      requestData.dateFrom = moment(
        this.requestInfo.dateFrom + " 00:00",
        "DD/MM/YYYY HH:mm"
      ).format("MM/DD/YYYY HH:mm");
      requestData.dateTo = moment(
        this.requestInfo.dateTo + " 23:59",
        "DD/MM/YYYY HH:mm"
      ).format("MM/DD/YYYY HH:mm");

      this.$store
        .dispatch("lichLamViec/layDanhSachLichLamViec", requestData)
        .then(res => {
          if (res.status == 200 && res.data.succeeded) {
            if (vm.requestInfo.pageType == "1") {
              let result = res.data.data.items;
              vm.danhSachLichLamViecTheoNgay.sang = [];
              vm.danhSachLichLamViecTheoNgay.chieu = [];
              vm.danhSachLichLamViecTheoNgay.trongTuan = [];
              vm.totalRows = res.data.data.items.length;
              result.forEach(function(item) {
                if (item.isFullDay) {
                  vm.danhSachLichLamViecTheoNgay.trongTuan.push(item);
                } else {
                  let dateTo = moment(
                    requestData.dateTo,
                    "MM/DD/YYYY HH:mm"
                  ).format("MM/DD/YYYY");
                  let dateFrom = moment(
                    requestData.dateFrom,
                    "MM/DD/YYYY HH:mm"
                  ).format("MM/DD/YYYY");
                  if (
                    moment(item.dateTo).format("MM/DD/YYYY") !=
                    moment(item.dateFrom).format("MM/DD/YYYY")
                  ) {
                    vm.danhSachLichLamViecTheoNgay.trongTuan.push(item);
                  } else {
                    if (
                      moment(item.dateFrom).format("HH:mm") <=
                      moment(dateFrom + " 11:59:59").format("HH:mm")
                    ) {
                      let itemSang = _cloneDeep(item);
                      if (
                        moment(itemSang.dateTo).format("HH:mm") >=
                        moment(dateTo + " 11:59:59").format("HH:mm")
                      ) {
                        itemSang.dateTo = moment(
                          vm.formatDay(item.dateTo) + " 11:59:59",
                          "MM/DD/YYYY HH:mm"
                        );
                      }
                      vm.danhSachLichLamViecTheoNgay.sang.push(itemSang);
                    }
                    if (
                      moment(item.dateTo).format("HH:mm") >=
                      moment(dateTo + " 11:59:59").format("HH:mm")
                    ) {
                      let itemChieu = _cloneDeep(item);
                      if (
                        moment(itemChieu.dateFrom).format("HH:mm") <=
                        moment(dateFrom + " 11:59:59").format("HH:mm")
                      ) {
                        itemChieu.dateFrom = moment(
                          vm.formatDay(item.dateFrom) + " 12:00:00",
                          "MM/DD/YYYY HH:mm"
                        );
                      }
                      vm.danhSachLichLamViecTheoNgay.chieu.push(itemChieu);
                    }
                  }
                }
              });
            } else {
              let result = res.data.data.items;
              vm.$forceUpdate();
              vm.totalRows = res.data.data.items.length;
              vm.danhSachLichLamViecTheoTuan["lichTrongTuan"] = [];
              vm.dayInThisWeek.forEach(function(day) {
                vm.danhSachLichLamViecTheoTuan[day] = [];
                result.forEach(function(item) {
                  let dateFrom = moment(item.dateFrom).format("MM/DD/YYYY");
                  let dateTo = moment(item.dateTo).format("MM/DD/YYYY");
                  let dayFormat = moment(day, "DD/MM/YYYY").format(
                    "MM/DD/YYYY"
                  );
                  if (item.isFullDay) {
                    if (
                      vm.danhSachLichLamViecTheoTuan["lichTrongTuan"].indexOf(
                        item
                      ) === -1
                    ) {
                      vm.danhSachLichLamViecTheoTuan["lichTrongTuan"].push(
                        item
                      );
                    }
                  } else {
                    if (
                      moment(item.dateTo).format("MM/DD/YYYY") !=
                      moment(item.dateFrom).format("MM/DD/YYYY")
                    ) {
                      if (
                        vm.danhSachLichLamViecTheoTuan["lichTrongTuan"].indexOf(
                          item
                        ) === -1
                      ) {
                        vm.danhSachLichLamViecTheoTuan["lichTrongTuan"].push(
                          item
                        );
                      }
                    } else {
                      if (
                        dayFormat >= moment(dateFrom).format("MM/DD/YYYY") &&
                        dayFormat <= moment(dateTo).format("MM/DD/YYYY")
                      ) {
                        vm.danhSachLichLamViecTheoTuan[day].push(item);
                      }
                    }
                  }
                });
              });
            }
          }
        });
    },
    formatDay(day) {
      return moment(day).format("MM/DD/YYYY");
    },
    onChangDonVi(event) {
      this.requestInfo.donViId = event;
      if (event != null) {
        this.layDanhSachCanBoTheoDonVi();
        this.requestInfo.canBoId = null;
      }
      this.layDanhSachLichLamViec();
    },
    onChangCanBo(event) {
      this.requestInfo.canBoId = event;
      this.layDanhSachLichLamViec();
    },
    onChangLoaiLichLamViec(event) {
      this.requestInfo.scheduleTypeId = event;
      this.layDanhSachLichLamViec();
    },
    onChangLanhDao(event) {
      this.requestInfo.isLanhDao = true;
      this.requestInfo.canBoId = event;
      this.layDanhSachLichLamViec();
    },
    layDanhSachCanBoTheoDonVi() {
      this.$store.dispatch("canBo/layDanhSachCanBo", {
        ID_DonVi: this.requestInfo.donViId
      });
    },
    layDanhSachLanhDao() {
      this.$store.dispatch("canBo/layDanhSachLanhDao", {
        ID_DonVi: 2
      });
    },
    onChangeDate(day) {
      if (day) {
        let currentDate = moment(day, "DD/MM/YYYY");
        this.currentSelectDay = currentDate.format("DD/MM/YYYY");
        this.searchDate = this.currentSelectDay;
        let weekStart = currentDate.clone().startOf("isoweek");
        this.dayInThisWeek = [];
        for (var i = 0; i <= 6; i++) {
          this.dayInThisWeek.push(
            moment(weekStart)
              .add(i, "days")
              .format("DD/MM/YYYY")
          );
        }
        this.requestInfo.dateFrom = currentDate.format("DD/MM/YYYY");
        this.requestInfo.dateTo = currentDate.format("DD/MM/YYYY");
        this.layDanhSachLichLamViec();
      } else {
        this.totalRows = 0;
      }
    },
    onChangeWeek(week) {
      let currentDate = moment(week);
      let weekStart = currentDate.clone().startOf("isoweek");
      this.dayInThisWeek = [];
      for (var i = 0; i <= 6; i++) {
        this.dayInThisWeek.push(
          moment(weekStart)
            .add(i, "days")
            .format("DD/MM/YYYY")
        );
      }
      this.requestInfo.dateFrom = this.dayInThisWeek[0];
      this.requestInfo.dateTo = this.dayInThisWeek[6];

      let weekNumber = currentDate.isoWeek();
      this.placeHolderChonTuan =
        "TUẦN " +
        weekNumber +
        ": Từ ngày " +
        this.requestInfo.dateFrom +
        " đến ngày " +
        this.requestInfo.dateTo;
      this.layDanhSachLichLamViec();
    },
    xuatLichLamViec() {
      if (this.$route.params.id == this.LICH_LAM_VIEC_CUA_LANH_DAO) {
        this.requestInfo.isLanhDao = true;
        this.requestInfo.isCaNhan = false;
      } else if (this.$route.params.id == this.LICH_LAM_VIEC_CUA_DON_VI) {
        this.requestInfo.isLanhDao = false;
        this.requestInfo.isCaNhan = false;
      } else if (this.$route.params.id == this.LICH_LAM_VIEC_CUA_CA_NHAN) {
        this.requestInfo.isLanhDao = false;
        this.requestInfo.isCaNhan = true;
      }

      let requestData = _cloneDeep(this.requestInfo);
      requestData.pageType = parseInt(requestData.pageType);
      if (requestData.pageType !== 1) {
        delete requestData.pageType;
      }
      requestData.dateFrom = moment(
        this.requestInfo.dateFrom + " 00:00",
        "DD/MM/YYYY HH:mm"
      ).format("MM/DD/YYYY HH:mm");
      requestData.dateTo = moment(
        this.requestInfo.dateTo + " 23:59",
        "DD/MM/YYYY HH:mm"
      ).format("MM/DD/YYYY HH:mm");

      callApiInLichLamViec(requestData).then(res => {
        let blob = new Blob([res.data], {
          type: "application/vnd.ms-excel"
        });
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = `Lịch_làm_việc_${requestData.dateFrom}_${
          requestData.dateTo
        }.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
      });
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
// Variables
$toggle-enabled-bg: #48627b;
$toggle-enabled-color: #ffffff;
$toggle-enabled-tab-bg: #ffffff;

$toggle-disabled-bg: #48627b;
$toggle-disabled-color: #ffffff;
$toggle-disabled-tab-bg: #ffffff;

/** EXAMPLE
  <label class="tgl">
    <input type="checkbox" />
    <span data-on="1" data-off="0"></span>
  </label>
**/

.tgl {
  position: relative;
  outline: 0;
  display: inline-block;
  cursor: pointer;
  user-select: none;
  margin: 0 0 5px 0;

  // add default box-sizing for this scope
  &,
  &:after,
  &:before,
  & *,
  & *:after,
  & *:before,
  & + .tgl-btn {
    box-sizing: border-box;
    &::selection {
      background: none;
    }
  }

  span {
    position: relative;
    display: block;
    height: 1.8em;
    line-height: 1.2em;
    overflow: hidden;
    font-weight: normal;
    text-align: center;
    border-radius: 2em;
    padding: 0.2em 1em;
    transition: color 0.3s ease, padding 0.3s ease-in-out,
      background 0.3s ease-in-out;

    &:before {
      position: relative;
      display: block;
      line-height: 1.3em;
      padding: 0 0.2em;
      font-size: 1em;
    }

    &:after {
      position: absolute;
      display: block;
      content: "";
      border-radius: 2em;
      width: 1.3em;
      height: 1.3em;
      margin-left: -1.45em;
      top: 0.2em;
      background: $toggle-enabled-tab-bg;
      transition: left 0.3s cubic-bezier(0.175, 0.885, 0.32, 0.97),
        background 0.3s ease-in-out;
    }
  }

  input[type="checkbox"] {
    display: none !important;

    // Off
    &:not(:checked) {
      + span {
        background: $toggle-disabled-bg;
        color: $toggle-disabled-color;
        padding-left: 1.6em;
        padding-right: 0.4em;
        &:before {
          content: attr(data-off);
          color: $toggle-disabled-color;
        }
        &:after {
          background: $toggle-disabled-tab-bg;
          left: 1.6em;
        }
      }
    }

    // On
    &:checked {
      + span {
        background: $toggle-enabled-bg;
        color: $toggle-enabled-color;
        padding-left: 0.4em;
        padding-right: 1.6em;
        &:before {
          content: attr(data-on);
        }
        &:after {
          background: $toggle-enabled-tab-bg;
          left: 100%;
        }
      }
    }

    // Disabled
    &:disabled,
    &:disabled + span,
    &:read-only,
    &:read-only + span {
      cursor: not-allowed;
    }
  }
}

.tgl-gray {
  input[type="checkbox"] {
    &:not(:checked) {
      + span {
        background: lighten(desaturate($toggle-enabled-bg, 100%), 20%);
        color: darken(desaturate($toggle-disabled-color, 100%), 40%);
        &:before {
          color: darken(desaturate($toggle-disabled-color, 100%), 40%);
        }
        &:after {
          background: desaturate($toggle-disabled-tab-bg, 100%);
        }
      }
    }
  }
}

.tgl-inline {
  display: inline-block !important;
  vertical-align: top;

  &.tgl {
    font-size: 16px;
    span {
      min-width: 50px;
      &:before {
        line-height: 1.4em;
        padding-left: 0.4em;
        padding-right: 0.4em;
      }
    }
  }
}

.tgl-inline-label {
  display: inline-block !important;
  vertical-align: top;
  line-height: 26px;
}

.current-day {
  color: #f5a623;
}

.custom-datepicker ::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: black;
  opacity: 1; /* Firefox */
}

.custom-datepicker :-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: black;
}

.custom-datepicker ::-ms-input-placeholder {
  /* Microsoft Edge */
  color: black;
}
</style>
<style scoped>
>>> .ql-editor.ql-blank::before {
  font-style: normal !important;
}
>>> .vue-input-tag-wrapper .input-tag {
  background-color: #d6d8db !important;
  border: 1px solid #777 !important;
  color: #444 !important;
}
</style>
