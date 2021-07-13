<template>
  <ValidationObserver ref="observer" tag="form">
    <div id="tao-moi-nguon" class="row">
      <div class="col-md-12">
        <b-form>
          <b-form-group
                  class="required"
                  label="Tên nguồn nhận thông báo"
                  label-for="Ten"
          >
            <ValidationProvider name="internalForm.Ten" rules="required">
              <div slot-scope="{ errors }">
                <b-form-input
                        id="Ten"
                        v-model="internalForm.name"
                        type="text"
                        required
                        :readonly="readonly"
                        placeholder="nhập tên nguồn nhận thông báo"
                        :class="{ 'is-danger': errors.length > 0 }"
                />
                <p :class="{ error: errors.length > 0 }">
                  {{
                  errors.length > 0 ? "Vui lòng nhập tên nguồn nhận thông báo" : ""
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
                    label="Mô tả thông báo"
                    label-for="Ten"
            >
              <ValidationProvider name="internalForm.moTa" rules="required">
                <div slot-scope="{ errors }">
                  <b-form-input
                          id="Ten"
                          v-model="internalForm.description"
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
    </div>
  </ValidationObserver>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "FormTaoMoi",
  components: {},
  data() {
    return {
      internalForm: {
        name: "",
        code: "",
        description: ""
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
      return this.internalForm;
    },
    doiGiaTriChiTieuCha(val) {
      this.internalForm.bcMauBaoCaoId = val;
      this.internalForm.bcChiTieuChaId = "";
      this.$store.dispatch("baoCao/layChiTieuChaTuMauBaoCao", {
        mauBaoCaoId: val
      });
    }
  }
};
</script>

<style scoped>
</style>
