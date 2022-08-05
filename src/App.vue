<template>
  <Navbar />
  <section class="section has-background-light full-height">
    <router-view />
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navbar from "./components/Navbar";

export default defineComponent({
  components: {
    Navbar
  }
});
</script>

<style scoped>
.full-height {
  height: 100vh;
}
</style>
