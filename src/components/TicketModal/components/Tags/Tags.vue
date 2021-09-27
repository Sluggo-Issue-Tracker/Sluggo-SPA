<template>
  <span
    class="tag is-link is-medium"
    v-for="(item, index) in tags"
    :key="item.id"
    >{{ item.title }}
    <button class="delete" @click="removeTag(index)"></button>
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const TagsComponent = defineComponent({
  name: "Tags",
  props: {
    tags: {
      type: Array
    }
  },
  emits: ["removeTag"],
  setup: (props, context) => {
    const removeTag = (index: number) => {
      context.emit("removeTag", index);
    };
    return {
      removeTag
    };
  }
});
export default TagsComponent;
</script>

<style scoped src="./tags-styles.module.scss" lang="scss"></style>
