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
        <div class="editableText">
          <div v-if="!isEditing">
            <span class="text" @click="enableEditing">
              {{ placeholderText }}
            </span>
          </div>
          <div v-if="isEditing" @focusout="disableEditing">
            <input
              v-model="tempText"
              class="input text-box"
              v-bind:style="{ 'background-color': computedStatusColor }"
              v-focus
            />
          </div>
        </div>
      </div>
      <div class="editable-icon" v-if="shouldShowPencil">
        <i class="bx bx-pencil"></i>
      </div>
      <div
        class="dropdown ticket-status"
        ref="statusElement"
        :class="statusClass"
      >
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
    </div>
    <div class="ticket-modal-first-row">
      <div class="dropdown">
        <div class="dropdown-trigger">
          <label class="ticket-field-label">Assigned to</label>
          <button
            class="button ticket-user"
            aria-haspopup="true"
            aria-controls="dropdown-menu"
          >
            <span>Username</span>
            <span class="icon is-small">
              <i class="bx bx-chevron-down"></i>
            </span>
          </button>
        </div>
      </div>
      <div class="dropdown">
        <div class="dropdown-trigger">
          <label class="ticket-field-label">Team</label>
          <button class="button ticket-team">
            <span>Slugbotics</span>
            <span class="icon is-small">
              <i class="bx bx-chevron-down"></i>
            </span>
          </button>
        </div>
      </div>
    </div>
    <div class="ticket-modal-second-row">
      <div class="dropdown">
        <div class="dropdown-trigger">
          <label class="ticket-field-label">Tags</label>
          <button class="button ticket-tags">
            <span>Mechanical, Topside</span>
            <span class="icon is-small">
              <i class="bx bx-chevron-down"></i>
            </span>
          </button>
        </div>
      </div>
      <div class="ticket-due-date">
        <label class="ticket-field-label">Due Date</label>
        <input class="input" type="date" placeholder="mm / dd / yyyy" />
      </div>
    </div>
    <div class="ticket-modal-third-row">
      <div class="ticket-description">
        <label class="ticket-field-label">Description</label>
        <textarea
          class="textarea has-fixed-size"
          placeholder="Description"
        ></textarea>
      </div>
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
  components: {
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
  created() {
    window.addEventListener("keydown", e => {
      if (e.key == "Enter") {
        this.saveChanges();
      }
    });
  },
  setup: (props, context) => {
    const ticketId = parseInt(props.ticketId);
    const teamId = parseInt(props.teamId);
    const ticketRecord = ref({});
    const shouldShowPencil = ref(true);
    const ticketTitle = ref("Temp Title");
    const ticketStatus = ref("In Progress");
    const statusClass = ref("");
    const statusElement = ref<HTMLElement | null>(null);
    const placeholderText = ref("Temp Title");
    const isEditing = ref(false);
    const tempText = ref("");
    const toggleStatusDropdown = () => {
      statusClass.value = statusClass.value == "is-active" ? "" : "is-active";
    };
    const setTicketStatus = (status: string) => {
      statusClass.value = "";
      ticketStatus.value = status;
    };
    const enableEditing = () => {
      isEditing.value = true;
      shouldShowPencil.value = false;
      tempText.value = placeholderText.value;
      isEditing.value = true;
    };
    const disableEditing = () => {
      isEditing.value = false;
      shouldShowPencil.value = true;
      tempText.value = "";
      isEditing.value = false;
    };
    const saveChanges = () => {
      if (isEditing.value == true) {
        isEditing.value = false;
        placeholderText.value = tempText.value;
      }
    };
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
      computedStatusColor,
      statusClass,
      ticketTitle,
      shouldShowPencil,
      statusElement,
      isEditing,
      placeholderText,
      tempText,
      enableEditing,
      disableEditing,
      toggleStatusDropdown,
      setTicketStatus,
      saveChanges,
      submit,
      remove,
      cancel
    };
  }
});

export default ticketModalComponent;
</script>

<style scoped src="./styles.module.scss" lang="scss"></style>
