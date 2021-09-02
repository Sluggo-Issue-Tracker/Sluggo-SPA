<template>
  <div class = "error-page">
    <div class="setting" v-if="isInDevMode == true">
      {{ error || "SETTINGS" }}
    </div>
    <div class="error-message" v-else>Error, something went wrong!</div>
    <div class = "pset"> 
      <p>Profile Settings</p>
    </div>
    <hr/>
    <div class = "email"> 
      <p><strong>Email Address:</strong> sluggo@ucsc.edu</p>
    </div>
    <div class = "name">
      <label class="label is-medium">Name</label>
      <textarea class="textarea is-medium" placeholder="Sluggo Slugbotics" rows="1"></textarea>
    </div>
    <div class = "pronouns">
      <label class="label is-medium">Pronouns</label>
      <textarea class="textarea is-medium" placeholder="They/Them/Theirs" rows="2"></textarea>
    </div>
      <div class = "bio">
        <label class="label is-large">Bio</label>
        <textarea class="textarea is-large" placeholder="..."></textarea>
    </div>
    <div class = "updateprofilebutton">
      <button class="button is-info is-outlined" @click="$router.push('/')">
      Update Profile
      </button>
    </div>
  </div>
  
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";

export default defineComponent({
  name: "Settings",
  setup() {
    const error = store.getters.error.message;
    const isInDevMode =
      process.env.NODE_ENV == "test" || process.env.NODE_ENV == "development"
        ? true
        : false;
    return {
      isInDevMode,
      error
    };
  }
});
</script>
<style src="./settings.scss" lang="scss"></style>
