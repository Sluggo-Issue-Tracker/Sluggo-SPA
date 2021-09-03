<template>
  <span class="error-page">
    <div class="error-message" v-if="isInDevMode == true">
      {{ error || "No error to display!" }}
    </div>
    <div class="error-message" v-else>Error, something went wrong!</div>
    <button class="button is-info is-outlined" @click="$router.push('/')">
      Click to Return Home
    </button>
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";

export default defineComponent({
  name: "Error",
  setup() {
    const error = store.getters.error.message;
    const isInDevMode =
      process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development"
        ? true
        : false;
    return {
      isInDevMode,
      error
    };
  }
});
</script>

<style src="./error.scss" lang="scss"></style>
