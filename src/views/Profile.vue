<template>
  <div class="section" id="vue-user">
    <div class="container">
      <div class="tile is-ancestor">
        <!-- Person Image -->
        <div class="tile is-vertical is-parent is-4">
          <figure class="image is-square">
            <img />
          </figure>
          <!-- <profile_uploader
            v-if="checkUser()"
            v-bind:url="icon_url"
            file_type="image/"
            v-bind:user="current_user.id"
            @submit="upload_image"
          ></profile_uploader> -->
        </div>
        <!-- Text Fields -->
        <div class="tile is-parent is-vertical">
          <!-- Name Field -->
          <div class="field">
            <p class="title is-size-4">Name</p>
            <div class="control">
              <input class="input is-hovered" type="text" />
              <input disabled class="input is-hovered" type="text" />
              <p class="has-text-danger">
                No special characters allowed
              </p>
            </div>
          </div>

          <!-- Proj Field -->
          <p class="title is-size-4">Project Tags</p>
          <p class="subtitle is-size-6 is-italic">
            Note, all new tags will not be visible until an admin approve them.
            Please ping your admin on Slack when you want new tags to be
            approved.
          </p>
          <div class="field">
            <!-- <v-select
              multiple
            >
            </v-select>
            <v-select
              taggable
              multiple
              push-tags
            >
            </v-select>
            <v-select disabled multiple v-model="current_user.tags_list">
            </v-select> -->
            <p class="has-text-danger">
              Tags must be one word and alphanumeric.
            </p>
          </div>

          <!-- Role Field -->
          <div class="field">
            <p class="title is-size-4">Role</p>
            <div class="select">
              <select>
                <template>
                  <option selected>USER ROLE</option>
                  <option>ROLE</option>
                </template>
              </select>
            </div>
            <div class="select">
              <select disabled>
                <template>
                  <option selected>USER ROLE</option>
                  <option>ROLE</option>
                </template>
              </select>
            </div>
          </div>

          <!-- Bio Field -->
          <div class="field">
            <p class="title is-size-4">Bio</p>
            <div class="control">
              <textarea>
                class="textarea"
                rows="10"
              ></textarea
              >
              <textarea disabled class="textarea" rows="10"></textarea>
            </div>
          </div>

          <div>
            <div class="buttons is-pulled-left">
              <button class="button is-info">
                <span class="icon">
                  <i class="bx bxs-chevron-left"></i>
                </span>
                <span>Back</span>
              </button>
            </div>
            <!-- Update and Cancel button -->
            <div class="buttons is-right">
              <button class="button">
                <span class="icon is-small">
                  <i class="bx bx-check"></i>
                </span>
                <span>ButtonText</span>
              </button>
              <button class="button is-warning" @click="resetCurrent">
                <span class="icon is-small">
                  <i class="bx bx-x"></i>
                </span>
                <span>ResetText</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Profile"
  // components: {
  // }
});
</script>

<style scoped></style>
