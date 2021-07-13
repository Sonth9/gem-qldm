<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item>
        <b-link :to="{ path: '/trang-chu' }">
          <b-icon icon="house-door" variant="secondary"></b-icon>
        </b-link>
      </b-breadcrumb-item>
      <b-breadcrumb-item active>{{ breadcrumb }}</b-breadcrumb-item>
    </b-breadcrumb>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "BaseBreadCrumb",
  components: {},
  props: {
    activeItem: {
      type: String,
      default: ""
    }
  },
  computed: {
    ...mapGetters({
      breadcrumb: "common/breadcrumb"
    })
  },
  mounted() {}
};
</script>

<style scoped>
</style>
