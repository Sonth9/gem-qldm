<template>
  <div>
    <b-tabs content-class="mt-3">
      <b-tab
        lazy
        title="Quản lý danh mục nguồn nhận thông báo"
        :active="activeTab === `#${QUAN_TRI_THONG_BA0_TAB.QUAN_LY_NGUON_NHAN_THONG_BAO}`"
        @click="changeCurrentTab(QUAN_TRI_THONG_BA0_TAB.QUAN_LY_NGUON_NHAN_THONG_BAO)"
      >
        <div class="box box-form">
          <QuanLyNguonNhanBaoCao />
        </div>
      </b-tab>
      <b-tab
        lazy
        title="Quản lý danh mục loại thông báo"
        :active="activeTab === `#${QUAN_TRI_THONG_BA0_TAB.QUAN_LY_LOAI_THONG_BAO}`"
        @click="changeCurrentTab(QUAN_TRI_THONG_BA0_TAB.QUAN_LY_LOAI_THONG_BAO)"
      >
        <div class="box box-form">
          <QuanLyLoaiThongBao />
        </div>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import { QUAN_TRI_THONG_BA0_TAB, ROUTE_NAME } from "@/constants/constants";
import QuanLyNguonNhanBaoCao from "@/components/pages/quan-tri-he-thong/quan-ly-danh-muc/QuanLyNguonNhanBaoCao";
import QuanLyLoaiThongBao from "@/components/pages/quan-tri-he-thong/quan-ly-danh-muc/QuanLyLoaiThongBao";

export default {
  name: "QuanTriThongBao",
  data() {
    return {
      QUAN_TRI_THONG_BA0_TAB: QUAN_TRI_THONG_BA0_TAB,
      ROUTE_NAME: ROUTE_NAME,
      activeTab: ""
    };
  },
  components: {
    QuanLyNguonNhanBaoCao,
    QuanLyLoaiThongBao
  },
  created() {
    this.activeTab = location.hash;
  },
  watch: {},
  methods: {
    changeCurrentTab(currentTab) {
      this.$router
        .push({
          name: ROUTE_NAME.QUAN_TRI_HE_THONG.THONG_BAO.NAME,
          hash: `#${currentTab}`
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="scss">
.nav-tabs {
  border-bottom: 1px solid #48627b;
  .nav-item {
    .nav-link {
      &:hover {
        border: 1px solid #37495b;
        border-bottom: 1px solid #48627b;
      }
    }
    .nav-link.active {
      border: 1px solid #48627b;
    }
  }
}
</style>
