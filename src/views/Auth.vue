<template>
  <section class="section" id="auth-page">
    <div class="container">
      <h1 class="title">Auth Control</h1>
      <p>
        <em>
          Note: This page is temporary; signup and signon will be migrated to
          server-sided login and sessions at a later point. We are using bearer
          tokens currently in order to get features working on the web app.
        </em>
      </p>
      <p>
        This page doesn't have responses for auth; please check the console to
        see if anything went wrong
      </p>
      <br />
      <p>Current Key: {{ key }}</p>
      <br />
      <form @submit.prevent="login">
        <label for="username">Username</label>
        <input
          type="text"
          name="username"
          v-model="username"
          placeholder="Username"
        />
        <br />
        <label for="email">Email (used for login)</label>
        <input type="text" name="email" v-model="email" placeholder="email" />
        <br />
        <label for="password">Password (used for login)</label>
        <input
          type="password"
          name="password"
          v-model="password"
          placeholder="password"
        />
        <br />
        <label for="secondaryPassword">Username</label>
        <input
          type="password"
          name="secondaryPassword"
          v-model="secondaryPassword"
          placeholder="confirm password"
        />
        <br />

        <button>Login</button>
        <button @click.prevent="signup">Sign up</button>
        <br />
        <button @click.prevent="signout">Sign out</button>
      </form>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import store from "@/store";

export default defineComponent({
  name: "Auth",
  setup() {
    const username = ref("");
    const email = ref("");
    const password = ref("");
    const secondaryPassword = ref("");

    const key = computed(() => store.state.token);

    const login = () => {
      store.dispatch.doLogin({
        username: username.value,
        password: password.value
      });
    };

    const signup = () => {
      store.dispatch.doSignup({
        username: username.value,
        email: email.value,
        password: password.value,
        secondaryPassword: secondaryPassword.value
      });
    };

    const signout = () => {
      store.dispatch.doLogout();
    };

    return {
      username,
      email,
      password,
      secondaryPassword,
      login,
      signup,
      signout,
      key
    };
  }
});
</script>
