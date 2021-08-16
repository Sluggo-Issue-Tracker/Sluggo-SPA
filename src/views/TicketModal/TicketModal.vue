<template>
  <div class="ticket-modal">
    <div
      class="ticket-modal-header"
      v-bind:style="{ 'background-color': computedStatusColor }"
    >
      <div class="logo">
        <IconSluggo :height="50" :width="50" />
      </div>
      <div class="ticket-name">
        Temp Ticket Name
      </div>
      <div class="editable-icon">
        pencil
      </div>
      <div class="ticket-status">
        {{ ticketStatus }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import IconSluggo from "@/assets/IconSluggo";
import { computed } from "vue";

const ticketModalComponent = defineComponent({
  name: "TicketModal",
  components: {
    IconSluggo
  },
  setup: () => {
    const ticketStatus = "In Progress";
    const computedStatusColor = computed(() => {
      if (ticketStatus == "In Progress") {
        return "#20A6EE";
      } else if (ticketStatus == "To Do") {
        return "#828282";
      } else if (ticketStatus == "Done") {
        return "#219653";
      } else {
        console.log("Ticket status error");
        return null;
      }
    });
    return {
      ticketStatus,
      computedStatusColor
    };
  }
});

export default ticketModalComponent;
</script>

<style scoped src="./styles.module.scss" lang="scss"></style>
