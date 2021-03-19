<template>
  <div class="notification is-info">
    <div class="columns is-mobile">
      <div class="column is-10">
        <p class="is-size-5">Ticket {{ number }} | {{ tags }} | {{ title }}</p>
        <!-- TODO: Add due dates to tickets on backend -->
        <!-- <p>
          DUE DATE
        </p> -->
        <!-- <p>Due May 25, 2020.</p> -->
      </div>
      <div class="column is-2">
        <span @click="deletePin"><i class="bx bxs-pin bx-sm"></i></span>
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

import store from "@/store";
import { deletePinnedTicket, PinnedTicketRecord } from "@/api/pinned";

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
    const number = computed(() => props.pinRecord.ticket.ticket_number);
    const tags = computed(() => {
      const tagList = props.pinRecord.ticket.tag_list;
      if (typeof tagList === "undefined") {
        return "No Tags";
      } else {
        // Create a string from all tags
        // This could be factored out
        let tagString = "";
        tagList.forEach(
          element => (tagString = tagString.concat(`${element.title} `))
        );
        tagString = tagString.trim();

        return tagString;
      }
    });
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

    return {
      number: number,
      tags: tags,
      title: title,
      deletePin: deletePin
    };
  }
});

export default pinnedTicketComponent;
</script>
