<template>
  <ValidationObserver ref="observer" tag="form">
    <div class="row">
      <div class="col-md-12">
        <b-form>
          <div id="tao-nguoi-dung">
            <b-form-group
              class="required"
              label="Tên đăng nhập"
              label-for="userName"
            >
              <ValidationProvider name="internalForm.userName" rules="required">
                <div slot-scope="{ errors }">
                  <b-form-input
                    id="name"
                    v-model="internalForm.userName"
                    type="text"
                    required
                    :readonly="true"
                    placeholder=""
                    :class="{ 'is-danger': errors.length > 0 }"
                  />
                  <p :class="{ error: errors.length > 0 }">{{ errors[0] }}</p>
                </div>
              </ValidationProvider>
            </b-form-group>
            <b-form-group label="Email" label-for="email">
              <ValidationProvider name="internalForm.email">
                <div slot-scope="{ errors }">
                  <b-form-textarea
                    id="email"
                    v-model="internalForm.email"
                    type="text"
                    placeholder=""
                    :readonly="true"
                    rows="2"
                    max-rows="100"
                    no-resize
                    :class="{ 'is-danger': errors.length > 0 }"
                    class="overflow-y-hidden"
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
export default {
  name: "FomNguoiDung",
  data() {
    return {
      internalForm: {
        userName: "",
        email: ""
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
