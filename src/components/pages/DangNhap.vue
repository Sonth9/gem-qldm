<template>
  <div class="man-hinh-dang-nhap">
    <div class="text-center mb-3">
      <img alt="Hệ thống ABC" class="logo" src="../../assets/images/logo.png" />
    </div>
    <div class="color-blue-1 font-weight-bold text-center font-size-20 text-uppercase">
      Hệ thống Quản lý Danh mục
    </div>
    <div class="login-box mt-4">
      <ValidationObserver ref="observer" tag="form">
        <b-form>
          <b-form-group class="required position-relative mb-0">
            <ValidationProvider
              :rules="`required_field:${TEN_DANG_NHAP}`"
              name="loginForm.ten_dang_nhap"
            >
              <div slot-scope="{ errors }">
                <b-form-input
                  :class="{ 'is-danger': errors.length > 0 }"
                  @keyup.enter="dangNhap()"
                  id="ten_dang_nhap"
                  placeholder="Tên đăng nhập"
                  required
                  type="text"
                  v-model="loginForm.userName"
                />
                <p :class="{ error: errors.length > 0 }">{{ errors[0] }}</p>
              </div>
            </ValidationProvider>
            <div class="bieu-tuong-dang-nhap">
              <font-awesome-icon icon="user" />
            </div>
          </b-form-group>
          <b-form-group class="required position-relative mb-0">
            <ValidationProvider
              :rules="`required_field:${MAT_KHAU}`"
              name="loginForm.mat_khau"
            >
              <div slot-scope="{ errors }">
                <b-form-input
                  :class="{ 'is-danger': errors.length > 0 }"
                  @keyup.enter="dangNhap()"
                  id="mat_khau"
                  placeholder="Mật khẩu"
                  required
                  type="password"
                  v-model="loginForm.password"
                />
                <p :class="{ error: errors.length > 0 }">{{ errors[0] }}</p>
              </div>
            </ValidationProvider>
            <div class="bieu-tuong-dang-nhap">
              <font-awesome-icon icon="lock" />
            </div>
          </b-form-group>
        </b-form>
      </ValidationObserver>
      <button @click="dangNhap()" class="btn dang-nhap-btn mt-4">
        <span class="align-text-bottom">Đăng nhập</span>
        <div class="lds-ring" v-show="laDangDangNhap">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </button>
    </div>
    <div class="copyright">© 2020</div>
  </div>
</template>

<script>
  import { getValueFromStorageByKey, LOCAL_STORAGE_KEY, setValueToStorageByKey } from "@/utils/localStorage";
  import * as message from "@/constants/message";
  import { HTTP } from "@/api/http-common";
  import { mapGetters } from "vuex";
  import { ROUTE_NAME } from "@/constants/constants";
  import { showMsgError } from "@/utils/commonUtils";
  import _uniqBy from "lodash/uniqBy";

  export default {
    name: "DangNhap",
    data() {
      return {
        loginForm: {
          userName: "",
          password: ""
        },
        TEN_DANG_NHAP: message.TEN_DANG_NHAP,
        MAT_KHAU: message.MAT_KHAU,
        laDangDangNhap: false
      };
    },
    computed: {
      ...mapGetters({
        isLogin: "common/isLogin"
      })
    },
    methods: {
      async dangNhap() {
        const isValid = await this.$refs.observer.validate();
        if (!isValid) {
          return;
        }
        const payload = {
          userName: this.loginForm.userName,
          password: this.loginForm.password
        };
        this.$store
          .dispatch("common/login", payload)
          .then(res => {
            if (res.data.succeeded) {
              let permissions = _uniqBy(res.data.data.listPermissions, 'policy');
              setValueToStorageByKey(
                LOCAL_STORAGE_KEY.ACCESS_TOKEN,
                res.data.data.accessToken
              );
              setValueToStorageByKey(
                LOCAL_STORAGE_KEY.REFRESH_TOKEN,
                res.data.data.refreshToken
              );
              setValueToStorageByKey(
                LOCAL_STORAGE_KEY.PERMISSIONS,
                permissions
              );
              setValueToStorageByKey(
                LOCAL_STORAGE_KEY.USER_INFO,
                res.data.data.userInformation
              );
              this.$store.commit('common/SET_USER_INFO', res.data.data.userInformation)
              this.$store.commit('common/SET_PERMISSIONS', permissions)
              this.$store.dispatch("common/setIsLogin", true);
              localStorage.setItem("isLogin", true);
              HTTP.defaults.headers = {
                Authorization: `Bearer ${getValueFromStorageByKey(
                  LOCAL_STORAGE_KEY.ACCESS_TOKEN
                )}`,
                "Access-Control-Allow-Origin": "*"
              };
              this.$toasted.clear();
              this.$toasted.global.showSuccessMessage({
                message: message.DANG_NHAP_THANH_CONG
              });
              this.$router.push({
                name: ROUTE_NAME.TRANG_CHU
              });
            } else {
              this.$toasted.clear();
              this.$toasted.global.showErrorMessage({
                message: res.data.message
              });
            }
          })
          .catch(error => {
            showMsgError(error.response);
          });
      }
    }
  };
</script>

<style scoped>
</style>
