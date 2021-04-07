<template>
  <section class="section">
    <div id="vue-admin">
      <div class="section">
        <p class="title">Admin Dashboard</p>

        <div class="columns">
          <div class="column is-one-fifth">
            <aside class="menu">
              <p class="menu-label">
                Administration
              </p>
              <ul class="menu-list">
                <li>
                  <a>
                    Team Settings
                  </a>
                  <ul>
                    <li>
                      <a>
                        Tags
                      </a>
                    </li>
                    <li>
                      <a>
                        Add Tags
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a>Manage Your Team</a>
                  <ul>
                    <li>
                      <a>
                        Members
                      </a>
                    </li>
                    <li>
                      <a>
                        Approve a member
                      </a>
                    </li>
                  </ul>
                </li>
                <!-- <li>
              <a>Authentication</a>
            </li> -->
                <li>
                  <a>Export Member Bios</a>
                </li>
              </ul>
            </aside>
          </div>

          <div class="container">
            <div class="column is-four-fifth">
              <!-- Admin Dashboard-->
              <div>
                <p class="title">
                  Welcome to the Admin Page, User.
                </p>

                <!-- Where all the info will be -->
                <div class="content is-medium">
                  <p>
                    This page will be where you and your fellow admins can
                    control some settings and data for Sluggo!
                  </p>

                  <p>
                    As an admin, you can approve/unapprove tags for tickets,
                    edit their names, or delete them.
                  </p>

                  <p>
                    In addition, as new members of your team join, they can be
                    approved in the approval pane and even promoted to admin as
                    necessary.
                  </p>

                  <p>
                    Note that this page you are currently on will not be visible
                    to users if they are not considered Admins, so make sure to
                    give the admin role to any users that needs it.
                  </p>

                  <p class="has-text-weight-semibold has-text-link">
                    Check out these features through the menu on the left!
                  </p>
                </div>
                <!--
          Development Code to have when testing, enable for debug, otherwise ignore.
          <div class="content is-medium">
            <p>
              Here you can perform some simple actions. For example, hit the Reset Sluggo button to refresh Sluggo from the ground up, it will delete all users, tags, tickets, and pins, but not the user login info. Once done hitting Reset you can just reload the page and you'll be greated with creating a new profile.
            </p>
            <div class="columns">
              <div class="column is-half">
                <button class="button is-large is-link" @click="clean">
                  Reset Sluggo.
                </button>
              </div>
            </div>
          </div> -->
              </div>

              <!-- Approving Tags -->
              <div style="height:60vh;overflow-x:auto;overflow:auto;">
                <p class="title">
                  Approve Tags
                </p>
                <div class="section">
                  <table class="table is-striped is-fullwidth">
                    <thead>
                      <tr>
                        <th>Tag</th>
                        <th>Approve?</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>No tags to approve</th>
                      </tr>
                      <tr>
                        <th>TAG NAME</th>
                        <td>
                          <button class="button is-success">
                            Approve
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <stored-tags v-bind:teamId="teamId"></stored-tags>

              <!-- Approving Users -->
              <div style="height:60vh;overflow-x:auto;overflow:auto;">
                <p class="title">
                  Approve a Member
                </p>
                <table class="table is-striped is-fullwidth">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Tags</th>
                      <th>Bio</th>
                      <th>Approve?</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>No users to approve</th>
                    </tr>
                    <tr>
                      <th>FULL NAME</th>
                      <td>USER EMAIL</td>
                      <td>USER TAGS</td>
                      <td>USER BIO</td>
                      <td>
                        <button class="button is-success">
                          Approve
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- See all users -->
              <div style="height:60vh;overflow-x:auto;overflow:auto;">
                <p class="title">
                  Members
                </p>
                <table class="table is-striped is-fullwidth">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Tags</th>
                      <th>Bio</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>USER NAME</th>
                      <td>USER EMAIL</td>
                      <th>USER ROLE</th>
                      <td>USER TAGS</td>
                      <td>USER BIO</td>
                      <td>
                        <div class="buttons">
                          <button class="button is-success">
                            Make Admin
                          </button>
                          <button class="button is-success">
                            Revoke Admin
                          </button>

                          <button class="button is-danger">
                            Unapprove
                          </button>
                          <button class="button is-info" @click="addTag">
                            Approve
                          </button>
                        </div>
                        <div class="buttons">
                          <button class="button is-info" disabled>
                            Unable to change your own Status
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style="height:60vh;overflow:auto;">
                <p class="title">
                  Export Bios
                </p>
                <p>
                  Click here to view your exported bios. The page source is
                  portable and may be brought to a webpage of your choosing.
                </p>
                <br />
                <div class="buttons">
                  <div class="button is-primary">
                    Export Bios
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import StoredTags from "./StoredTags.vue";
export default defineComponent({
  components: { StoredTags },
  props: {
    teamId: {
      type: String,
      required: true,
    },
  },
});
</script>