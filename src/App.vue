<template>
  <UserProvider>
    <Navbar />
    <section class="section has-background-light full-height">
      <router-view />
    </section>
  </UserProvider>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navbar from "./components/Navbar";
import UserProvider from "./components/UserProvider.vue";

export default defineComponent({
  components: {
    Navbar,
    UserProvider
  }
});
</script>

<style scoped>
.full-height {
  height: 100vh;
}
</style>
