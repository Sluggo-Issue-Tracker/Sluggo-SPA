<template>
  <div class="notification is-info">
    <div class="columns">
      <div class="column">
        <p class="is-size-5">
          {{ ticketRecord.ticket_number }}
          <span v-if="ticketRecord.tag_list.length > 0"
            >|
            <template v-for="tag in ticketRecord.tag_list" :key="tag.id">
              <span>{{ tag.title }}&nbsp;</span>
            </template></span
          >| {{ ticketRecord.title }}
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

import { TicketRecord } from "@/api/tickets";

const assignedTicketComponent = defineComponent({
  name: "AssignedTicket",
  props: {
    ticketRecord: {
      type: Object as PropType<TicketRecord>,
      required: true
    }
  }
});

export default assignedTicketComponent;
</script>

<style scoped>
.notification {
  cursor: pointer;
}
</style>
