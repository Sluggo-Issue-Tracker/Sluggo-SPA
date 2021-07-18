<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Create a Team</h1>
      <h2 class="subtitle">
        Create a new team to hold all of your tickets, members, and more.
      </h2>
    </div>
  </section>
  <section class="section" id="create_team_form_section">
    <div class="container">
      <form @submit.prevent="teamSubmissionTriggered">
        <div class="field">
          <label class="label" for="team_name">Team Name </label>
          <input
            id="team_name"
            class="input"
            type="text"
            name="team_name"
            placeholder="Team Name"
            v-model="teamName"
          />
        </div>
        <button class="button is-primary">
          Create Team
        </button>
      </form>
    </div>
  </section>
  <section class="section">
    <div class="container">
      <p>
        When you create a new team, you will be made an owner of that team. This
        will give you administrative permissions to manage the team.
      </p>
      <p>{{ teamName }}</p>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

import store from "@/store";
import { createTeam } from "@/api/teams";

import { generateTeamPageLink } from "@/methods/teamPage";

const newTeamComponent = defineComponent({
  name: "NewTeam",
  setup: function() {
    const router = useRouter();

    const teamName = ref("");

    const teamSubmissionTriggered = async () => {
      const { data: record } = await createTeam({
        name: teamName.value.toLowerCase(),
        description: "UNUSED"
      });

      await store.dispatch.doSetTeam(record);

      router.push(generateTeamPageLink(record));
    };

    return {
      teamName,
      teamSubmissionTriggered
    };
  }
});

export default newTeamComponent;
</script>
