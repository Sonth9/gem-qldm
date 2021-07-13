<template>
  <div class="header">
    <div class="position-relative content">
      <div class="logo-text">
        <a class="header-logo">
          <b-link :to="{ path: '/trang-chu' }">
            <img src="../../assets/images/logo.png" />
          </b-link>
        </a>
        <div class="header-title">Hệ thống Quản lý Danh mục</div>
      </div>
      <div class="nav-toggle mt-2" @click="toggleNav()">
        <font-awesome-icon icon="bars" />
      </div>
      <BaseHeaderAccount />
    </div>
  </div>
</template>

<script>
import {
  addLeftMenuAndOverLayClass,
  removeLeftMenuAndOverlayClass
} from "@/utils/headerUtils";
import _isEmpty from "lodash/isEmpty";
import BaseHeaderAccount from "@/components/common/BaseHeaderAccount";
export default {
  name: "BaseHeader",
  components: {
    BaseHeaderAccount
  },
  methods: {
    toggleNav() {
      window.addEventListener("resize", () => {
        removeLeftMenuAndOverlayClass();
      });
      if (!_isEmpty(document.getElementsByClassName("left-menu-show"))) {
        removeLeftMenuAndOverlayClass();
      } else {
        addLeftMenuAndOverLayClass();
      }
      document.getElementById("overlay-common") &&
        document
          .getElementById("overlay-common")
          .addEventListener("click", () => {
            if (!_isEmpty(document.getElementsByClassName("left-menu-show"))) {
              removeLeftMenuAndOverlayClass();
            }
          });
    }
  }
};
</script>

<style scoped>
</style>
