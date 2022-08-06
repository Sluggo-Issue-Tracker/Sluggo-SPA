<template>
  <Cards
    :list="tickets"
    itemKey="title"
    :title="title"
    missing-message="Your assigned tickets will show up here."
  >
    <template #card="{item: {ticket_number, title, status, team}}">
      <article class="tile is-child">
        <div
          class="box is-tile ticket-card is-clickable"
          :style="{
            borderLeft: `5px solid ${status?.color ?? 'hsl(0, 0%, 21%)'}`
          }"
        >
          <label class="title is-6">
            {{ team.name }}-{{ ticket_number }}
          </label>
          <p>
            {{ title }}
          </p>
        </div>
      </article>
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
