<template>
  <stored-tags v-for="tagg in tags" :key="tagg.id" :id="tagg.id" :tagName="tagg.name">
  </stored-tags>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import StoredTags from "./StoredTags.vue"

export default defineComponent({
  inject: ["tags"],
  components: {
    StoredTags
  }
});
</script>
