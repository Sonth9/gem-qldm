<template>
  <validation-observer ref="observerHoSoCanBo">
    <b-form>
      <b-row>
        <b-col cols="10">
          <ValidationProvider
            name="Tiêu đề"
            rules="required"
          >
            <b-form-group
              label="Tiêu đề"
              label-align-sm="right"
              label-cols-sm="3"
              label-for="title"
              class="required"
            >
              <b-form-input
                id="title"
                v-model="form.title"
                disabled
              ></b-form-input>
              
            </b-form-group>
          </ValidationProvider>

          <ValidationProvider
            name="Tóm tắt nội dung thông báo"
            rules="required"
          >
            <b-form-group
              label="Tóm tắt nội dung thông báo"
              label-align-sm="right"
              label-cols-sm="3"
              label-for="username"
              class="required"
            >
              <b-form-textarea
                id="shortDescription"
                v-model="form.shortDescription"
                disabled
              ></b-form-textarea>
            </b-form-group>
          </ValidationProvider>

          <b-form-group
            label="Ngày gửi"
            label-align-sm="right"
            label-cols-sm="3"
            label-for="publishDate"
            class="required"
          >
            <b-form-datepicker
              locale="vi"
              :date-format-options="{
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              }"
              v-model="form.publishDate"
              disabled
            ></b-form-datepicker>
          </b-form-group>

          <b-form-group
            label-for="content"
            label="Nội dung thông báo"
            label-align-sm="right"
            label-cols-sm="3"
            class="required"
          >
            <ValidationProvider rules="required">
              <div>
                  <quill-editor
                    ref="content"
                    :options="editorOption"
                    class="mpi-editor"
                    v-model="form.content"
                    disabled
                    required
                  />
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
                <form>
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
                        v-for="field in scope.fields"
                        :key="field.key"
                        :style="{ width: field.key === 'stt' ? '1%' : '' }"
                      />
                    </template>
                    <template #cell(stt)="row">
                      {{ row.index + 1 }}
                    </template>
                    </b-table>
                  </div>
                  <!-- <BasePagination
                  :current-page="danhSachThongBao.pageIndex"
                  :total-pages="danhSachThongBao.totalPage"
                  :total-rows="danhSachThongBao.totalCount"
                  @changeNum="onChangeNum($event)"
                  @changePages="onChangePages($event)"
                /> -->
                </form>
              </div>
            </b-form-group>
            <b-form-group 
                label="Trạng thái"
                label-align-sm="right"
                label-cols-sm="3"
              >
                <b-button class="chua-gui">
                    {{ form.trangThai == 0 ? 'Chưa gửi' : (form.trangThai == 1 ? 'Đã gửi' : 'Đã hủy')}}
                </b-button>
              </b-form-group>
        </b-col>
      </b-row>
    </b-form>
  </validation-observer>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";
// import { THONG_BAO_TUY_CHINH } from "@/constants/constants";
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

export default {
  name: "XemThongBao",
  components: {
    quillEditor
  },

  data() {
    return {
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
        }
      ],
      dataNguoiNhan: [],
      editorOption: {
        placeholder: "Nhập nội dung",
      },
      form: {
        title: "",
        shortDescription: "",
        content: "",
        state: 0,
        publishDate: "",
        priority: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      chiTietThongBao: "thongBaoTuyChinh/chiTietThongBao",
    }),
  },
  async created() {
    await this.layChiTietThongBao();
  },
  methods: {
    layChiTietThongBao() {
      let payload = {
        id: this.$route.params.id || "",
      };
      this.$store.dispatch("thongBaoTuyChinh/layChiTietThongBao", payload).then(res => {
        if(res.data.succeeded){
          this.cloneData();
        }
      });
    },
    cloneData() {
      this.dataNguoiNhan = this.chiTietThongBao.canBos.map((item, index) => {
          return {
            stt: index + 1,
            id: item.canBoId,
            hoTen: item.hoTen,
            userName: item.userName || ''
          };
        }),
      this.form = {
        title: this.chiTietThongBao.title,
        shortDescription: this.chiTietThongBao.shortDescription,
        content: this.chiTietThongBao.content,
        publishDate: this.chiTietThongBao.publishDate
          ? moment(this.chiTietThongBao.publishDate).format("YYYY-MM-DD")
          : null,
        trangThai: this.chiTietThongBao.trangThai,
        danhSachCanBo: this.chiTietThongBao.canBos.map(item => {
          return item.userId
        }),
        state: this.chiTietThongBao.state,
        priority: this.chiTietThongBao.priority,
      };
      console.log('this.form', this.form);
    },
    selectClass(valid) {
      return {
        "select-invalid": valid,
      };
    },
  },
};
</script>

<style scoped lang="scss">
.chua-gui {
  background: #7e8a97;
  border-radius: 12%;
  border: none;
  padding: 0.3rem 0.7rem;
  font-size: 12px;
}
</style>
<style lang="scss">
.mpi-editor .ql-editor {
  min-height: 150px !important;
  font-size: 1rem;
}
</style>
