<template>
  <div
    :class="{ dropdown: true, 'is-right': isRight, 'is-active': isOpen }"
    data-testid="dropdown-container"
  >
    <div class="dropdown-trigger emblemContainer" :onclick="handleToggle">
      <ProfileEmblem :name="username ?? ''" />
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
import { computed, defineComponent, ref } from "vue";
import ProfileEmblem from "../../ProfileEmblem";
import { LOGOUT_REDIRECT } from "../../../../constants";
import reactiveWindow from "../../../methods/reactiveWindow";

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
    const { width } = reactiveWindow();
    const isRight = computed(() => width.value >= 1024);

    const handleToggle = () => {
      isOpen.value = !isOpen.value;
    };

    const handleLogout = async () => {
      window.location.replace(LOGOUT_REDIRECT);
    };

    return {
      handleToggle,
      handleLogout,
      isRight,
      isOpen
    };
  }
});
</script>

<style scoped>
.emblemContainer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
}
</style>
