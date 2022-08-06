<template>
  <Cards
    :list="tickets"
    itemKey="title"
    :title="title"
    missing-message="Your assigned tickets will show up here."
  >
    <template #header="{item: {team, ticket_number}}">
      {{ `${team.name} - ${ticket_number}` }}
    </template>
    <template #body="{item: {title}}">
      {{ title }}
    </template>
  </Cards>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ReadTicketRecord } from "@/api/types";
import Cards from "./Cards.vue";

export default defineComponent({
  components: {
    Cards
  },
  props: {
    tickets: {
      type: Object as PropType<ReadTicketRecord[]>,
      required: true
    },
    title: { type: String, required: true }
  }
});
</script>

<style scoped></style>
