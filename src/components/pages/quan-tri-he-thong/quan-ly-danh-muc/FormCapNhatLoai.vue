<template>
  <validationObserver ref="observer" tag="form">
    <b-form submit.prevent="true">
      <div id="cap-nhat-loai" class="row">
        <div class="col-md-12">
          <b-form-group class="required" label="Tên thuộc tính" label-for="Ten">
            <ValidationProvider
                    name="internalForm.Ten"
                    rules="required"
                    ref="observer"
            >
              <div slot-scope="{ errors }">
                <b-form-input
                        id="Ten"
                        v-model="internalForm.name"
                        type="text"
                        required
                        :readonly="readonly"
                        placeholder=""
                        :class="{ 'is-danger': errors.length > 0 }"
                />
                <p :class="{ error: errors.length > 0 }">
                  {{ errors.length > 0 ? "Vui lòng nhập tên loại" : "" }}
                </p>
              </div>
            </ValidationProvider>
          </b-form-group>
        </div>
        <div class="col-md-12">
          <b-form-group class="required" label="Tên loại" label-for="Ten">
            <ValidationProvider
              name="internalForm.Ten"
              rules="required"
              ref="observer"
            >
              <div slot-scope="{ errors }">
                <b-form-input
                  id="Ten"
                  v-model="internalForm.description"
                  type="text"
                  required
                  :readonly="readonly"
                  placeholder=""
                  :class="{ 'is-danger': errors.length > 0 }"
                />
                <p :class="{ error: errors.length > 0 }">
                  {{ errors.length > 0 ? "Vui lòng nhập mô tả" : "" }}
                </p>
              </div>
            </ValidationProvider>
          </b-form-group>
        </div>
        <div class="col-md-12">
          <b-form-group>
            <template v-slot:label>Logo
            </template>
            <span class="file-info">
            <span class="file-name" v-if="internalForm.File">
              {{internalForm.File.name}}
            </span>
            <span class="file-name" v-else>
              {{internalForm.filePath}}
            </span>
          </span>
            <div class="col-xl-12 drag-file-content px-0">
              <vue-dropzone :options="dropzoneOptions"
                id="FileDropzone"
                :useCustomSlot=true
                @vdropzone-files-added="(files, progress, bytesSent) => fileAdded(files, progress, bytesSent)"
                name="File"
                ref="FileDropzone">
                <div class="inputDnD">
                  <p class="btn search-information-btn btn-secondary btn-chon-file">Chọn ảnh</p>
                  <span class="DnD-label" style="margin-left: 10px">Chỉ nhận file jpg, jpeg, png.Tổng dung lượng tối đa 5MB.</span>
                </div>
              </vue-dropzone>
              <div class="error-tooltip" v-show="!isValid.File">
                <div class="error-tooltip-top">{{ errorMessages.File }}</div>
              </div>
            </div>
          </b-form-group>
        </div>
        <div class="col-md-12">
          <b-form-checkbox
              v-model="internalForm.isPublic"
              :value="true"
              :unchecked-value="false"
          >
            Thông báo cho người dân
          </b-form-checkbox>
        </div>
      </div>
    </b-form>
  </validationObserver>
</template>

<script>
import vue2Dropzone from "vue2-dropzone";

export default {
  name: "CapNhatThuocTinh",
  components: {
    vueDropzone: vue2Dropzone
  },
  data() {
    return {
      checked: true,
      internalForm: {
        id: "",
        Name: "",
        Description: "",
        Code: "",
        File: "",
        isPublic: true
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
        acceptedFiles: "image/*"
      }
    };
  },
  props: {
    thuocTinhCanCapNhat: {
      type: Object,
      required: true
    },
    readonly: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Boolean | null,
      required: false
    }
  },
  created() {
    this.internalForm = Object.assign(
      {},
      this.internalForm,
      this.thuocTinhCanCapNhat
    );
    // this.internalForm.Name = this.internalForm.name;
  },
  watch: {
    form: {
      handler() {
        this.internalForm = Object.assign(
          {},
          this.internalForm,
          this.thuocTinhCanCapNhat
        );
      }
    }
  },
  methods: {
    getInternalForm() {
      let formData = new FormData(this.$refs.form);
      formData.append("Id", this.internalForm.id);
      formData.append("Name", this.internalForm.name);
      formData.append("Description", this.internalForm.description);
      if (this.internalForm.File instanceof File) {
        formData.append(
          "File",
          this.internalForm.File,
          this.internalForm.File?.name
        );
      } else {
        formData.append("FilePath", this.internalForm.filePath);
      }
      formData.append("IsPublic", this.internalForm.isPublic);
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
          this.$refs.FileDinhKemDropzone.removeFile(file);
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
