<template>
  <treeselect
    :class="treeSelectClass(classValid)"
    :clearable="clearable"
    :disabled="disabled"
    :load-options="loadOptions"
    :no-children-text="noChildrenText"
    :normalizer="normalizer"
    :options="optionsDonVi"
    :placeholder="placeholder"
    :ref="refName"
    :show-count="true"
    @input="updateValue"
    v-model="value">
    >
    <label
      :class="labelClassName"
      slot="option-label"
      slot-scope="{node, shouldShowCount, count, labelClassName, countClassName}"
    >
      {{ node.label }}
      <span :class="countClassName" v-if="shouldShowCount && count > 0"
      >({{ count }})</span
      >
    </label>
  </treeselect>
</template>

<script>
  import {LOAD_CHILDREN_OPTIONS, Treeselect} from "@riophae/vue-treeselect";
  import "@riophae/vue-treeselect/dist/vue-treeselect.css";

  export default {
    name: "CayDonVi",
    components: {
      Treeselect
    },
    props: {
      value: {
        type: Number,
        default: 1
      },
      idDonViCha: {
        type: Number,
        default: 1
      },
      path: {
        type: String,
        default: null
      },
      classValid: {
        type: Boolean,
        default: null
      },
      clearable: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      refName: {
        type: String,
        default: "chonCayDonVi"
      },
      noChildrenText: {
        type: String,
        default: "Không có đơn vị con"
      },
      placeholder: {
        type: String,
        default: "Chọn đơn vị"
      }
    },
    data() {
      return {
        optionsDonVi: []
      }
    },
    async created() {
      if (this.disabled) {
        this.idDonViCha = 1
      }
      if (this.path) {
        let arrayParentId = this.path.split("/");
        this.path = arrayParentId.filter(id => id >= this.idDonViCha).join("/");
      } else {
        this.updateValue(this.idDonViCha)
      }
      await this.layDanhSachTheoDonViCha(this.idDonViCha, false, this.path);
    },
    methods: {
      updateValue(value) {
        this.$emit('input', value)
      },
      layDanhSachTheoDonViCha(parentId = null, loadChild = false, path = null,) {
        return this.$store
          .dispatch("donVi/layDanhSachTheoDonViCha", {
            idDonViCha: parentId,
            soCap: loadChild ? 1 : 0,
            path: path
          })
          .then(response => {
            if (!loadChild) {
              this.optionsDonVi = [response]
              this.resetOption();
            } else {
              return response
            }
          });
      },
      loadOptions({action, parentNode, callback}) {
        if (action === LOAD_CHILDREN_OPTIONS) {
          this.layDanhSachTheoDonViCha(parentNode.id, true).then(data => {
            parentNode.children = data;
            callback();
            this.resetOption();
          });
        }
      },
      resetOption() {
        this.$refs[this.refName].initialize(this.optionsDonVi);
      },
      normalizer(node) {
        return {
          id: node.id,
          label: node.tenDonVi,
          children: node.children || null
        };
      },
      treeSelectClass(valid) {
        return {
          "treeselect-invalid": valid
        };
      },
    },

  }
</script>

<style scoped>

</style>