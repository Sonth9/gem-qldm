<template>
  <div>
    <div class="notification">
      <b-row>
        <b-card
            style="max-width: 20rem;min-width: 350px;"
            class="mb-2 text-center"
            title="Lịch làm việc của Lãnh đạo"
        >
          <template v-slot:header>
            <b-link :to="{ path: '/danh-sach-lich-lam-viec/' + LICH_LAM_VIEC_CUA_LANH_DAO }">
              <img class="category-img" width="80px" src="@/assets/images/lich-lam-viec-lanh-dao.svg" />
            </b-link>
          </template>
        </b-card>
        <b-card
            style="max-width: 20rem;min-width: 350px;"
            class="mb-2 text-center"
            title="Lịch làm việc của đơn vị"
        >
          <template v-slot:header>
            <b-link :to="{ path: '/danh-sach-lich-lam-viec/' + LICH_LAM_VIEC_CUA_DON_VI }">
              <img class="category-img" width="80px" src="@/assets/images/lich-lam-viec-don-vi.svg" />
            </b-link>
          </template>
        </b-card>
        <b-card
            style="max-width: 20rem;min-width: 350px;"
            class="mb-2 text-center"
            title="Lịch làm việc của cá nhân"
        >
          <template v-slot:header>
            <b-link :to="{ path: '/danh-sach-lich-lam-viec/' + LICH_LAM_VIEC_CUA_CA_NHAN }">
              <img class="category-img" width="80px" src="@/assets/images/lich-lam-viec-don-vi.svg" />
            </b-link>
          </template>
        </b-card>
        <b-card
            style="max-width: 20rem;min-width: 350px;"
            class="mb-2 text-center"
            title="Tạo lịch làm việc"
        >
          <template v-slot:header>
            <b-link :to="{ path: '/tao-lich-lam-viec' }">
              <img src="@/assets/images/tao-lich-lam-v.svg" />
            </b-link>
          </template>
        </b-card>
      </b-row>
    </div>
  </div>
</template>

<script>
import {
  ROUTE_NAME,
  LICH_LAM_VIEC_CUA_LANH_DAO,
  LICH_LAM_VIEC_CUA_DON_VI,
  LICH_LAM_VIEC_CUA_CA_NHAN
} from "@/constants/constants";
import { callApiGetLoaiLichLamViec } from "@/api/lich-lam-viec/index";
export default {
  name: "LichLamViec",
  data() {
    return {
      ROUTE_NAME: ROUTE_NAME,
      LICH_LAM_VIEC_CUA_LANH_DAO: LICH_LAM_VIEC_CUA_LANH_DAO,
      LICH_LAM_VIEC_CUA_DON_VI: LICH_LAM_VIEC_CUA_DON_VI,
      LICH_LAM_VIEC_CUA_CA_NHAN: LICH_LAM_VIEC_CUA_CA_NHAN,
      dataScheduleTypes: []
    };
  },

  created() {
    this.layLoaiLichLamViec();
  },
  methods: {
    layLoaiLichLamViec() {
      callApiGetLoaiLichLamViec({})
        .then(res => {
          if (res.status == 200 && res.data.succeeded) {
            this.dataScheduleTypes = res.data.data;
          }
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../../assets/css/components/thong-bao/_thong_bao.scss";
</style>
<style scoped>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: transparent;
  background-clip: border-box;
  border: none;
  border-radius: unset;
  padding: 20px 20px;
}
.card-title {
  font-size: 17px;
  font-weight: 500;
}
.card-body {
  padding-top: 0px;
}
.card-header {
  background-color: unset;
  border-bottom: unset;
}
.card-text {
  color: rgba(157, 173, 187, 1);
}
.category-img {
  width: 80px;
}
</style>
