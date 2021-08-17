<template>
  <UserProvider>
    <SluggoNavbar />
  </UserProvider>
</template>

<script>
import SluggoNavbar from "./SluggoNavbar";
import UserProvider from "../../components/UserProvider";
import { defineComponent } from "vue";

export default defineComponent({
  name: "UserProvidedNavbar",
  components: { SluggoNavbar, UserProvider }
});
</script>

<style scoped></style>
