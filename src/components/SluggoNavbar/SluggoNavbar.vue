<template>
  <nav
    class="navbar navbarContainer"
    role="navigation"
    aria-label="main navigation"
  >
    <IconSluggo :height="50" :width="50" />
    <ProfileEmblem name="Sam" />
  </nav>
  <div class="navigationContainer">
    <div class="sidebarMenu">
      <p>
        Hello world!
      </p>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import IconSluggo from "@/assets/IconSluggo";
import ProfileEmblem from "@/components/ProfileEmblem";

const sluggoNavbarComponent = defineComponent({
  name: "SluggoNavbar",
  components: {
    IconSluggo,
    ProfileEmblem
  }
});

export default sluggoNavbarComponent;
</script>

<style scoped src="./styles.module.scss" lang="scss"></style>
