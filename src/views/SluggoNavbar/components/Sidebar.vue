<template>
  <aside class="menu">
    <p class="menu-label">You</p>
    <ul class="menu-list">
      <li>
        <router-link
          :class="{
            'menu-list': true,
            'is-active': currentRouteName === 'Home'
          }"
          :to="{ name: 'Home' }"
        >
          Home
        </router-link>
      </li>
    </ul>
    <!-- team stuff -->
    <p class="menu-label">
      Your Teams
    </p>
    <ul class="menu-list" v-if="!loadingTeams && teams.length > 0">
      <li v-for="team in teams" :key="team.id">
        <TeamEntry :team="team" :selected-view="selectedView" />
      </li>
    </ul>
    <ul v-if="!loadingTeams && teams.length === 0">
      You are not a member of any teams!
    </ul>
    <ul v-if="loadingTeams">
      Loading teams...
    </ul>
    <!-- invites stuff -->
    <ul class="menu-list" v-if="!loadingInvites"></ul>
  </aside>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/camelcase */

import { computed, defineComponent, onMounted, ref } from "vue";
import router from "@/router";
import TeamEntry from "./TeamEntry.vue";
import { ReadTeamRecord } from "@/api/types";
import { getUsersTeams } from "@/api";

export default defineComponent({
  name: "Sidebar",
  components: {
    TeamEntry
  },
  setup: () => {
    const currentRouteName = computed<string | symbol | null | undefined>(
      () => router.currentRoute.value.name
    );

    const loadingTeams = ref<boolean>(false);
    const teams = ref<ReadTeamRecord[]>([]);
    const loadingInvites = ref<boolean>(false);

    const selectedView = computed<[string?, string?, string?]>(() => {
      // split always yields an empty string at the beginning of the path,
      // hence we omit it
      const [, ...tokens] = router.currentRoute.value.path.split("/");

      return [tokens[0], tokens[1], tokens[2]];
    });

    const loadTeams = async () => {
      loadingTeams.value = true;

      const { data } = await getUsersTeams();
      teams.value = data;
      loadingTeams.value = false;
    };

    onMounted(loadTeams);

    return {
      selectedView,
      currentRouteName,
      loadingTeams,
      loadingInvites,
      teams
    };
  }
});
</script>

<style scoped></style>
