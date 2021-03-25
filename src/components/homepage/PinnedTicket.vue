<template>
  <div
    class="notification is-info hp_pinned_ticket"
    @click="goToTicket(pinRecord.ticket.id)"
  >
    <div class="columns is-mobile">
      <div class="column is-10">
        <p class="is-size-5">
          Ticket {{ number }}
          <span
            v-if="
              typeof pinRecord.ticket.tag_list !== 'undefined' &&
                pinRecord.ticket.tag_list.length > 0
            "
            >|
            <span v-for="tag in pinRecord.ticket.tag_list" :key="tag"
              >{{ tag.title }}
            </span></span
          >
          |
          {{ title }}
        </p>
        <!-- TODO: Add due dates to tickets on backend -->
        <!-- <p>
          DUE DATE
        </p> -->
        <!-- <p>Due May 25, 2020.</p> -->
      </div>
      <div class="column is-2">
        <span @click.prevent="deletePin"><i class="bx bxs-pin bx-sm"></i></span>
      </div>
      <!-- TODO: Determine how to expose ticket completion
                     endpoints on the homepage -->
      <!-- <div class="column">
                        <div class="buttons">
                           <div class="button is-static">
                              <p>Complete</p>
                           </div>
                        </div>
                     </div> -->
      <!-- TODO: Progress indicator -->
      <!-- <div class="columns">
                     <div class="column">
                        <p class="is-size-6 has-text-weight-semibold">50% Complete (2/4)</p>
                        <progress class="progress" value="50" max="100">50%</progress>
                     </div>
                  </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { useRouter } from "vue-router";

import store from "@/store";
import { deletePinnedTicket, PinnedTicketRecord } from "@/api/pinned";
import { generateTicketPageLink } from "@/methods/tickets";

const pinnedTicketComponent = defineComponent({
  name: "PinnedTicket",
  props: {
    pinRecord: {
      type: Object as PropType<PinnedTicketRecord>,
      required: true
    }
  },
  emits: ["pinnedDidUpdate"],
  setup(props, context) {
    const router = useRouter();

    const number = computed(() => props.pinRecord.ticket.ticket_number);
    const title = computed(() => props.pinRecord.ticket.title);

    const deletePin = async () => {
      const team = store.state.team;
      if (typeof team === "undefined") {
        console.log("Attempted to fetch pinned tickets without team in store");
        return;
      }

      const member = store.state.member;
      if (typeof member === "undefined") {
        console.log(
          "Attempted to fetch pinned tickets without member in store"
        );
        return;
      }

      await deletePinnedTicket(
        store.getters.generateAxiosInstance,
        team.id,
        member.id,
        props.pinRecord.id
      );

      context.emit("pinnedDidUpdate");
    };

    const goToTicket = (id: number) => {
      router.push(generateTicketPageLink(store.getters.team, id));

      return;
    };

    return {
      number: number,
      title: title,
      deletePin: deletePin,
      goToTicket: goToTicket
    };
  }
});

export default pinnedTicketComponent;
</script>

<style scoped>
.hp_pinned_ticket {
  cursor: pointer;
}
</style>
