<template>
  <Cards
    :list="teams"
    itemKey="name"
    title="Your Teams"
    missing-message="Your teams will show up here."
  >
    <template #header="{item: {name}}">
      {{ name }}
    </template>
    <template #body> </template>
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
