<template>
  <div class="section" id="vue-users">
    <div class="container">
      <div class="section columns">
        <div class="column is-one-third ">
          <p class="title">Team Members</p>
        </div>
        <div class="column">
          <div class="field is-pulled-right">
            <div class="control has-icons-left">
              <span class="icon is-medium">
                <i class="fa fa-search"></i>
              </span>
              <input class="input" type="text" placeholder="Search Users" />
            </div>
          </div>
        </div>
      </div>
      <br />
      <div class="columns is-multiline">
        <!-- Member Selection Panel -->
        <div class="column is-one-third">
          <div class="box has-background-grey-lighter">
            <article class="media">
              <div class="media-left">
                <figure class="image is-96x96">
                  <img alt="Image" />
                </figure>
              </div>
              <div class="media-content">
                <div class="content">
                  <p>
                    <strong class="is-4">USER NAME</strong>
                    <br />
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Users"
  // components: {
  // }
});
</script>
