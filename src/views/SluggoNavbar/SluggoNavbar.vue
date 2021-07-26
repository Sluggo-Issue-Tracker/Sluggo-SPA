<template>
  <nav
    class="navbar navbarContainer"
    role="navigation"
    aria-label="main navigation"
  >
    <!-- Left side of the navbar -->
    <div class="navbar-brand">
      <a class="navbar-item">
        <IconSluggo :height="50" :width="50" />
        <span class="title">Sluggo</span>
      </a>
    </div>
    <!-- Right side of the navbar -->
    <div class="navbar-end">
      <div class="navbar-item simpleLevel hasDividerLeft">
        <ProfileEmblem name="" />
      </div>
    </div>
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
