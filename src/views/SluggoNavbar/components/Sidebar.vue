<template>
  <aside class="menu">
    <ul :class="{ 'menu-list': true, 'is-active': selectedView[0] === '' }">
      <li><a>Home</a></li>
    </ul>
    <ul class="menu-list" >
      <li v-for="team in teams" :key="team.id">
        <TeamEntry :team="team" :selected-view="selectedView" />
      </li>
    </ul>
  </aside>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/camelcase */

import { computed, defineComponent, ref } from "vue";
import router from "@/router";
import TeamEntry from "./TeamEntry.vue";
import { ReadTeamRecord } from "@/api/types";

const sampleTeamData: ReadTeamRecord[] = [
  {
    id: 1,
    name: "bugsltoics",
    description: "this is unused?",
    object_uuid: "asdf",
    ticket_head: 1,
    created: '12'
  }
];

export default defineComponent({
  name: "Sidebar",
  components: {
    TeamEntry
  },
  setup: () => {

    const selectedView = computed<[string?, string?, string?]>(() => {
      // split always yields an empty string at the beginning of the path,
      // hence we omit it
      const [, ...tokens] = router.currentRoute.value.path.split('/');

      const selected: [string?, string?, string?] = [
        undefined,
        undefined,
        undefined
      ];

      for (let i = 0; i < tokens.length && i < 3; ++i) {
        selected[i] = tokens[i];
      }

      return selected;
    });

    return {
      selectedView,
      teams: sampleTeamData
    };
  }

});
</script>

<style scoped></style>