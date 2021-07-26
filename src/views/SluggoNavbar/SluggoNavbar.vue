<template>
  <div v-if="authUser">
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
          <ProfileEmblem :name="authUser?.username ?? ''" />
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
  </div>
  <div v-if="!authUser">
    Currently loading!
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, provide } from "vue";
import store from "@/store";
import IconSluggo from "@/assets/IconSluggo";
import ProfileEmblem from "@/components/ProfileEmblem";
import { UserRecord } from "@/api/types";

const sluggoNavbarComponent = defineComponent({
  name: "SluggoNavbar",
  components: {
    IconSluggo,
    ProfileEmblem
  },
  setup: () => {
    const authUser = computed<UserRecord>(() => store.getters.getAuthUser);
    provide("authUser", store.getters.getAuthUser);

    return {
      authUser
    };
  }
});

export default sluggoNavbarComponent;
</script>

<style scoped src="./styles.module.scss" lang="scss"></style>
