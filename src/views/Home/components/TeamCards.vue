<template>
  <Cards
    :list="teams"
    title="Your Teams"
    missing-message="Your teams will show up here."
  >
    <template #card="{item: {name, id}}">
      <router-link
        :to="`/teams/${id}/`"
        class="box  ticket-card is-clickable"
        :style="{ borderLeft: `5px solid` }"
      >
        <label class="title is-6">
          {{ name }}
        </label>
      </router-link>
    </template>
  </Cards>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ReadTeamRecord } from "@/api/types";
import Cards from "./Cards.vue";

export default defineComponent({
  components: {
    Cards
  },
  props: {
    teams: {
      type: Object as PropType<ReadTeamRecord[]>,
      required: true
    }
  }
});
</script>

<style scoped></style>
