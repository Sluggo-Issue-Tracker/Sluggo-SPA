<template>
  <tr>
    <td class="is-narrow">
      <button class="button" @click="doPinAction">
        <i class="bx bx-pin bx-sm" v-if="pinRecord === undefined"></i>
        <i class="bx bxs-pin bx-sm" v-else></i>
      </button>
    </td>
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
import { defineComponent, ref, PropType } from "vue";
import {
  postPinnedTicket,
  deletePinnedTicket,
  PinnedTicketRecord
} from "@/api/pinned";
import store from "@/store";

export default defineComponent({
  name: "TicketListEntry",
  props: {
    data: {
      type: Object as () => TicketRecord,
      required: true
    },
    initialPinRecord: {
      type: Object as PropType<PinnedTicketRecord>,
      required: false
    }
  },
  emits: ["click"],
  setup(props, context) {
    const ticket = ref(props.data);
    const click = () => {
      context.emit("click");
    };
    const pinRecord = ref<PinnedTicketRecord | undefined>(
      props.initialPinRecord
    );
    const doPinAction = async () => {
      const team = store.state.team;
      if (typeof team === "undefined")
        throw Error("Team not provided on pin attempt");

      const member = store.state.member;
      if (typeof member === "undefined")
        throw Error("Member not provided on pin attempt");

      if (typeof pinRecord.value === "undefined") {
        // Ticket not pinned
        const pinTicketResponse = await postPinnedTicket(
          store.getters.generateAxiosInstance,
          team.id,
          member.id,
          props.data.id
        );

        pinRecord.value = pinTicketResponse;
      } else {
        deletePinnedTicket(
          store.getters.generateAxiosInstance,
          team.id,
          member.id,
          pinRecord.value.id
        );

        pinRecord.value = undefined;
      }
    };
    return {
      ticket,
      click,
      pinRecord,
      doPinAction
    };
  }
});
</script>
