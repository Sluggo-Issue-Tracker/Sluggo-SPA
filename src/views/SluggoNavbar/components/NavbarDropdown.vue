<template>
  <div
    :class="{ dropdown: true, 'is-right': true, 'is-active': isOpen }"
    data-testid="dropdown-container"
  >
    <div class="dropdown-trigger emblemContainer" :onclick="handleToggle">
      <ProfileEmblem :name="username" />
      <span data-testid="username-span">{{ username }}</span>
    </div>
    <div :v-if="isOpen" class="dropdown-menu">
      <div class="dropdown-content">
        <a class="dropdown-item" :onclick="handleLogout">
          Logout
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import ProfileEmblem from "@/components/ProfileEmblem";
import store from "@/store";
import router from "@/router";
import { LOGOUT_REDIRECT } from "../../../../constants";

export default defineComponent({
  name: "NavbarDropdown",
  props: {
    username: {
      type: String
    }
  },
  components: {
    ProfileEmblem
  },
  setup: () => {
    const isOpen = ref<boolean>(false);

    const handleToggle = () => {
      isOpen.value = !isOpen.value;
    };

    const handleLogout = async () => {
      window.location.replace(LOGOUT_REDIRECT);
    };

    return {
      handleToggle,
      handleLogout,
      isOpen
    };
  }
});
</script>

<style scoped src="../styles.module.scss" lang="scss"></style>
