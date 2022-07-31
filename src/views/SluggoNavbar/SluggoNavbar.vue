<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <!-- Sluggo logo and title -->
      <div class="navbar-brand">
        <a class="navbar-item">
          <IconSluggo width="50" height="50" />
          <span class="title">Sluggo</span>
        </a>
      </div>

      <!-- Sluggo menu -->
      <div class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item">
            Home
          </a>
          <a class="navbar-item">
            Teams
          </a>
        </div>
      </div>

      <!-- profile stuff -->
      <div class="navbar-end">
        <div class="navbar-item">
          <NavbarDropdown :username="authUser?.username ?? ''" />
        </div>
      </div>
    </nav>
    <section class="section">
      <div class="container">
        <router-view />
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import store from "@/store";
import TicketModal from "@/components/TicketModal/TicketModal.vue";
import IconSluggo from "@/assets/IconSluggo";
import NavbarDropdown from "./components/NavbarDropdown.vue";
import Search from "@/components/Search";
import { UserRecord } from "@/api/types";
import Sidebar from "@/views/SluggoNavbar/components/Sidebar.vue";
const sluggoNavbarComponent = defineComponent({
  name: "SluggoNavbar",
  components: {
    IconSluggo,
    // TicketModal,
    NavbarDropdown
    // Search,
    // Sidebar
  },
  setup: () => {
    const authUser = ref<UserRecord>(store.getters.authUser);
    const isNavMenuOpen = ref<boolean>(false);
    const isSidebarOpen = ref<boolean>(false);
    const modalClass = ref("");
    const handleBurgerClicked = () => {
      isNavMenuOpen.value = !isNavMenuOpen.value;
    };
    const handleBrandClicked = () => {
      isSidebarOpen.value = !isSidebarOpen.value;
    };
    return {
      authUser,
      modalClass,
      isNavMenuOpen,
      isSidebarOpen,
      handleBurgerClicked,
      handleBrandClicked
    };
  }
});
export default sluggoNavbarComponent;
</script>
<style scoped src="./styles.module.scss" lang="scss"></style>
