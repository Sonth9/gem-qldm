<template>
  <div style="width: fit-content">
    <a @click="chooseImage" href="#" v-if="image">
      <b-avatar :src="image"
                class="mr-3 ml-3"
                icon="upload"
                rounded
                size="7em">
      </b-avatar>
    </a>
    <b-button @click="chooseImage" class="rounded" style="width: 10em; height: 10em" v-else>
      <b-icon font-scale="4" icon="upload"></b-icon>
    </b-button>
    <span class="d-block mt-2" v-if="image">{{label}}</span>
    <span class="d-block mt-2" v-if="!image">{{placeHolder}}</span>
    <input :ref="refName" @input="onSelectFile" class="file-input" hidden type="file">
  </div>
</template>

<script>
import { kebabCase } from "lodash";

export default {
  name: "BaseUploadImage",
  props: {
    label: String,
    image: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  computed: {
    placeHolder() {
      return `Tải lên ${this.label}`;
    },
    refName() {
      return this.getKey(this.label);
    }
  },
  methods: {
    getKey(value) {
      return kebabCase(value);
    },
    chooseImage() {
      this.$refs[this.refName].click();
    },
    onSelectFile() {
      const input = this.$refs[this.refName];
      const files = input.files;
      if (files && files[0]) {
        this.$emit("input", files[0]);
      }
    }
  }
};
</script>

<style>
.b-avatar-badge {
  font-size: calc(0.96em) !important;
  cursor: pointer;
}
</style>
