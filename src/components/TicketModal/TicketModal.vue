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
    <div class="ticket-modal-body">
      <div class="dropdown-trigger">
        <button class="button">
          <span>Username</span>
        </button>
      </div>
      <div class="ticket-team"></div>
      <div class="ticket-tags"></div>
      <div class="ticket-due-date"></div>
      <div class="ticket-description"></div>
    </div>
    <div class="ticket-modal-footer">
      <button class="button is-success" @click="submit">Save changes</button>
      <button class="button" @click="cancel">Cancel</button>
      <button class="button is-danger" @click="remove">Delete</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import { updateTicket, deleteTicket, getTicket } from "@/api/tickets";
import { ReadTicketRecord } from "@/api/types";
import IconSluggo from "@/assets/IconSluggo";

const ticketModalComponent = defineComponent({
  name: "TicketModal",
  props: {
    teamId: {
      type: String,
      required: true
    },
    ticketId: {
      type: String,
      required: true
    }
  },
  emits: ["close"],
  components: {
    IconSluggo
  },
  setup: (props, context) => {
    const ticketId = parseInt(props.ticketId);
    const teamId = parseInt(props.teamId);
    const ticketRecord = ref({});
    const ticketStatus = "In Progress";
    const resetData = () => {
      ticketRecord.value = {};
    };
    const getData = async () => {
      try {
        console.log(props.teamId);
        ticketRecord.value = await getTicket(ticketId, teamId);
      } catch (error) {
        alert(error);
      }
    };
    const submit = async () => {
      try {
        await updateTicket(ticketRecord.value as ReadTicketRecord, teamId);
      } catch (error) {
        alert(error);
        return;
      }
      context.emit("close");
    };
    const remove = async () => {
      try {
        await deleteTicket(ticketRecord.value as ReadTicketRecord, teamId);
      } catch (error) {
        alert(error);
        return;
      }
      context.emit("close");
    };
    const cancel = () => {
      resetData();
      context.emit("close");
    };
    onMounted(async () => {
      await getData();
    });
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
      computedStatusColor,
      submit,
      remove,
      cancel
    };
  }
});

export default ticketModalComponent;
</script>

<style scoped src="./styles.module.scss" lang="scss"></style>
