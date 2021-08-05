<template>
  <body class="error-page">
    <div class="error-default-message">Error, something went wrong!</div>
    <button class="error-home-button" @click="$router.push('/')">
      Click to Return Home
    </button>
    <div class="error-full-message" v-if="shouldDisplayError == true">
      {{ error }}
    </div>
  </body>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";

export default defineComponent({
  name: "Error",
  setup() {
    const error = store.getters.error.message;
    const shouldDisplayError =
      process.env.NODE_ENV == "test" || process.env.NODE_ENV == "development"
        ? true
        : false;
    return {
      shouldDisplayError,
      error
    };
  }
});
</script>

<style src="./error.scss" lang="scss"></style>
