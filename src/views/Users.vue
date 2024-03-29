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
                <i class="bx bx-search"></i>
              </span>
              <input class="input" type="text" placeholder="Search Users" />
            </div>
          </div>
        </div>
      </div>
      <br />
      <div class="columns is-multiline">
        <!-- Member Selection Panel -->
        <div
          v-for="member in membersList.results"
          v-bind:key="member.id"
          class="column is-one-third"
        >
          <div class="box has-background-grey-lighter">
            <article class="media">
              <!-- <div class="media-left">
                <figure class="image is-96x96">
                  <img alt="Image" />
                </figure>
              </div> -->
              <div class="media-content">
                <div class="content">
                  <p>
                    <strong
                      class="is-4"
                      v-if="!member.owner.first_name || !member.owner.last_name"
                      >{{ member.owner.username }}</strong
                    >
                    <strong class="is-4" v-else>{{
                      member.owner.first_name + " " + member.owner.last_name
                    }}</strong>
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
import { defineComponent, ref, onMounted } from "vue";
import { getTeam } from "@/api/teams";
import { listMembers } from "@/api/members";
import { MemberRecord, PaginatedList, ReadTeamRecord } from "@/api/types";

export default defineComponent({
  name: "Users",
  props: {
    teamId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const teamRecord = ref({} as ReadTeamRecord);
    const membersList = ref({} as PaginatedList<MemberRecord>);
    const listPage = ref(1);
    const teamId = parseInt(props.teamId);

    const getTeamMembers = async () => {
      try {
        const data = await listMembers(teamId, listPage.value);
        membersList.value = data;
      } catch (error) {
        console.log(error);
      }
    };

    const getTeamRecord = async () => {
      const teamId = parseInt(props.teamId);
      try {
        const team = await getTeam(teamId);
        teamRecord.value = team;
        console.log("team loaded :)");
      } catch (error) {
        console.log(error);
      }
    };

    onMounted(async () => {
      await getTeamRecord();
      await getTeamMembers();
    });

    return {
      membersList,
      listPage,
      getTeamMembers,
      getTeamRecord
    };
  }
});
</script>
