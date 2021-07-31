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

        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="sluggo-menu"
          :onclick="handleBurgerClicked"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div
        id="sluggo-menu"
        :class="{ 'navbar-menu': true, 'is-active': isMenuOpen }"
      >
        <div class="searchBarContainer hasDividerLeft">
          <Search />
        </div>
        <div class="navbar-item hasDividerLeft">
          <button class="button is-link">Create Ticket</button>
        </div>
      </div>
      <!-- Right side of the navbar -->
      <div class="navbar-end">
        <div class="navbar-item simpleLevel hasDividerLeft">
          <NavbarDropdown :username="authUser?.username ?? ''" />
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
import { defineComponent, ref, onMounted } from "vue";
import store from "@/store";
import IconSluggo from "@/assets/IconSluggo";
import NavbarDropdown from "./components/NavbarDropdown.vue";
import Search from "@/components/Search";
import { UserRecord } from "@/api/types";

const sluggoNavbarComponent = defineComponent({
  name: "SluggoNavbar",
  components: {
    IconSluggo,
    NavbarDropdown,
    Search
  },
  setup: () => {
    const authUser = ref<UserRecord | undefined>(store.state.authUser);
    const isMenuOpen = ref<boolean>(false);

    const handleBurgerClicked = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    onMounted(async () => {
      if (!store.state.authUser) {
        await store.dispatch.doFetchAuthUser();
        authUser.value = store.state.authUser;
      }
    });

    return {
      authUser,
      isMenuOpen,
      handleBurgerClicked
    };
  }
});

export default sluggoNavbarComponent;
</script>

<style scoped src="./styles.module.scss" lang="scss"></style>
