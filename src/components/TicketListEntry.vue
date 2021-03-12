<template>
  <tr>
    <td class="is-narrow">{{ ticket.ticket_number }}</td>
    <td class="is-narrow">
      <a @click="click">{{ ticket.title }}</a>
    </td>
    <td class="is-narrow">
      <span v-if="ticket.status" class="tag is-link">
        {{ ticket.status.title }}
      </span>
    </td>
    <td>
      <span
        class="tag has-background-grey-lighter"
        v-for="tag in ticket.tag_list"
        v-bind:key="tag.id"
      >
        {{ tag.title }}
      </span>
    </td>
  </tr>
</template>

<script lang="ts">
import { TicketRecord } from "@/api/tickets";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "TicketListEntry",
  props: {
    data: {
      type: Object as () => TicketRecord,
      required: true
    }
  },
  emits: ["click"],
  setup(props, context) {
    const ticket = ref(props.data);
    const click = () => {
      context.emit("click");
    };
    return {
      ticket,
      click
    };
  }
});
</script>
