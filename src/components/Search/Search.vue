<template>
  <div class="searchContainer">
    <i class="bx bx-search"></i>
    <input type="text" placeholder="Search" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Search",
  setup: () => {
    const query = ref<string>("");

    return {
      query
    };
  }
});
</script>

<style src="./styles.module.scss" lang="scss"></style>
