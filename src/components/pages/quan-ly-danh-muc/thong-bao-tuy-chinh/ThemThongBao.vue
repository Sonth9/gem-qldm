<template>
  <div>
    <validation-observer ref="observerHoSoCanBo">
      <b-form>
        <b-row>
          <b-col cols="10">
            <ValidationProvider
              name="Tiêu đề"
              rules="required"
              v-slot="validationContext"
            >
              <b-form-group
                class="required"
                label="Tiêu đề"
                label-align-sm="right"
                label-cols-sm="3"
                label-for="title"
              >
                <b-form-input
                  :state="getValidationState(validationContext)"
                  id="title"
                  v-model="form.title"
                ></b-form-input>
                <b-form-invalid-feedback
                >{{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>

            <ValidationProvider
              name="Tóm tắt nội dung thông báo"
              rules="required"
              v-slot="validationContext"
            >
              <b-form-group
                class="required"
                label="Tóm tắt nội dung thông báo"
                label-align-sm="right"
                label-cols-sm="3"
                label-for="username"
              >
                <b-form-textarea
                  :state="getValidationState(validationContext)"
                  id="shortDescription"
                  v-model="form.shortDescription"
                ></b-form-textarea>
                <b-form-invalid-feedback
                >{{ validationContext.errors[0] }}
                </b-form-invalid-feedback>
              </b-form-group>
            </ValidationProvider>


            <b-form-group
              class="required custom-mb"
              label="Ngày gửi"
              label-align-sm="right"
              label-cols-sm="3"
              label-for="publishDate"
            >
              <ValidationProvider
                name="Ngày gửi"
                rules="required"
                v-slot="{ errors }"
              >
                  <b-form-datepicker
                    :class="{ 'is-danger': errors.length > 0, 'is-invalid': errors.length > 0 }"
                    :date-format-options="{
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      }"
                    locale="vi"
                    required
                    :date-disabled-fn="notAfterDate"
                    v-model="form.publishDate"
                  ></b-form-datepicker>
                  <p :class="{ error: errors.length > 0 }">
                    {{ errors.length > 0 ? "Vui lòng nhập Ngày gửi" : "" }}
                  </p>
              </ValidationProvider>

            </b-form-group>
            <b-form-group
              class="required custom-mb"
              label="Thời gian"
              label-align-sm="right"
              label-cols-sm="3"
              label-for="content"
            >
              <ValidationProvider rules="required">
                <div slot-scope="{ errors }">
                  <vue-timepicker
                    :manual-input="true"
                    auto-scroll
                    close-on-complete
                    format="HH:mm"
                    hide-clear-button
                    input-class="form-control"
                    input-width="100%"
                    placeholder="Chọn thời gian"
                    v-model="publishTime"
                  >
                  </vue-timepicker>
                  <p :class="{ error: errors.length > 0 }">
                    {{ errors.length > 0 ? "Vui lòng nhập Thời gian gửi" : "" }}
                  </p>
                </div>
              </ValidationProvider>
            </b-form-group>
            <b-form-group
              class="required custom-mb"
              label="Nội dung thông báo"
              label-align-sm="right"
              label-cols-sm="3"
              label-for="content"
            >
              <ValidationProvider rules="required">
                <div slot-scope="{ errors }">
                  <!-- <p> -->
                  <quill-editor
                    :class="{ 'is-danger': errors.length > 0 }"
                    :options="editorOption"
                    class="mpi-editor"
                    ref="content"
                    required
                    v-model="form.content"
                  />
                  <!-- </p> -->
                  <p :class="{ error: errors.length > 0 }">
                    {{
                    errors.length > 0
                    ? "Vui lòng nhập Nội dung thông báo"
                    : ""
                    }}
                  </p>
                </div>
              </ValidationProvider>
            </b-form-group>

            <b-form-group
              label="Người nhận thông báo"
              label-align-sm="right"
              label-class="required"
              label-cols-sm="3"
              label-for="danhSachCanBo"
            >
              <div>
                <b-form-group>
                  <b-row align-v="center" class="pb-3">
                    <b-col align="end">
                      <b-button
                        @click="moFormThemCanBoVaoNguoiDung"
                        v-if="hasPermissionCanBo"
                        variant="info"
                      >
                        <b-icon icon="plus"></b-icon>
                        Thêm người nhận
                      </b-button>
                    </b-col>
                  </b-row>
                </b-form-group>
                <form v-if="dataNguoiNhan && dataNguoiNhan.length > 0">
                  <div class="box-form-result">
                    <b-table
                      :fields="fieldNames"
                      :items="dataNguoiNhan"
                      :no-local-sorting="true"
                      bordered
                      ref="canBoTable"
                      responsive
                      striped
                    >
                      <template v-slot:head()="scope">
                        <div class="center">
                          <span v-html="scope.label"></span>
                        </div>
                      </template>
                      <template v-slot:table-colgroup="scope">
                        <col
                          :key="field.key"
                          :style="{ width: field.key === 'stt' ? '1%' : '' }"
                          v-for="field in scope.fields"
                        />
                      </template>
                      <template #cell(stt)="row">
                        {{ row.index + 1 }}
                      </template>
                      <template #cell(thaoTac)="row">
                        <div class="text-center row">
                          <b-col cols="2 mr-3">
                            <b-button
                              @click="openDelete(row.item.id)"
                              variant="link"
                            >
                              <font-awesome-icon
                                :style="{
                                  color: '#2A6EBB',
                                  cursor: 'pointer',
                                  marginLeft: '5px',
                                }"
                                icon="trash"
                                title="Xóa"
                              />
                            </b-button>
                          </b-col>
                        </div>
                      </template>
                    </b-table>
                  </div>
                </form>
              </div>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
    <div class="w-100 center mb-3 mt-5">
      <div class="w-100 center">
        <b-button @click="close()" class="btn btn-line">
          {{ HUY_BO_BUTTON_LABEL }}
        </b-button>
        <b-button @click="onSubmit()" class="btn btn-main ml-2">
          Xác nhận
        </b-button>
      </div>
    </div>
    <b-modal
      :hide-footer="true"
      ref="themCanBoVaoNguoiDung"
      size="xl"
      title="Thêm cán bộ vào người dùng"
    >
      <DanhSachNguoiNhanThongBaoModal
        @chonNguoiNhanSuccess="chonNguoiNhanSuccess"
      />
    </b-modal>
  </div>
</template>

<script>
import VueTimepicker from "vue2-timepicker";
import "vue2-timepicker/dist/VueTimepicker.css";
// import DatePicker from "vue2-datepicker";
// import "vue2-datepicker/index.css";
// import 'vue2-datepicker/locale/vi';
import { mapGetters } from "vuex";
import { isNil, pickBy } from "lodash";
import { HUY_BO_BUTTON_LABEL, PERMISSION_NAME, ROUTE_NAME } from "@/constants/constants";
import DanhSachNguoiNhanThongBaoModal from "./DanhSachNguoiNhanThongBaoModal";
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { hasPermission } from "../../../../utils/permissionUtils";
import moment from "moment";

export default {
  name: "ThemThongBao",
  components: {
    // DatePicker,
    quillEditor,
    DanhSachNguoiNhanThongBaoModal,
    VueTimepicker
  },

  data() {
    return {
      PERMISSION_NAME: PERMISSION_NAME,
      ROUTE_NAME: ROUTE_NAME,
      HUY_BO_BUTTON_LABEL: HUY_BO_BUTTON_LABEL,
      editorOption: {
        placeholder: "Nhập nội dung",
      },
      form: {
        title: "",
        shortDescription: "",
        content: "",
        state: 0,
        publishDate: null,
        trangThai: 0,
        priority: 1,
        danhSachCanBo: null,
      },
      publishTime: moment().format("HH:mm"),
      fieldNames: [
        {
          key: "stt",
          label: "STT",
          class: "center ",
        },
        {
          key: "hoTen",
          label: "Họ tên",
          class: "",
        },
        {
          key: "userName",
          label: "Tên đăng nhập",
          class: "",
        },
        {
          key: "thaoTac",
          label: "Thao tác",
          class: "fit-column center",
        },
      ],
      dataNguoiNhan: [],
    };
  },

  computed: {
    ...mapGetters({
      permissions: "common/permissions",
      nguoiDungGomQuyen: "user/nguoiDungGomQuyen",
    }),
    hasPermissionCanBo() {
      return hasPermission(this.permissions, this.PERMISSION_NAME.CAN_BO.XEM)
    }
  },

  methods: {
    moFormThemCanBoVaoNguoiDung() {
      this.$refs["themCanBoVaoNguoiDung"].show();
    },

    notAfterDate(ymd, date) {
      let now = new Date();
      return date < new Date(now.getFullYear(), now.getMonth(), now.getDate());
    },

    chonNguoiNhanSuccess(data) {
      console.log("chonNguoiNhanSuccess", data);
      this.dataNguoiNhan = [...this.dataNguoiNhan, ...data];
      this.$set(this, "dataNguoiNhan", [
          ...new Set(this.dataNguoiNhan),
        ]);
      console.log("this.dataNguoiNhan", this.dataNguoiNhan);
      this.form.danhSachCanBo = this.dataNguoiNhan.map((item) => item && item.id);
      this.$refs["themCanBoVaoNguoiDung"].hide();
    },

    getValidationState({dirty, validated, valid = null}) {
      return dirty || validated ? valid : null;
    },

    async onSubmit() {
      console.log("onSubmit");
      const isValid = await this.$refs.observerHoSoCanBo.validate();
      const $vm = this;
      if(isValid){
        this.form.publishDate = moment(this.form.publishDate + ' ' + this.publishTime).format();
        let payload = $vm.form;
        payload = pickBy(payload, function (value) {
          return !isNil(value);
        });
        if (
          isValid &&
          $vm.form.danhSachCanBo &&
          $vm.form.danhSachCanBo.length > 0
        ) {
          $vm.themMoiThongBao(payload);
        } else if (
          !$vm.form.danhSachCanBo ||
          $vm.form.danhSachCanBo.length == 0
        ) {
          $vm.$toasted.clear();
          $vm.$toasted.global.showErrorMessage({
            message: "Bạn chưa chọn người nhận thông báo",
          });
        }
      }
      
    },

    themMoiThongBao(payload) {
      this.$store
        .dispatch("thongBaoTuyChinh/taoMoiThongBao", payload)
        .then((res) => {
          if (res.data.succeeded) {
            this.$toasted.clear();
            this.$toasted.global.showSuccessMessage({
              message: "Tạo thành công",
            });
            this.close();
          }
        });
    },

    openDelete(id) {
      this.dataNguoiNhan = this.dataNguoiNhan.filter((item) => item.id != id);
      this.form.danhSachCanBo = this.dataNguoiNhan.map((item) => item.id);
    },

    close() {
      const link = `${this.ROUTE_NAME.QUAN_LY_DANH_MUC.NAME}${this.ROUTE_NAME.QUAN_LY_DANH_MUC.THONG_BAO_TUY_CHINH.NAME}`;
      console.log("link", link);
      this.$router.push(link);
    },
  },
};
</script>

<style lang="scss" scoped>
  
  .error {
    color: #dc3545;
    font-size: 80%;
    margin-top: 0.25rem
  }

  .custom-mb {
    margin-bottom: 0px !important;
  }

</style>
<style lang="scss">
  .mx-datepicker {
    width: 100% !important;
  }
  .hours, .minutes {
    .active {
      background: #13559f !important;
    }
  }
  .mpi-editor .ql-editor {
    min-height: 150px !important;
    font-size: 1rem;
  }
</style>