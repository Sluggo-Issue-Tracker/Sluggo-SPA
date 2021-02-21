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
        This page doesn't have error popups for authentication problems; please
        check the console to see if anything went wrong
      </p>
      <br />
      <p>
        Current Key: {{ key }}
        <strong>(will be deloaded if manually navigated or reloaded)</strong>
      </p>
      <br />
      <form @submit.prevent="login">
        <label for="username">Username </label>
        <input
          type="text"
          name="username"
          v-model="username"
          placeholder="Username"
        />
        <br />
        <label for="email">Email (used for login) </label>
        <input type="text" name="email" v-model="email" placeholder="email" />
        <br />
        <label for="password">Password (used for login) </label>
        <input
          type="password"
          name="password"
          v-model="password"
          placeholder="password"
        />
        <br />
        <label for="secondaryPassword">Secondary Password (for signup) </label>
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
  <section class="section">
    <div class="container">
      <h1 class="title">Team Control</h1>
      <p>Note: Requires authentication</p>

      <form @submit.prevent="setTeam">
        <label for="teamId">Team ID </label>
        <input type="number" name="teamId" v-model="teamId" placeholder="0" />
        <br />

        <button>Set Team</button>
      </form>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useRouter } from "vue-router";
import store from "@/store";
import { generateTeamPageLink } from "@/methods/teamPage";

export default defineComponent({
  name: "Auth",
  setup() {
    const username = ref("");
    const email = ref("");
    const password = ref("");
    const secondaryPassword = ref("");
    const teamId = ref(0);

    const key = computed(() => store.state.token);

    const router = useRouter();

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

    const setTeam = () => {
      store.dispatch.doSetTeam(teamId.value).then(response => {
        router.push(generateTeamPageLink(response));
      });
    };

    return {
      username,
      email,
      password,
      secondaryPassword,
      login,
      signup,
      signout,
      teamId,
      setTeam,
      key
    };
  }
});
</script>
