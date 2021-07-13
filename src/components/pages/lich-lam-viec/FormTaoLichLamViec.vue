<template>
  <div>
    <loading-overlay :active="isLoading" :is-full-page="fullPage" color="#101b7b" :loader="loader" />
    <div class="notification" style="padding: 20px 30px 20px 30px">
      <div class="box box-form">
        <validationObserver ref="observerFormThongBao" tag="form">
          <b-form>
            <div class="row">
              <div class="col-md-6 col-xs-12">
                <b-form-group label-for="scheduleTypeId">
                  <template v-slot:label>
                    Loại lịch làm việc <span class="text-danger">*</span>
                  </template>
                  <ValidationProvider rules="required">
                    <div slot-scope="{ errors }">
                      <p>
                        <v-select
                            ref="scheduleTypeId"
                            :options="optionsLoaiLichLamViec"
                            :reduce="(name) => name.id"
                            label="name"
                            v-model="formData.scheduleTypeId"
                            @input="layDanhSachLichLamViecPhanTrang(true)"
                            v-if="!idLoaiLichCha"
                            required
                            title="Chọn loại lịch làm việc"
                            placeholder="Chọn loại lịch làm việc"
                            :class="{ 'is-danger': errors.length > 0 }"
                        >
                        </v-select>
                        <treeselect
                            v-else
                            :load-options="loadOptionsLoaiLichLamViec"
                            :clearable="false"
                            :normalizer="normalizerLoaiLich"
                            :options="optionsLoaiLichLamViec"
                            :show-count="true"
                            :value="formData.scheduleTypeId"
                            no-children-text="Không có loại con"
                            placeholder="Chọn loại lịch làm việc"
                            ref="chonCayLoaiLich"
                            v-model="formData.scheduleTypeId"
                            required
                            :class="{ 'is-danger': errors.length > 0 }"
                        >
                          <label
                              :class="labelClassName"
                              slot="option-label"
                              slot-scope="{
                                node,
                                shouldShowCount,
                                count,
                                labelClassName,
                                countClassName,
                              }"
                          >
                            {{ node.label }}
                            <span :class="countClassName" v-if="shouldShowCount && count > 0"
                            >({{ count }})</span
                            >
                          </label>
                        </treeselect>
                      </p>
                      <p :class="{ error: errors.length > 0 }">
                        {{ errors.length > 0 ? "Vui lòng chọn loại lịch làm việc" : "" }}
                      </p>
                    </div>
                  </ValidationProvider>
                </b-form-group>
              </div>
            </div>
            <div class="row mt-10">
              <div class="col-md-3 col-xs-6">
                <b-form-group :invalid-feedback="errorMessages.dateFrom"
                              :state="isValid.dateFrom">
                  <template v-slot:label>
                    Thời gian bắt đầu <span class="text-danger">*</span>
                  </template>
                  <ValidationProvider rules="required">
                    <div slot-scope="{ errors }">
                      <date-picker
                          format="DD/MM/YYYY"
                          value-type="format"
                          class="custom-datepicker"
                          placeholder="Từ ngày"
                          v-model="formData.dateFrom"
                          required
                          :class="{ 'is-danger': errors.length > 0 }"
                      ></date-picker>
                      <p :class="{ error: errors.length > 0 }">
                        {{ errors.length > 0 ? "Vui lòng chọn ngày bắt đầu" : "" }}
                      </p>
                    </div>
                  </ValidationProvider>
                </b-form-group>
              </div>
              <div class="col-md-3 col-xs-6" v-if="!formData.isFullDay">
                <b-form-group  label="" class="no-label" :invalid-feedback="errorMessages.Gio_BatDau"
                               :state="isValid.Gio_BatDau">
                  <ValidationProvider rules="required">
                    <div slot-scope="{ errors }">
                      <vue-timepicker :manual-input="true"
                                      auto-scroll
                                      close-on-complete
                                      format="HH:mm"
                                      hide-clear-button
                                      input-class="form-control"
                                      input-width="100%"
                                      placeholder="Chọn giờ bắt đầu"
                                      v-model="formData.Gio_BatDau"
                                      required
                                      :class="{ 'is-danger': errors.length > 0 }"
                      >
                        <template v-slot:icon>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.848 12.459c.202.038.202.333.001.372-1.907.361-6.045 1.111-6.547 1.111-.719 0-1.301-.582-1.301-1.301 0-.512.77-5.447 1.125-7.445.034-.192.312-.181.343.014l.985 6.238 5.394 1.011z"/></svg>
                        </template>
                      </vue-timepicker>
                      <p :class="{ error: errors.length > 0 }">
                        {{ errors.length > 0 ? "Vui lòng chọn giờ bắt đầu" : "" }}
                      </p>
                    </div>
                  </ValidationProvider>
                </b-form-group>
              </div>
              <div class="col-md-3 col-xs-6">
                <b-form-group>
                  <template v-slot:label>
                    Thời gian kết thúc <span class="text-danger">*</span>
                  </template>
                  <ValidationProvider rules="required">
                    <div slot-scope="{ errors }">
                      <date-picker
                          format="DD/MM/YYYY"
                          value-type="format"
                          class="custom-datepicker"
                          placeholder="Đến ngày"
                          v-model="formData.dateTo"
                          required
                          :class="{ 'is-danger': errors.length > 0 }"
                      ></date-picker>
                      <p :class="{ error: errors.length > 0 }">
                        {{ errors.length > 0 ? "Vui lòng chọn ngày kết thúc" : "" }}
                      </p>
                    </div>
                  </ValidationProvider>
                </b-form-group>
              </div>
              <div class="col-md-3 col-xs-6" v-if="!formData.isFullDay">
                <b-form-group label="" class="no-label" :invalid-feedback="errorMessages.Gio_KetThuc"
                              :state="isValid.Gio_KetThuc">
                  <ValidationProvider rules="required">
                    <div slot-scope="{ errors }">
                      <vue-timepicker :manual-input="true"
                                      auto-scroll
                                      close-on-complete
                                      format="HH:mm"
                                      hide-clear-button
                                      input-class="form-control"
                                      input-width="100%"
                                      placeholder="Chọn giờ kết thúc"
                                      v-model="formData.Gio_KetThuc"
                                      required
                                      :class="{ 'is-danger': errors.length > 0 }"
                      >
                        <template v-slot:icon>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="white" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.848 12.459c.202.038.202.333.001.372-1.907.361-6.045 1.111-6.547 1.111-.719 0-1.301-.582-1.301-1.301 0-.512.77-5.447 1.125-7.445.034-.192.312-.181.343.014l.985 6.238 5.394 1.011z"/></svg>
                        </template>
                      </vue-timepicker>
                      <p :class="{ error: errors.length > 0 }">
                        {{ errors.length > 0 ? "Vui lòng chọn giờ kết thúc" : "" }}
                      </p>
                    </div>
                  </ValidationProvider>
                </b-form-group>
              </div>
            </div>
            <b-form-checkbox
                v-model="formData.isFullDay"
                :value="true"
                :unchecked-value="false"
            >
              Cả ngày
            </b-form-checkbox>
            <div class="row mt-10">
              <div class="col-md-12 col-xs-12">
                <b-form-group label-for="content">
                  <template v-slot:label>
                    Nội dung công việc <span class="text-danger">*</span>
                  </template>
                  <ValidationProvider rules="required|max:250">
                    <div slot-scope="{ errors }">
                      <b-form-textarea
                          id="shortDescription"
                          v-model="formData.content"
                          placeholder="Nhập nội dung công việc"
                          required
                          maxlength="250"
                          rows="3"
                          max-rows="6"
                          :class="{ 'is-danger': errors.length > 0 }"
                      ></b-form-textarea>

                      <p :class="{ error: errors.length > 0 }">
                        {{ errors.length > 0 ? errors[0] : "" }}
                      </p>
                    </div>
                  </ValidationProvider>
                </b-form-group>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 col-xs-12">
                <b-form-group label-for="location">
                  <template v-slot:label>
                    Địa điểm <span class="text-danger">*</span>
                  </template>
                  <ValidationProvider rules="required">
                    <div slot-scope="{ errors }">
                      <b-form-input
                          id="location"
                          v-model="formData.location"
                          placeholder="Nhập địa điểm"
                          type="text"
                          required
                          :class="{ 'is-danger': errors.length > 0 }"
                      ></b-form-input>
                      <p :class="{ error: errors.length > 0 }">
                        {{ errors.length > 0 ? "Vui lòng nhập địa điểm" : "" }}
                      </p>
                    </div>
                  </ValidationProvider>
                </b-form-group>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 col-xs-12">
                <b-form-group label-for="donViId">
                  <template v-slot:label>
                    Đơn vị <span class="text-danger">*</span>
                  </template>
                  <ValidationProvider rules="required">
                    <div slot-scope="{ errors }">
                      <p>
                        <v-select
                            ref="donViId"
                            :options="danhSachDonViSelect"
                            :reduce="(text) => text.value"
                            label="text"
                            v-model="searchForm.donVi"
                            @input="layDanhSachCanBoPhanTrang(true)"
                            v-if="!idDonViCha"
                            required
                            placeholder="Chọn đơn vị"
                            :class="{ 'is-danger': errors.length > 0 }"
                        >
                        </v-select>
                        <treeselect
                            v-else
                            :load-options="loadOptionsDonVi"
                            :clearable="false"
                            :normalizer="normalizer"
                            :options="optionsDonVi"
                            :show-count="true"
                            :value="searchForm.donVi"
                            no-children-text="Không có đơn vị con"
                            placeholder="Chọn đơn vị"
                            ref="chonCayDonVi"
                            v-model="searchForm.donVi"
                            @input="layDanhSachCanBoPhanTrang(true)"
                            required
                            :class="{ 'is-danger': errors.length > 0 }"
                        >
                          <label
                              :class="labelClassName"
                              slot="option-label"
                              slot-scope="{
                                node,
                                shouldShowCount,
                                count,
                                labelClassName,
                                countClassName,
                              }"
                          >
                            {{ node.label }}
                            <span :class="countClassName" v-if="shouldShowCount && count > 0"
                            >({{ count }})</span
                            >
                          </label>
                        </treeselect>
                      </p>
                      <p :class="{ error: errors.length > 0 }">
                        {{ errors.length > 0 ? "Vui lòng chọn đơn vị" : "" }}
                      </p>
                    </div>
                  </ValidationProvider>
                </b-form-group>
              </div>
              <div class="col-md-6 col-xs-12">
                <b-form-group label-for="dsCanBo">
                  <template v-slot:label>
                    Cán bộ <span class="text-danger">*</span>
                  </template>
                  <ValidationProvider rules="required">
                    <div slot-scope="{ errors }">
                      <p>
                        <v-select
                            ref="dsCanBo"
                            :multiple="true"
                            v-model="formData.dsCanBo"
                            :options="danhSachCanBo.items"
                            label="hoTen"
                            required
                            :reduce="(name) => name.id"
                            title="Chọn cán bộ"
                            placeholder="Chọn cán bộ"
                            :class="{ 'is-danger': errors.length > 0 }"
                        >
                        </v-select>
                      </p>
                      <p :class="{ error: errors.length > 0 }">
                        {{ errors.length > 0 ? "Vui lòng chọn cán bộ" : "" }}
                      </p>
                    </div>
                  </ValidationProvider>
                </b-form-group>
              </div>
            </div>
          </b-form>
        </validationObserver>
        <div class="actions center mb-3" v-if="!formData.id">
          <a class="btn btn search-information-btn d-block float-right mb-3 mr-2 btn-secondary" @click="confirmSave()">Thêm</a>
          <a class="btn btn search-information-btn d-block float-right mb-3 mr-2 btn-secondary" @click="cancel()">Hủy</a>
        </div>
      </div>
    </div>
    <confirmTaoLichLamViecModal @onSave="onSave"
                                ref="confirmTaoLichLamViecModal"
    />
  </div>
</template>

<script>
import VueTimepicker from "vue2-timepicker";
import "vue2-timepicker/dist/VueTimepicker.css";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import { LOAD_CHILDREN_OPTIONS, Treeselect } from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

import {
  callApiTaoLichLamViec,
  callApiGetLoaiLichLamViec,
  callApiGetCanBo,
  callAPIGetDanhSachCanBoTheoDonVi
} from "@/api/lich-lam-viec/index";
import * as message from "@/constants/message";
import { ROUTE_NAME, TRANG_THAI_THONG_BAO } from "@/constants/constants";
import confirmTaoLichLamViecModal from "@/components/pages/lich-lam-viec/modals/confirmTaoLichLamViecModal";
import { mapGetters } from "vuex";
import BasePaginationOnSelect from "@/components/common/BasePaginationOnSelect";
import moment from "moment";
import _cloneDeep from "lodash/cloneDeep";
import { setBreadcrumb } from "@/utils/commonUtils";

export default {
  name: "FormThongBao",
  components: {
    VueTimepicker,
    DatePicker,
    confirmTaoLichLamViecModal,
    Treeselect
  },
  data() {
    return {
      formData: {
        id: null,
        scheduleTypeId: null,
        dateFrom: moment().format("DD/MM/YYYY"),
        dateTo: moment().format("DD/MM/YYYY"),
        content: "",
        location: "",
        dsCanBo: [],
        isFullDay: false,
        Gio_BatDau: moment().format("HH:mm"),
        Gio_KetThuc: moment().format("HH:mm")
      },
      optionsLoaiLichLamViec: [],
      ID_DonVi: null,
      isLoading: false,
      fullPage: true,
      loader: "bars",
      isValid: {
        dateFrom: true,
        Gio_BatDau: true,
        Gio_KetThuc: true
      },
      errorMessages: {
        dateFrom: "",
        Gio_BatDau: "",
        Gio_KetThuc: ""
      },
      searchForm: {
          keyword: "",
          donVi: this.idDonViCha || 1
      },
      optionsDonVi: [],
      fieldDisplay: [],
      canBoDaChon: {},
      optionsDonViBietPhai: [],
      idDonViCha: '1',
      idLoaiLichCha: '1'
    };
  },
  created() {
    setBreadcrumb(
      this.formData.id ? "Chi tiết lich làm việc" : "Tạo lịch làm việc"
    );
    this.layLoaiLichLamViec();
    this.layDanhSachCanBoPhanTrang();
    this.layDanhSachTheoDonViCha();
  },
  computed: {
      ...mapGetters({
          danhSachCanBo: "canBo/danhSachCanBo",
          danhSachDonViSelect: "donVi/danhSachDonViSelect",
          danhSachDonViCon: "donVi/danhSachDonViCon"
      })
  },
  methods: {
    formatDay(day) {
      return moment(day, "DD/MM/YYYY").format("MM/DD/YYYY");
    },
    layLoaiLichLamViec() {
      callApiGetLoaiLichLamViec({})
        .then(res => {
          if (res.status == 200 && res.data.succeeded) {
            this.optionsLoaiLichLamViec = res.data.data;
          }
        })
        .catch(() => {});
    },
    loadOptionsDonVi({ action, parentNode, callback }) {
        console.log(action);
        console.log(LOAD_CHILDREN_OPTIONS);
        if (action === LOAD_CHILDREN_OPTIONS) {
            this.layDanhSachTheoDonViCha(parentNode.id).then(data => {
                parentNode.children = data;
                callback();
                this.$refs.chonCayDonVi.initialize(this.optionsDonVi);
            });
        }
    },
    loadOptionsLoaiLichLamViec({ action, parentNode, callback }) {
        if (action === LOAD_CHILDREN_OPTIONS) {
            this.layDanhSachLoaiLichTheoLoaiCha(parentNode.id).then(data => {
                parentNode.children = data;
                callback();
                this.$refs.chonCayLoaiLich.initialize(this.optionsLoaiLichLamViec);
            });
        }
    },
    normalizer(node) {
        return {
            id: node.id,
            label: node.tenDonVi,
            children: node.children || null
        };
    },
    normalizerLoaiLich(node) {
        return {
            id: node.id,
            label: node.name,
            children: node.children || null
        };
    },
    layDanhSachCanBoPhanTrang(resetPage = false) {
        if (resetPage) this.danhSachCanBo.pageIndex = 1;
        let payload = {
            PageIndex: this.danhSachCanBo.pageIndex,
            PageSize: 1000
        };

        if (this.searchForm.keyword) {
            payload = Object.assign(payload, { FilterBy: this.searchForm.keyword });
        }
        if (this.searchForm.donVi) {
            payload = Object.assign(payload, { ID_DonVi: this.searchForm.donVi });
        }
        this.$store.dispatch("canBo/layDanhSachCanBo", payload);
    },
    layDanhSachTheoDonViCha(parentId = null) {
        return this.$store
            .dispatch("donVi/layDanhSachTheoDonViCha", {
                idDonViCha: parentId || this.idDonViCha,
                soCap: 999
            })
            .then(response => {
                if (!parentId && this.idDonViCha)
                    this.$store.dispatch("donVi/layChiTietDonVi", {
                        data: {
                            id: this.idDonViCha
                        },
                        onSuccess: dataResponse => {
                            this.optionsDonVi = [
                                {
                                    id: this.idDonViCha,
                                    tenDonVi: dataResponse.tenDonVi,
                                    children: response
                                }
                            ];
                        }
                    });
                else return response;
            });
    },
    layDanhSachLoaiLichTheoLoaiCha(parentId = null) {
        return this.$store
            .dispatch("lichLamViec/layDanhSachTheoLoaiLichCha", {
                id: parentId || this.idLoaiLichCha,
                soCap: 999
            })
            .then(response => {
                return response;
            });
    },
    cancel() {},
    async onSave() {
      this.$refs.confirmTaoLichLamViecModal.$refs.confirmTaoLichLamViec.hide();
      const isValid = await this.$refs.observerFormThongBao.validate();
      const $vm = this;
      if (isValid) {
        let formPost = _cloneDeep(this.formData);
        if (!formPost.id) {
          delete formPost.id;
        }
        if (!this.formData.isFullDay) {
          formPost.dateFrom = moment.utc(
            this.formatDay(this.formData.dateFrom) +
              " " +
              this.formData.Gio_BatDau
          );
          formPost.dateTo = moment.utc(
            this.formatDay(this.formData.dateTo) +
              " " +
              this.formData.Gio_KetThuc
          );
        } else {
            formPost.dateFrom = moment.utc(this.formatDay(this.formData.dateFrom));
            formPost.dateTo = moment.utc(this.formatDay(this.formData.dateTo));
        }
        if (formPost.dateFrom > formPost.dateTo) {
          this.isValid.dateFrom = false;
          this.errorMessages.dateFrom =
            "Vui lòng chọn thời gian bắt đầu nhỏ hơn thời gian kết thúc.";
          return false;
        }

        $vm.isLoading = true;
        await callApiTaoLichLamViec(formPost)
          .then(res => {
            $vm.isLoading = false;
            if (res.status == 200 && res.data.succeeded) {
              this.$toasted.clear();
              this.$toasted.global.showSuccessMessage({
                message: message.TAO_LICH_LAM_VIEC_THANH_CONG
              });
              this.$router.push("/lich-lam-viec");
            } else {
              this.$toasted.clear();
              this.$toasted.global.showErrorMessage({
                message: res.data.message
              });
            }
          })
          .catch(ex => {
            console.log(ex);
            $vm.isLoading = false;
            this.$toasted.clear();
            this.$toasted.global.showErrorMessage({
              message: "Có lỗi xảy ra vui lòng thử lại sau!"
            });
          });
      }
    },
    async confirmSave() {
      const isValid = await this.$refs.observerFormThongBao.validate();
      const $vm = this;
      let hasErrors = false;
      if (
        this.formData.Gio_BatDau.includes(":mm") ||
        this.formData.Gio_BatDau.includes("HH:")
      ) {
        this.isValid.Gio_BatDau = false;
        this.errorMessages.Gio_BatDau = "Vui lòng chọn giờ bắt đầu.";
        hasErrors = true;
      }
      if (
        this.formData.Gio_KetThuc.includes(":mm") ||
        this.formData.Gio_KetThuc.includes("HH:")
      ) {
        this.isValid.Gio_KetThuc = false;
        this.errorMessages.Gio_KetThuc = "Vui lòng chọn giờ kết thúc.";
        hasErrors = true;
      }
      if (isValid && !hasErrors) {
        let formPost = _cloneDeep(this.formData);
        if (!this.formData.isFullDay) {
          formPost.dateFrom = moment(
            this.formatDay(this.formData.dateFrom) +
              " " +
              this.formData.Gio_BatDau,
            "MM/DD/YYYY hh:mm"
          );
          formPost.dateTo = moment(
            this.formatDay(this.formData.dateTo) +
              " " +
              this.formData.Gio_KetThuc,
            "MM/DD/YYYY hh:mm"
          );
        } else {
          formPost.dateFrom = this.formData.dateFrom;
          formPost.dateTo = this.formData.dateTo;
        }
        if (formPost.dateFrom > formPost.dateTo) {
          this.isValid.dateFrom = false;
          this.errorMessages.dateFrom =
            "Vui lòng chọn thời gian bắt đầu nhỏ hơn thời gian kết thúc.";
          return false;
        }
        this.$refs.confirmTaoLichLamViecModal.$refs.confirmTaoLichLamViec.show();
      }
    }
  },
  watch: {
    "formData.dateFrom": {
      handler() {
        this.isValid.dateFrom = true;
        this.errorMessages.dateFrom = "";
      },
      deep: true
    },
    "formData.dateTo": {
      handler() {
        this.isValid.dateFrom = true;
        this.errorMessages.dateFrom = "";
      },
      deep: true
    },
    "formData.Gio_BatDau": {
      handler() {
        this.isValid.Gio_BatDau = true;
        this.errorMessages.Gio_BatDau = "";
      },
      deep: true
    },
    "formData.Gio_KetThuc": {
      handler() {
        this.isValid.Gio_KetThuc = true;
        this.errorMessages.Gio_KetThuc = "";
      },
      deep: true
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../../assets/css/components/thong-bao/_thong_bao.scss";
</style>
<style scoped>
.right {
  text-align: right;
}
.form-thong-bao {
  padding: 30px 30px;
}
.col-form-label,
.DnD-label {
  font-size: 14px;
}
.form-control {
  font-size: 14px !important;
}
.form-group {
  margin-bottom: 0px !important;
}
.btn-chon-file {
  text-transform: unset;
}
label {
  font-size: 14px;
}
.error {
  font-size: 14px;
}
.box-form {
  padding: 30px 30px 50px 30px;
}
.DnD-label {
  font-size: 12px;
}
.ql-editor {
  min-height: 200px;
}
.ql-toolbar.ql-snow {
  border: 1px solid #48627b;
  border-bottom: 1px solid rgba(33, 51, 67, 1);
}
.ql-container.ql-snow {
  border: 1px solid #48627b;
}
.drag-file-content {
  border: 1px solid #48627b;
  text-align: left;
  border-radius: 5px;
  padding: 12px 12px;
}
.drag-file-content .inputDnD {
  padding-left: 12px;
}
.drag-file-content .inputDnD .form-control-file {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 70px;
  outline: none;
  visibility: hidden;
  cursor: pointer;
}

.drag-file-content .inputDnD .form-control-file:before {
  content: attr(data-title);
  position: absolute;
  top: 15px;
  left: 0;
  width: 100%;
  min-height: 70px;
  line-height: 10px;
  padding-top: 20px;
  opacity: 1;
  visibility: visible;
  text-align: center;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: hidden;
  color: #929fac;
}

.drag-file-content .DnD-label {
  font-size: 12px;
  color: #929eac;
}
.no-label {
  margin-top: 27px;
}
>>> .ql-editor.ql-blank::before {
  font-style: normal !important;
}

>>> .vue-input-tag-wrapper .input-tag {
  color: #444 !important;
}
>>> .invalid-feedback {
  font-size: 14px !important;
  color: #a94442 !important;
  margin-top: -12px !important;
}
>>> .vue__time-picker .custom-icon {
  left: unset;
  right: 0;
}
>>> .vue__time-picker input.display-time {
  height: 2.65em;
  padding: 0.3em 0.5em;
}
</style>
