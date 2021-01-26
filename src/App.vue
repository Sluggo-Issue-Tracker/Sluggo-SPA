<template>
  <sluggo-navbar></sluggo-navbar>
  <section class="section">
    <div class="container">
      <router-view />
    </div>
  </section>
</template>

<script lang="ts">
import SluggoNavbar from "@/components/SluggoNavbar.vue";

export default {
  components: {
    SluggoNavbar
  }
};
</script>

<style></style>
