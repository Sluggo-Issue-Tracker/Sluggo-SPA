<template>
  <div>Error! something went wrong</div>
  <button @click="$router.push('home')">Click to Return Home</button>
  <div v-if="shouldDisplayError == true">Dev Mode</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Error",
  setup() {
    const shouldDisplayError =
      process.env.NODE_ENV == "test" || process.env.NODE_ENV == "development"
        ? true
        : false;

    return {
      shouldDisplayError
    };
  }
});
</script>

<style scoped></style>
