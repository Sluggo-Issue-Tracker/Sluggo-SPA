<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <!-- Sluggo logo and title -->
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">
          <IconSluggo width="50" height="50" />
          <span class="title">Sluggo</span>
        </router-link>

        <a
          role="button"
          :onclick="handleBurgerClicked"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="true"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <!-- Sluggo menu -->
      <div :class="{ 'navbar-menu': true, 'is-active': isNavMenuOpen }">
        <div class="navbar-start">
          <router-link
            class="navbar-item"
            to="/"
            :onclick="handleBurgerClicked"
          >
            Home
          </router-link>
          <router-link
            class="navbar-item"
            to="/teams"
            :onclick="handleBurgerClicked"
          >
            Teams
          </router-link>
        </div>

        <!-- profile stuff -->
        <div class="navbar-end">
          <div class="navbar-item">
            <NavbarDropdown :username="authUser.username ?? ''" />
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import IconSluggo from "@/assets/IconSluggo";
import NavbarDropdown from "./components/NavbarDropdown.vue";
import { userKey } from "@/api/types";
import { injectStrict } from "@/methods/injectStrict";
import reactiveWindow from "@/methods/reactiveWindow";

const sluggoNavbarComponent = defineComponent({
  name: "SluggoNavbar",
  components: {
    IconSluggo,
    NavbarDropdown
  },
  setup: () => {
    const authUser = injectStrict(userKey);
    const isNavMenuOpen = ref<boolean>(false);
    const { width } = reactiveWindow();
    const modalClass = ref("");
    const handleBurgerClicked = (event: any) => {
      event.preventDefault(); // prevent propagation
      if (width.value >= 1024) {
        // ignore toggle when the window is big
        return;
      }
      isNavMenuOpen.value = !isNavMenuOpen.value;
    };
    return {
      authUser,
      modalClass,
      isNavMenuOpen,
      handleBurgerClicked
    };
  }
});
export default sluggoNavbarComponent;
</script>
<style scoped></style>
