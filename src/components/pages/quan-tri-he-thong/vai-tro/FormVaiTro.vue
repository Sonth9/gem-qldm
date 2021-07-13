<template>
  <ValidationObserver ref="observer" tag="form">
    <div class="row">
      <div class="col-md-12">
        <b-form>
          <div id="tao-vai-tro">
            <b-form-group class="required" label="Mã vai trò" label-for="name">
              <ValidationProvider name="Mã vai trò" rules="required">
                <div slot-scope="{ errors }">
                  <b-form-input
                    :class="{ 'is-danger': errors.length > 0 }"
                    :readonly="readonly"
                    id="name"
                    placeholder=""
                    required
                    type="text"
                    v-model="internalForm.name"
                  />
                  <p :class="{ error: errors.length > 0 }">{{ errors[0] }}</p>
                </div>
              </ValidationProvider>
            </b-form-group>
            <b-form-group label="Tên vai trò" label-for="displayName">
              <ValidationProvider name="Tên vai trò">
                <div slot-scope="{ errors }">
                  <b-form-textarea
                    :class="{ 'is-danger': errors.length > 0 }"
                    :readonly="readonly"
                    class="overflow-y-hidden"
                    id="displayName"
                    max-rows="100"
                    no-resize
                    placeholder=""
                    rows="2"
                    type="text"
                    v-model="internalForm.displayName"
                  />
                  <p :class="{ error: errors.length > 0 }">{{ errors[0] }}</p>
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
  import { convertToSlug } from "../../../../utils/commonUtils";

  export default {
    name: "TaoVaiTro",
    data() {
      return {
        internalForm: {
          name: "",
          displayName: ""
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
      "internalForm.name": {
        handler(val) {
          this.internalForm.name = convertToSlug(val)
        }
      },
      form: {
        handler() {
          this.internalForm = Object.assign({}, this.internalForm, this.form);
        },
        immediate: true
      }
    },
    methods: {
      getInternalForm() {
        return this.internalForm;
      }
    }
  };
</script>

<style scoped>
</style>
