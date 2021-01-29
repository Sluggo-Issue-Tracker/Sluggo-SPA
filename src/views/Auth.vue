<template>
  <div id="auth-page">
    <h1>Auth</h1>
    <p>Count Test: {{ count }}</p>
    <count-advance-test></count-advance-test>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import { useStore } from "vuex";
// import { key } from "@/store";

export default defineComponent({
  name: "Auth",
  setup() {
    // const store = useStore(key);

    return {};
  }
});
</script>
