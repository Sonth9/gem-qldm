<template>
  <draggable :list="items" class="dragArea" ghost-class="opacity-50" group="nested" handle=".handle" tag="ul">
    <li :key="el.item.id" v-for="el in items">
      <div class="d-flex justify-content-start">
        <img alt="file-tree" class="align-self-center handle mr-2" height="20" src="@/assets/icon/minus.png" width="20">
        <div class="align-self-center">{{ el.name }}</div>
      </div>
      <nested-draggable :items="el.children" :level="level + 1" v-if="level < 2"/>
    </li>
  </draggable>
</template>
<script>
import draggable from "vuedraggable";

export default {
  props: {
    items: {
      required: true,
      type: Array
    },
    level: {
      type: Number,
      default: 1
    }
  },
  components: {
    draggable
  },
  name: "nested-draggable"
};
</script>
<style lang="scss" scoped>
.handle {
  cursor: move;
}

.dragArea {
  list-style-type: none;
  /*outline: 1px dashed;*/
  li {
    div {
      min-height: 30px;
      line-height: 30px;
    }
  }
}
</style>
