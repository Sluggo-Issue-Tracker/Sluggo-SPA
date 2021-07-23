<template>
  <nav class="navbar is-link" role="navigation" aria-label="main navigation">
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import NavbarTeamPageLink from "@/components/navbar/NavbarTeamPageLink.vue";

const sluggoNavbarComponent = defineComponent({
  name: "SluggoNavbar",
  components: {
    NavbarTeamPageLink
  }
});

export default sluggoNavbarComponent;
</script>
