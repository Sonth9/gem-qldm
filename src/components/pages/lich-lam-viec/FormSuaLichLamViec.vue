<template>
  <validationObserver ref="observer" tag="form">
    <b-form>
      <div id="cap-nhat-lich-lam-viec">
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
                                no-children-text="Không có loại lịch con"
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
                    <b-form-group>
                      <template v-slot:label>
                        Thời gian bắt đầu
                      </template>
                      <date-picker
                              format="DD/MM/YYYY"
                              class="custom-datepicker"
                              placeholder="Từ ngày"
                              v-model="formData.dateFrom"
                      ></date-picker>
                    </b-form-group>
                  </div>
                  <div class="col-md-3 col-xs-6" v-show="!formData.isFullDay">
                    <b-form-group  label="" class="no-label">
                      <vue-timepicker :manual-input="true"
                                      auto-scroll
                                      close-on-complete
                                      format="HH:mm"
                                      hide-clear-button
                                      input-class="form-control"
                                      input-width="100%"
                                      placeholder="Chọn giờ bắt đầu"
                                      v-model="formData.Gio_BatDau"
                      >
                        <template v-slot:dropdownButton>
                          <i class="fa fa-clock"></i>
                        </template>
                      </vue-timepicker>
                    </b-form-group>
                  </div>
                  <div class="col-md-3 col-xs-6">
                    <b-form-group>
                      <template v-slot:label>
                        Thời gian kết thúc
                      </template>
                      <date-picker
                              format="DD/MM/YYYY"
                              class="custom-datepicker"
                              placeholder="Đến ngày"
                              v-model="formData.dateTo"
                      ></date-picker>
                    </b-form-group>
                  </div>
                  <div class="col-md-3 col-xs-6" v-show="!formData.isFullDay">
                    <b-form-group label="" class="no-label">
                      <vue-timepicker :manual-input="true"
                                      auto-scroll
                                      close-on-complete
                                      format="HH:mm"
                                      hide-clear-button
                                      input-class="form-control"
                                      input-width="100%"
                                      placeholder="Chọn giờ kết thúc"
                                      v-model="formData.Gio_KetThuc"
                      >
                        <template v-slot:dropdownButton>
                          <i class="fa fa-clock"></i>
                        </template>
                      </vue-timepicker>
                    </b-form-group>
                  </div>
                </div>
                <div class="row mt-10">
                  <div class="col-md-12 col-xs-12">
                    <b-form-checkbox
                            v-model="formData.isFullDay"
                            :value="true"
                            :unchecked-value="false"
                    >
                      Cả ngày
                    </b-form-checkbox>
                  </div>
                </div>
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
                    <b-form-group label-for="scheduleTypeId">
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
    </b-form>
  </validationObserver>
</template>

<script>
import { LOAD_CHILDREN_OPTIONS, Treeselect } from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import VueTimepicker from "vue2-timepicker";
import "vue2-timepicker/dist/VueTimepicker.css";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import {
  callApiCapNhatLichLamViec,
  callApiLayLichLamViec,
  callApiGetLoaiLichLamViec,
  callApiGetCanBo,
  callAPIGetDanhSachCanBoTheoDonVi
} from "@/api/lich-lam-viec";
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
    Treeselect,
    VueTimepicker,
    DatePicker,
    confirmTaoLichLamViecModal
  },
  data() {
    return {
      formData: {
        id: null,
        scheduleTypeId: null,
        dateFrom: "",
        dateTo: "",
        content: "",
        location: "",
        dsCanBo: [],
        isFullDay: false,
        Gio_BatDau: "",
        Gio_KetThuc: "",
        scheduleTypeParrentId: null
      },
      optionsLoaiLichLamViec: [],
      ID_DonVi: null,
      isLoading: false,
      fullPage: true,
      loader: "bars",
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
  props: {
    lichLamViecId: {
      type: String,
      required: true
    },
    readonly: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Boolean | null,
      required: false
    }
  },
  async created() {
    setBreadcrumb("Sửa lịch làm việc");
    this.layDanhSachCanBoPhanTrang();
    this.layDanhSachTheoDonViCha();
    await this.layLichLamViec();
  },
  computed: {
    ...mapGetters({
        danhSachCanBo: "canBo/danhSachCanBo",
        danhSachDonViSelect: "donVi/danhSachDonViSelect",
        danhSachDonViCon: "donVi/danhSachDonViCon"
    })
  },
  methods: {
    getInternalForm() {
      return this.formData;
    },
    formatDay(day) {
      return moment(day).format("MM/DD/YYYY");
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
    layLichLamViec() {
      callApiLayLichLamViec(this.lichLamViecId)
        .then(res => {
          if (res.data?.succeeded) {
            this.formData = Object.assign({}, this.formData, res.data.data);
            this.formData.Gio_BatDau = moment(this.formData.dateFrom).format(
              "HH:mm"
            );
            this.formData.Gio_KetThuc = moment(this.formData.dateTo).format(
              "HH:mm"
            );
            this.searchForm.donVi = this.formData.donViId;
            this.layDanhSachCanBoTheoDonVi();
          }
        })
        .catch(() => {});
    },
    layDanhSachCanBoTheoDonVi() {
      this.$store.dispatch("canBo/layDanhSachCanBo", {
        ID_DonVi: this.formData.donViId
      });
    },
      loadOptionsDonVi({ action, parentNode, callback }) {
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
      layDanhSachLoaiLichTheoLoaiCha(parentId = null, isInsert = false) {
        let vm = this;
        if (parentId) {
            return this.$store
                .dispatch("lichLamViec/layDanhSachTheoLoaiLichCha", {
                    id: parentId
                })
                .then(response => {
                    if (isInsert) {
                        let getOption = vm.optionsLoaiLichLamViec;
                        getOption.forEach(function iter(a) {
                            if (a.id == parentId) {
                                a.children = response;
                            }
                            Array.isArray(a.children) && a.children.forEach(iter);
                        });

                        vm.optionsLoaiLichLamViec = getOption;
                    } else return response;
                });
        }
      },
    cancel() {},
    async onSave() {
      const isValid = await this.$refs.observerFormThongBao.validate();
      const $vm = this;
      if (isValid) {
        let formPost = _cloneDeep(this.formData);

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

        this.$refs.confirmTaoLichLamViecModal.$refs.confirmTaoLichLamViec.hide();

        $vm.isLoading = true;
        await callApiCapNhatLichLamViec(formPost)
          .then(res => {
            $vm.isLoading = false;
            if (res.status == 200 && res.data.succeeded) {
              this.$toasted.clear();
              this.$toasted.global.showSuccessMessage({
                message: message.CAP_NHAT_LICH_LAM_VIEC_THANH_CONG
              });
              this.$emit("capNhatThanhCong");
            } else {
              this.$toasted.clear();
              this.$toasted.global.showErrorMessage({
                message: res.data.message
              });
            }
          })
          .catch(ex => {
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
      if (isValid) {
        this.$refs.confirmTaoLichLamViecModal.$refs.confirmTaoLichLamViec.show();
      }
    },
  },
  watch: {
      "formData": {
          async handler() {
              await this.layLoaiLichLamViec();
              let arrayParentId = this.formData.scheduleTypeParrentId.split("/");
              for (let i = 0; i < arrayParentId.length; i++) {
                  await this.layDanhSachLoaiLichTheoLoaiCha(arrayParentId[i], true);
              }
          },
          deep: true
      },
      optionsLoaiLichLamViec: {
          handler() {

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
.vs--searchable .vs__dropdown-toggle .vs__dropdown-toggle {
  background: #48627b !important;
}
.col-form-label,
.DnD-label {
  font-size: 14px;
}
.btn-chon-file {
  text-transform: unset;
}
.vue-input-tag-wrapper {
  background-color: #48627b;
  border: 1px solid #48627b;
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
  margin-top: 26px;
}
</style>
