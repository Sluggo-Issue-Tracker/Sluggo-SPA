<template>
  <UserProvider>
    <Navbar />
    <section class="section has-background-light is-fullheight">
      <router-view />
    </section>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>Bulma</strong> by
          <a href="https://jgthms.com">Jeremy Thomas</a>. The source code is
          licensed
          <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The
          website content is licensed
          <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
            >CC BY NC SA 4.0</a
          >.
        </p>
      </div>
    </footer>
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
.is-fullheight {
  min-height: calc(100vh - 72px - 168px);
}
</style>
