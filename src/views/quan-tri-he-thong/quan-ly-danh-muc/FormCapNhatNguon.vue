<template>
  <validationObserver ref="observer" tag="form">
    <b-form>
      <div id="cap-nhat-loai" class="row">
        <div class="col-md-12">
          <b-form-group class="required" label="Tên nguồn nhận thông báo" label-for="Ten">
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
                  {{ errors.length > 0 ? "Vui lòng nhập tên nguồn nhận thông báo" : "" }}
                </p>
              </div>
            </ValidationProvider>
          </b-form-group>
        </div>
        <div class="col-md-12">
          <b-form-group class="required" label="Mô tả thông báo" label-for="Ten">
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
      </div>
    </b-form>
  </validationObserver>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CapNhatChiTieu",
  data() {
    return {
      internalForm: {
        Name: "",
        Description: ""
      }
    };
  },
  props: {
    chiTieuCanCapNhat: {
      type: Object,
      required: true
    },
    readonly: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: Boolean | null,
      required: false
    }
  },
  computed: {
    ...mapGetters({
      danhSachNguonPAKN: "category/danhSachTatCaNguonPAKN"
    })
  },
  created() {
    this.internalForm = Object.assign(
      {},
      this.internalForm,
      this.chiTieuCanCapNhat
    );
    this.internalForm.Name = this.internalForm.name;
  },
  watch: {
    form: {
      handler() {
        this.internalForm = Object.assign(
          {},
          this.internalForm,
          this.chiTieuCanCapNhat
        );
      }
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
