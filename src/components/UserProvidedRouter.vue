<template>
  <UserProvider>
    <router-view />
  </UserProvider>
</template>

<script lang="ts">
import UserProvider from "./UserProvider.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "UserProvidedRouter",
  components: {
    UserProvider
  }
});
</script>

<style scoped></style>
