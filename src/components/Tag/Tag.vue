<template>
  <span class="tagContainer">{{ tag.title }}</span>
</template>

<script lang="ts">
import { TagRecord } from "@/api/types";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "Tag",
  props: {
    tag: {
      type: Object as PropType<TagRecord>,
      required: true
    }
  }
});
</script>

<style scoped src="./styles.module.scss" lang="scss"></style>
