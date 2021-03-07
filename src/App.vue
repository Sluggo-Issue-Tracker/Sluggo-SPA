<template>
  <sluggo-navbar></sluggo-navbar>
  <router-view />
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
