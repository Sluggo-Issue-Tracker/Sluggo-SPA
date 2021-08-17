<template>
  <div class="ticket-modal">
    <div
      class="ticket-modal-header"
      :style="{ 'background-color': computedStatusColor }"
    >
      <div class="logo">
        <IconSluggo :height="50" :width="50" />
      </div>
      <div
        class="ticket-name"
        :style="{ 'background-color': computedStatusColor }"
      >
        <EditableTextComponent
          :placeholderText="ticketTitle"
          :backgroundColor="computedStatusColor"
          @isEditing="shouldShowPencil = false"
          @isHiding="shouldShowPencil = true"
        />
      </div>
      <div class="editable-icon" v-if="shouldShowPencil">
        <i class="bx bx-pencil"></i>
      </div>
      <div class="dropdown ticket-status is-primary">
        <div class="dropdown-trigger is-primary">
          <button
            class="button is-primary"
            :style="{ 'background-color': computedStatusColor }"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
          >
            <span>{{ ticketStatus }}</span>
            <span class="icon is-small">
              <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
        </div>
        <div class="dropdown-menu" id="dropdown-menu" role="menu">
          <div class="dropdown-content">
            <a href="#" class="dropdown-item">
              Dropdown item
            </a>
            <a class="dropdown-item">
              Other dropdown item
            </a>
            <a href="#" class="dropdown-item is-active">
              Active dropdown item
            </a>
            <a href="#" class="dropdown-item">
              Other dropdown item
            </a>
            <hr class="dropdown-divider" />
            <a href="#" class="dropdown-item">
              With a divider
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="ticket-modal-body">
      <div class="dropdown-trigger">
        <button class="button">
          <span>Username</span>
        </button>
      </div>
      <div class="dropdown-trigger">
        <button class="button">
          <span>Team</span>
        </button>
      </div>
      <div class="ticket-tags">
        <textarea>Tags</textarea>
      </div>
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
import EditableTextComponent from "@/components/TicketModal/components/EditableText.vue";
import IconSluggo from "@/assets/IconSluggo";

const ticketModalComponent = defineComponent({
  name: "TicketModal",
  components: {
    EditableTextComponent,
    IconSluggo
  },
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
  setup: (props, context) => {
    const ticketId = parseInt(props.ticketId);
    const teamId = parseInt(props.teamId);
    const ticketRecord = ref({});
    const shouldShowPencil = ref(true);
    const ticketStatus = "In Progress";
    const ticketTitle = "Temp Title";
    const resetData = () => {
      ticketRecord.value = {};
    };
    const getData = async () => {
      try {
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
      ticketTitle,
      shouldShowPencil,
      submit,
      remove,
      cancel
    };
  }
});

export default ticketModalComponent;
</script>

<style scoped src="./styles.module.scss" lang="scss"></style>
