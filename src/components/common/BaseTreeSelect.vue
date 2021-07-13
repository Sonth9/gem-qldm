<template>
  <div>
    <treeselect
      :noResultsText="noResultsText"
      :placeholder="placeholder"
      :value="value"
      :multiple="true"
      :options="options"
      @input="onChange"
    />
  </div>
</template>

<script>
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: "BaseTreeSelect",
  components: {
    Treeselect
  },
  data() {
    return {};
  },
  props: {
    noResultsText: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    options: {
      type: Array,
      default() {
        return [];
      }
    },
    value: {
      // eslint-disable-next-line vue/require-prop-type-constructor
      type: String | Intl,
      default() {
        return null;
      }
    }
  },
  computed: {},
  methods: {
    onChange(event) {
      this.$emit("onChange", event);
    }
  }
};
</script>

<style scoped>
</style>
