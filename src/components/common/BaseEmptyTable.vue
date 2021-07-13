<template>
  <div>
    <b-table-simple bordered>
      <b-thead>
        <b-tr>
          <b-th
            v-for="(item, index) in headerTable"
            :key="index"
            :class="item === 'STT' ? 'width-3-percent' : ''"
          >
            {{ item }}
          </b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr>
          <b-td :colspan="headerTable.length" class="center"
            >Không tìm thấy kết quả phù hợp</b-td
          >
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </div>
</template>

<script>
export default {
  name: "BaseEmptyTable",
  components: {},
  props: {
    headerTable: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  mounted() {}
};
</script>

<style scoped>
</style>
