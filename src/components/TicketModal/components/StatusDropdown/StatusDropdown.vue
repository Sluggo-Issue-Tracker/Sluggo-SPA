<template>
  <div class="dropdown ticket-status" ref="statusElement" :class="statusClass">
    <div class="dropdown-trigger" @click="toggleStatusDropdown">
      <button
        class="button is-primary"
        :style="{ 'background-color': computedStatusColor }"
        aria-haspopup="true"
        aria-controls="dropdown-menu"
      >
        <span>{{ ticketStatus }}</span>
        <span class="icon is-small">
          <i class="bx bx-chevron-down"></i>
        </span>
      </button>
    </div>
    <div class="dropdown-menu" id="dropdown-menu" role="menu">
      <div class="dropdown-content">
        <div
          class="dropdown-item"
          v-if="ticketStatus != 'To Do'"
          @click="setTicketStatus('To Do')"
        >
          To Do
        </div>
        <div
          class="dropdown-item"
          v-if="ticketStatus != 'In Progress'"
          @click="setTicketStatus('In Progress')"
        >
          In Progress
        </div>
        <div
          class="dropdown-item"
          v-if="ticketStatus != 'Done'"
          @click="setTicketStatus('Done')"
        >
          Done
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";

const StatusDropdownComponent = defineComponent({
  name: "StatusDropdown",
  emits: ["close"],
  setup: () => {
    const ticketStatus = ref("Done");
    const statusClass = ref("");
    const statusElement = ref<HTMLElement | null>(null);
    const toggleStatusDropdown = () => {
      statusClass.value = statusClass.value == "is-active" ? "" : "is-active";
    };
    const setTicketStatus = (status: string) => {
      statusClass.value = "";
      ticketStatus.value = status;
    };
    const computedStatusColor = computed(() => {
      if (ticketStatus.value == "In Progress") {
        return "#20A6EE";
      } else if (ticketStatus.value == "To Do") {
        return "#828282";
      } else if (ticketStatus.value == "Done") {
        return "#219653";
      } else {
        console.log("Ticket status error");
        return null;
      }
    });
    return {
      ticketStatus,
      statusElement,
      statusClass,
      computedStatusColor,
      setTicketStatus,
      toggleStatusDropdown
    };
  }
});

export default StatusDropdownComponent;
</script>

<style scoped src="./styles.module.scss" lang="scss"></style>
