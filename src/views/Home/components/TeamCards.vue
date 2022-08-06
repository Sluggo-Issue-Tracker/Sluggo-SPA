<template>
  <Cards
    :list="teams"
    itemKey="name"
    title="Your Teams"
    missing-message="Your teams will show up here."
  >
    <template #card="{item: {name}}">
      <article class="tile is-child">
        <div
          class="box is-tile ticket-card is-clickable"
          :style="{ borderLeft: `5px solid` }"
        >
          <label class="title is-6">
            {{ name }}
          </label>
        </div>
      </article>
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
