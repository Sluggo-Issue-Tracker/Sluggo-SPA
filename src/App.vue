<template>
  <UserProvider>
    <Navbar />
    <section class="section has-background-light is-fullheight">
      <router-view />
    </section>
    <SluggoFooter />
  </UserProvider>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Navbar from "./components/Navbar";
import UserProvider from "./components/UserProvider.vue";
import SluggoFooter from "./components/SluggoFooter.vue";

export default defineComponent({
  components: {
    Navbar,
    UserProvider,
    SluggoFooter
  }
});
</script>

<style scoped>
.is-fullheight {
  /* this is kinda hacky. */
  min-height: calc(100vh - 72px - 168px);
}
</style>
