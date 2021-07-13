<template>
  <div :class="{ invalid: isInvalid }">
    <multi-select
      :value="value"
      :options="options"
      :close-on-select="true"
      :clear-on-select="false"
      :show-labels="false"
      :label="label"
      :custom-label="customLabel"
      :track-by="trackBy"
      :placeholder="placeholder"
      @input="onChange"
      @close="onTouch"
    >
      <span slot="noResult"> Không tìm thấy kết quả tương ứng </span>
      <span slot="noOptions"> Danh sách rỗng </span>
    </multi-select>
    <span class="error" v-show="isInvalid">{{ REQUIRED }}</span>
  </div>
</template>

<script>
import MultiSelect from "vue-multiselect";
import { REQUIRED } from "@/constants/validateMessages";

export default {
  name: "BaseMultipleSelect",
  components: {
    MultiSelect
  },
  data() {
    return {
      isTouched: false,
      REQUIRED: REQUIRED
    };
  },
  props: {
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
    },
    label: {
      type: String
    },
    trackBy: {
      type: String
    },
    placeholder: {
      type: String,
      default: "Vui lòng chọn"
    },
    customLabel: {
      type: Function
    },
    checkRequired: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isInvalid() {
      return (
        this.checkRequired &&
        this.isTouched &&
        (!this.value || this.value.length === 0)
      );
    }
  },
  methods: {
    onChange(event) {
      this.$emit("onChange", event);
    },
    onTouch() {
      this.isTouched = true;
    },
    resetTouch() {
      this.isTouched = false;
    }
  }
};
</script>

<style scoped>
</style>
