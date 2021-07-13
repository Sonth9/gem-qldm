<template>
  <div id="app">
    <div id="overlay-common" />
    <BaseHeader v-if="isLogin" />
    <BaseLeftMenu v-if="isLogin" />
    <div id="main-wrapper" v-if="isLogin">
      <BaseBreadCrumb />
      <div id="content-wrapper">
        <router-view />
      </div>
    </div>
    <div v-else>
      <router-view />
    </div>
  </div>
</template>

<script>
import BaseHeader from "@/components/common/BaseHeader";
import BaseLeftMenu from "@/components/common/BaseLeftMenu";
import BaseBreadCrumb from "@/components/common/BaseBreadCrumb";

import { mapGetters } from "vuex";

export default {
  name: "App",
  metaInfo: {
    title: "Hệ thống Quản lý danh mục",
    meta: [
      {
        name: "description",
        content: "Hệ thống Quản lý danh mục"
      }
    ]
  },
  components: {
    BaseHeader,
    BaseLeftMenu,
    BaseBreadCrumb
  },
  computed: {
    ...mapGetters({
      isLogin: "common/isLogin"
    })
  }
};
</script>

<style lang="scss">
@import "assets/css/base/index";
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap");

html,
body {
  font-family: "Roboto", sans-serif;
}

#app {
  font-family: "Roboto", sans-serif;
}
</style>
