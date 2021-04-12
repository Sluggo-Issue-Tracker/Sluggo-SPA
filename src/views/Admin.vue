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
              <hr>
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
                    <tr v-if="unapprovedList.length === 0">
                      <th>No users to approve</th>
                    </tr>
                    <tr 
                      v-for="member in unapprovedList"
                      v-bind:key="member.id"
                    >
                      <th v-if="!member.owner.first_name || !member.owner.last_name">{{ member.owner.username }}</th>
                      <th v-else>{{ member.owner.first_name + ' ' + member.owner.last_name }}</th>
                      <td>{{ member.owner.email }}</td>
                      <!-- Add later -->
                      <td>USER TAGS</td>
                      <td>{{ member.bio }}</td>
                      <td>
                        <button class="button is-success" @click="approveUser(member)">
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
import StoredTags from "@/components/StoredTags.vue";
import { defineComponent, ref, onMounted } from "vue";
import { TeamRecord, getTeam } from "@/api/teams";
import { PaginatedList } from "@/api/base";
import { listMembers, approveMember, MemberRecord } from "@/api/users";
import store from "@/store";

export default defineComponent({
  name: "Admin",
  components: { StoredTags },
  props: {
    teamId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const teamRecord = ref({} as TeamRecord);
    const membersList = ref({} as PaginatedList<MemberRecord>);
    const listPage = ref(1);
    const teamId = parseInt(props.teamId);
    const unapprovedList = ref({} as Array<MemberRecord>);

    const getTeamMembers = async () => {
      const axiosInstance = store.getters.generateAxiosInstance;
      try {
        membersList.value = await listMembers(
          axiosInstance,
          teamId,
          listPage.value
        );

        // create an array of unapproved users by filtering memberList
        unapprovedList.value = membersList.value.results.filter(member => member.role === 'UA');
        // console.log(unapprovedList.value);
      } catch (error) {
        console.log(error);
      }
    };

    const getTeamRecord = async () => {
      const axiosInstance = store.getters.generateAxiosInstance;
      const teamId = parseInt(props.teamId);
      try {
        const team = await getTeam(axiosInstance, teamId);
        teamRecord.value = team;
        console.log("team loaded :)");
      } catch (error) {
        console.log(error);
      }
    };

    const approveUser = async (member: MemberRecord) => {
      const axiosInstance = store.getters.generateAxiosInstance;
      const teamId = parseInt(props.teamId);

      // send API request (patch) to update user role from "UA" to "AP"
      try {
        await approveMember(
          axiosInstance,
          teamId,
          member
        );
        console.log("approving: " + member.owner.username);
      } catch (error) {
        console.log(error);
      }

      // update team members since a member's role has changed
      await getTeamMembers();
    }

    onMounted(async () => {
      await getTeamRecord();
      await getTeamMembers();
    });

    return {
      teamRecord,
      membersList,
      listPage,
      getTeamMembers,
      getTeamRecord,
      approveUser,
      unapprovedList
    };
  }
});
</script>