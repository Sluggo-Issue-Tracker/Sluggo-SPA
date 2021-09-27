<template>
  <div class="select">
    <select @change="addTag" v-model="selectedTag">
      <option v-for="tag in tags" :key="tag.id" :value="tag">{{
        tag.title
      }}</option>
    </select>
  </div>
</template>

<script lang="ts">
import { TagRecord } from "@/api/types";
import { defineComponent, ref } from "vue";

const TagSelectComponent = defineComponent({
  name: "TagSelect",
  props: {
    tags: {
      type: Array
    }
  },
  emits: ["addTag"],
  setup: (props, context) => {
    const selectedTag = ref({} as TagRecord);
    const addTag = () => {
      context.emit("addTag", selectedTag.value);
    };
    return {
      addTag,
      selectedTag
    };
  }
});
export default TagSelectComponent;
</script>

<style scoped src="./tag-select-styles.module.scss" lang="scss"></style>
