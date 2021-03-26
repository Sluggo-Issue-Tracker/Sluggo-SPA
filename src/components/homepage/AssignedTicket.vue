<template>
  <div class="notification is-info">
    <div class="columns">
      <div class="column">
        <p class="is-size-5">
          {{ ticketRecord.ticket_number }}
          <tag-list :tagList="ticketRecord.tag_list"></tag-list>|
          {{ ticketRecord.title }}
        </p>
        <!-- <p>
          Due DUEDATE
        </p> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import TagList from "@/components/ticket/TagList.vue";
import { TicketRecord } from "@/api/tickets";

const assignedTicketComponent = defineComponent({
  name: "AssignedTicket",
  props: {
    ticketRecord: {
      type: Object as PropType<TicketRecord>,
      required: true
    }
  },
  components: {
    TagList
  }
});

export default assignedTicketComponent;
</script>

<style scoped>
.notification {
  cursor: pointer;
}
</style>
