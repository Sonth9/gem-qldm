<template>
  <b-dropdown class="header-account" menu-class="w-100">
    <template v-slot:button-content>
      <div class="user">
        <img v-if="user && user.anhDaiDien_FilePath" :src="user.anhDaiDien_FilePath" class="avatar" />
        <img class="avatar" src="@/assets/images/profile.png" v-else/>
        <div class="userName">{{user.hoTen}}</div>
      </div>
    </template>
    <b-dropdown-item @click="moThongTinNguoiDung()" href="#">
      <font-awesome-icon icon="user"/>
      <span class="pl-2">Thông tin cá nhân</span>
    </b-dropdown-item>
    <b-dropdown-item @click="dangXuat()" href="#">
      <font-awesome-icon icon="sign-out-alt"/>
      <span class="pl-2">Đăng xuất</span>
    </b-dropdown-item>
    <b-modal
      :hide-footer="true"
      centered
      id="thong-tin-tai-khoan"
      ref="thong-tin-tai-khoan"
      size="lg"
      title="Thông tin tài khoản"
    >
      <b-row>
        <b-col cols="6">
          <img
            v-if="user && user.anhDaiDien_FilePath"
            :src="user.anhDaiDien_FilePath"
            alt="Avatar"
            class="anh-dai-dien"
            style="width: 100%"
          />
          <img
            alt="Avatar"
            class="anh-dai-dien"
            src="../../assets/images/profile.png"
            style="width: 100%"
            v-else
          />
        </b-col>
        <b-col>
          <b-row :key="key" v-for="(value, key) in THONG_TIN_TAI_KHOAN">
            <b-col>{{ value }}</b-col>
            <b-col>{{ user[key] }}</b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-modal>
  </b-dropdown>
</template>
<script>
import { ROUTE_NAME, THONG_TIN_TAI_KHOAN } from "@/constants/constants";
import { mapGetters } from "vuex";

export default {
  name: "BaseHeaderAccount",
  data() {
    return {
      THONG_TIN_TAI_KHOAN: THONG_TIN_TAI_KHOAN
    };
  },
  computed: {
    ...mapGetters({
      user: "common/user"
    })
  },
  watch: {
    user(val){
      console.log('user', val);
    }
  },
  methods: {
    moThongTinNguoiDung() {
      this.$refs["thong-tin-tai-khoan"].show();
    },
    dangXuat() {
      localStorage.removeItem("isLogin");
      this.$store.dispatch("common/setIsLogin", false);
      this.$router.push({
        name: ROUTE_NAME.DANG_NHAP
      });
    }
  }
};
</script>
