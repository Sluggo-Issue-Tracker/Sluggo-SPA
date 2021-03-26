<template>
  <span v-if="typeof tagList !== 'undefined' && tagList.length > 0"
    >|
    <template v-for="tag in tagList" :key="tag.id">
      <span>{{ tag.title }}&nbsp;</span>
    </template></span
  >
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { TagRecord } from "@/api/tags";

const tagListComponent = defineComponent({
  name: "TagList",
  props: {
    tagList: {
      type: Object as PropType<TagRecord>,
      required: true
    }
  }
});

export default tagListComponent;
</script>
