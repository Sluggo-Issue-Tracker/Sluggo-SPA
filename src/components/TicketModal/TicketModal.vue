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
              {{ ticketTitle }}
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
      <div class="dropdown ticket-status" :class="statusDropdownClass">
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
        <div class="dropdown-menu">
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
    <div class="ticket-modal-first-row columns">
      <Dropdown :label="userLabel" class="column" />
      <Dropdown :label="teamLabel" class="column" />
    </div>
    <div class="ticket-modal-second-row columns">
      <!-- make the dropdown a column clas -->
      <Dropdown :label="tagsLabel" class="column" />
      <div class="ticket-due-date column">
        <label class="ticket-field-label">Due Date</label>
        <input
          class="input is-fullwidth"
          type="date"
          placeholder="mm / dd / yyyy"
        />
      </div>
    </div>
    <div class="ticket-modal-third-row columns">
      <div class="ticket-description column">
        <label class="ticket-field-label">Description</label>
        <textarea
          class="textarea has-fixed-size is-fullwidth"
          placeholder="Description"
        ></textarea>
      </div>
    </div>
    <div class="ticket-modal-footer">
      <button class="button is-success">Save changes</button>
      <button class="button">Cancel</button>
      <button class="button is-danger">Delete</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { ReadTicketRecord } from "@/api/types";
import Dropdown from "@/components/Dropdown/Dropdown.vue";
import IconSluggo from "@/assets/IconSluggo";

const ticketModalComponent = defineComponent({
  name: "TicketModal",
  components: {
    IconSluggo,
    Dropdown
  },
  props: {
    ticketRecord: {
      type: Object as () => ReadTicketRecord
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
  setup: () => {
    const shouldShowPencil = ref(true);
    const ticketTitle = ref("Temp Title");
    const ticketStatus = ref("In Progress");
    const statusDropdownClass = ref("");
    const isEditing = ref(false);
    const tempText = ref("");
    const tagsLabel = ref("Tags");
    const userLabel = ref("Assigned to");
    const teamLabel = ref("Team");
    const toggleStatusDropdown = () => {
      statusDropdownClass.value =
        statusDropdownClass.value == "is-active" ? "" : "is-active";
    };
    const setTicketStatus = (status: string) => {
      statusDropdownClass.value = "";
      ticketStatus.value = status;
    };
    const enableEditing = () => {
      isEditing.value = true;
      shouldShowPencil.value = false;
      tempText.value = ticketTitle.value;
    };
    const disableEditing = () => {
      isEditing.value = false;
      shouldShowPencil.value = true;
      tempText.value = "";
    };
    const saveChanges = () => {
      if (isEditing.value == true) {
        isEditing.value = false;
        ticketTitle.value = tempText.value;
      }
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
      computedStatusColor,
      statusDropdownClass,
      ticketTitle,
      tagsLabel,
      userLabel,
      teamLabel,
      shouldShowPencil,
      isEditing,
      tempText,
      enableEditing,
      disableEditing,
      toggleStatusDropdown,
      setTicketStatus,
      saveChanges
    };
  }
});

export default ticketModalComponent;
</script>

<style scoped src="./styles.module.scss" lang="scss"></style>
