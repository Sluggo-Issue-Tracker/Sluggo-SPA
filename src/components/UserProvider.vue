<template>
  <div v-if="authUser">
    <slot />
  </div>
  <div v-if="!authUser" data-testid="user-loading-container">
    Loading...
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import store from "@/store";
import { UserRecord } from "@/api/types";

export default defineComponent({
  name: "UserProvider",
  setup: () => {
    const authUser = ref<UserRecord | undefined>(store.state.authUser);
    onMounted(async () => {
      await store.dispatch.doFetchAuthUser();
      authUser.value = store.getters.authUser;
    });
    return {
      authUser
    };
  }
});
</script>

<style scoped></style>
