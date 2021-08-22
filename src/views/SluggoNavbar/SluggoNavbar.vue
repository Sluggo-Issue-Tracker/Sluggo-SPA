  
<template>
  <div>
    <nav
      class="navbar navbarContainer"
      role="navigation"
      aria-label="main navigation"
    >
      <!-- Left side of the navbar -->
      <div class="navbar-brand">
        <a class="navbar-item navbarTitle" :onclick="handleBrandClicked">
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
        :class="{ 'navbar-menu': true, 'is-active': isNavMenuOpen }"
      >
        <div class="searchBarContainer">
          <Search />
        </div>
        <div class="navbar-item hasDividerLeft">
          <button class="button is-info" @click="modalClass = 'is-active'">
            Create Ticket
          </button>
        </div>
        <div class="navbar-item hasDividerLeft">
          <i class="bx bx-bell bellContainer" />
        </div>
        <div class="navbar-item simpleLevel hasDividerLeft">
          <NavbarDropdown :username="authUser?.username ?? ''" />
        </div>
      </div>
    </nav>
    <!-- Side bar menu -->
    <div class="navigationContainer">
      <div :class="{ sidebarMenu: true, menuHidden: !isSidebarOpen }">
        <Sidebar />
      </div>
      <div class="viewContainer">
        <router-view />
      </div>
    </div>
    <div class="section">
      <div class="modal" :class="modalClass">
        <div class="modal-background"></div>
        <div class="modal-content">
          <TicketModal @close="modalClass = ''" />
        </div>
      </div>
    </div>
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
    TicketModal,
    NavbarDropdown,
    Search,
    Sidebar
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