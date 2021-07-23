<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    hello world!
  </nav>
  <div class="">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const sluggoNavbarComponent = defineComponent({
  name: "SluggoNavbar"
});

export default sluggoNavbarComponent;
</script>

<style scoped src="./styles.module.scss"></style>
