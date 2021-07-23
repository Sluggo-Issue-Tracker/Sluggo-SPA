<template>
  <sluggo-navbar/>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SluggoNavbar from "@/components/navbar/SluggoNavbar.vue";

const teamWrapperComponent = defineComponent({
  name: "TeamWrapper",
  components: {
    SluggoNavbar
  }
});

export default teamWrapperComponent;
</script>
