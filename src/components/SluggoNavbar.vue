<template>
  <nav class="navbar is-link" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <h1 class=" is-size-3 has-text-weight-bold">Sluggo</h1>
      </router-link>
      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="left-navbar"
        onclick="this.classList.toggle('is-active');document.getElementById(this.dataset.target).classList.toggle('is-active');"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div id="left-navbar" class="navbar-menu">
      <div class="navbar-start">
        <router-link class="navbar-item" to="/tickets">
          <span class="navbar-item-name is-size-4">Tickets</span>
        </router-link>
        <router-link class="navbar-item" to="/users">
          <span class="navbar-item-name is-size-4">Users</span>
        </router-link>
        <router-link class="navbar-item" to="/admin">
          <span class="navbar-item-name is-size-4">Admin</span>
        </router-link>
        <router-link class="navbar-item" to="/help">
          <span class="navbar-item-name is-size-4">Help</span>
        </router-link>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="navbar-item has-dropdown is-hoverable is-size-4">
            <a class="navbar-link">
              Welcome, User
              <img src="" />
            </a>
            <div class="navbar-dropdown is-boxed is-size-4">
              <router-link class="navbar-item" to="/new_team">
                Create Team
              </router-link>
              <router-link class="navbar-item" to="/login">
                Logout
              </router-link>
            </div>
          </div>
          <div class="buttons">
            <router-link class="button is-primary" to="/login">
              Sign up
            </router-link>
            <router-link class="button is-light" to="/login">
              Sign in
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const sluggoNavbarComponent = defineComponent({
  name: "SluggoNavbar"
});

export default sluggoNavbarComponent;
</script>
