<template>
  <ValidationObserver ref="observer" tag="form">
    <div id="tao-moi-loai" class="row">
      <div class="col-md-12">
        <b-form>
          <b-form-group
            class="required"
            label="Tên loại"
            label-for="Ten"
          >
            <ValidationProvider name="internalForm.Ten" rules="required">
              <div slot-scope="{ errors }">
                <b-form-input
                  id="Ten"
                  v-model="internalForm.Name"
                  type="text"
                  required
                  :readonly="readonly"
                  placeholder="nhập tên loại thông báo"
                  :class="{ 'is-danger': errors.length > 0 }"
                />
                <p :class="{ error: errors.length > 0 }">
                  {{
                    errors.length > 0 ? "Vui lòng nhập tên loại thông báo" : ""
                  }}
                </p>
              </div>
            </ValidationProvider>
          </b-form-group>
        </b-form>
      </div>
      <div class="col-md-12">
        <b-form>
          <div>
            <b-form-group
              class="required"
              label="Mô tả"
              label-for="Ten"
            >
              <ValidationProvider name="internalForm.moTa" rules="required">
                <div slot-scope="{ errors }">
                  <b-form-input
                    id="Ten"
                    v-model="internalForm.Description"
                    type="text"
                    required
                    :readonly="readonly"
                    placeholder="nhập mô tả"
                    :class="{ 'is-danger': errors.length > 0 }"
                  />
                  <p :class="{ error: errors.length > 0 }">
                    {{
                    errors.length > 0 ? "Vui lòng nhập mô tả" : ""
                    }}
                  </p>
                </div>
              </ValidationProvider>
            </b-form-group>
          </div>
        </b-form>
      </div>
      <div class="col-md-12">
        <b-form-group class="required">
          <template v-slot:label>
            Logo
          </template>
          <span class="file-info">
            <span class="file-name" v-if="internalForm.File">
              {{internalForm.File.name}}
            </span>
          </span>
          <div class="col-xl-12 drag-file-content px-0">
            <ValidationProvider rules="required">
              <div slot-scope="{ errors }">
                <vue-dropzone :options="dropzoneOptions"
                              v-model="internalForm.File"
                              id="FileDropzone"
                              :useCustomSlot=true
                              @vdropzone-files-added="(files, progress, bytesSent) => fileAdded(files, progress, bytesSent)"
                              name="File"
                              ref="FileDropzone"
                              required
                              :class="{ 'is-danger': errors.length > 0 }"
                >
                  <div class="inputDnD">
                    <p class="btn search-information-btn btn-secondary btn-chon-file">Chọn ảnh</p>
                    <span class="DnD-label" style="margin-left: 10px">Chỉ nhận file jpg, jpeg, png.Tổng dung lượng tối đa 5MB.</span>
                  </div>
                </vue-dropzone>
                <p :class="{ error: errors.length > 0 }">
                  {{ errors.length > 0 ? "Vui lòng chọn ảnh minh họa" : "" }}
                </p>
              </div>
            </ValidationProvider>
            <div class="error-tooltip" v-show="!isValid.File">
              <div class="error-tooltip-top">{{ errorMessages.File }}</div>
            </div>
          </div>
        </b-form-group>
      </div>
      <div class="col-md-12">
        <b-form>
          <b-form-checkbox
                  v-model="internalForm.IsPublic"
                  :value="true"
                  :unchecked-value="false"
          >
            Thông báo cho người dân
          </b-form-checkbox>
        </b-form>
      </div>
    </div>
  </ValidationObserver>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";
export default {
  name: "FormTaoMoi",
  components: {
    vueDropzone: vue2Dropzone
  },
  data() {
    return {
      checked: true,
      internalForm: {
        Name: "",
        Code: "abc",
        Description: "",
        File: "",
        IsPublic: true
      },
      isValid: {
        TieuDe: true,
        FileDinhKem: true
      },
      errorMessages: {
        FileDinhKem: ""
      },
      dropzoneOptions: {
        thumbnailWidth: 100,
        maxFilesize: 5,
        maxFiles: 1,
        autoProcessQueue: false,
        previewsContainer: false,
        url: "#",
        acceptedFiles: ".jpg, .jpeg, .png",
      }
    };
  },
  props: {
    form: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Object | null,
      required: false
    },
    readonly: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Boolean | null,
      required: false
    }
  },
  watch: {
    form: {
      handler() {
        this.internalForm = Object.assign({}, this.internalForm, this.form);
      }
    }
  },
  methods: {
    getInternalForm() {
      let formData = new FormData(this.$refs.form);
      formData.append("Name", this.internalForm.Name);
      formData.append("Description", this.internalForm.Description);
      formData.append(
        "File",
        this.internalForm.File,
        this.internalForm.File?.name
      );
      formData.append("IsPublic", this.internalForm.IsPublic);
      return formData;
    },
    fileAdded(files, progress, bytesSent) {
      let errorMaxSize = false;
      let totalData = 0;
      for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
        let file = files[fileIndex];
        totalData += file.size;
      }
      if (totalData / 1024 > 5 * 1024) {
        errorMaxSize = true;
      }
      if (errorMaxSize) {
        for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
          let file = files[fileIndex];
          this.$refs.FileDropzone.removeFile(file);
        }
      } else {
        for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
          this.internalForm.File = files[fileIndex];
        }
      }

      if (errorMaxSize) {
        alert("Dung lượng file không quá 5MB");
      }
    },
    deleteFileAdded(fileIdx, type) {
      this.internalForm.File.splice(fileIdx, 1);
    }
  }
};
</script>

<style scoped>
</style>
