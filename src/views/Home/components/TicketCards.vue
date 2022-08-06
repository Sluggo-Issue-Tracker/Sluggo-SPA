<template>
  <Cards
    :list="tickets"
    :title="title"
    missing-message="Your assigned tickets will show up here."
  >
    <template #card="{item: {ticket_number, title, status, team}}">
      <div
        class="box is-clickable"
        :style="{
          borderLeft: `5px solid ${status?.color ?? 'hsl(0, 0%, 21%)'}`
        }"
      >
        <label class="title is-6"> {{ team.name }}-{{ ticket_number }} </label>
        <p>
          {{ title }}
        </p>
      </div>
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
