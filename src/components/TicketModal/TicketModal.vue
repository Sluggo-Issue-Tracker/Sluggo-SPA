<template>
  <div class="ticket-modal">
    <div
      class="ticket-modal-header"
      :style="{ 'background-color': statusColor }"
    >
      <div class="logo">
        <IconSluggo :height="50" :width="50" />
      </div>
      <div class="ticket-name" :style="{ 'background-color': statusColor }">
        <EditableText
          :color="statusColor"
          @startedEditing="shouldShowPencil = false"
          @stoppedEditing="shouldShowPencil = true"
        />
      </div>
      <div class="editable-icon" v-if="shouldShowPencil">
        <i class="bx bx-pencil"></i>
      </div>
      <Dropdown
        :items="testStatuses"
        :firstItem="ticketStatus"
        @itemSelected="statusSelected"
        :style="{ 'margin-left': 'auto' }"
        :class="'is-right'"
        :backgroundColor="statusColor"
        :textColor="'white'"
        :borderStyle="'none'"
      />
    </div>
    <div class="ticket-modal-first-row columns">
      <Dropdown
        :label="'Assigned to'"
        class="column"
        :items="testUsers"
        :firstItem="ticketUser"
        @itemSelected="userSelected"
      />
      <Dropdown
        :label="'Team'"
        class="column"
        :items="testTeams"
        :firstItem="ticketTeam"
        @itemSelected="teamSelected"
      />
    </div>
    <div class="ticket-modal-second-row columns">
      <Dropdown
        :label="'Tags'"
        class="column"
        :items="testTags"
        :firstItem="ticketTag"
        @itemSelected="tagSelected"
      />
      <div class="ticket-due-date column">
        <label class="ticket-field-label">Due Date</label>
        <input class="input is-fullwidth" type="date" :value="ticketDueDate" />
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
      <button class="button is-success" @click="saveChanges">
        Save changes
      </button>
      <button class="button" @click="closeModal">Cancel</button>
      <button class="button is-danger" @click="confirmModalClass = 'is-active'">
        Delete
      </button>
    </div>
    <div class="modal" :class="confirmModalClass">
      <div class="modal-background"></div>
      <div class="modal-content">
        <ConfirmDialog @close="confirmModalClass = ''" @delete="closeModal" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { ReadTicketRecord } from "@/api/types";
import Dropdown from "@/components/TicketModal/components/Dropdown/Dropdown.vue";
import EditableText from "@/components/TicketModal/components/EditableText/EditableText.vue";
import ConfirmDialog from "@/components/TicketModal/components/ConfirmDialog/ConfirmDialog.vue";
import IconSluggo from "@/assets/IconSluggo";
const ticketModalComponent = defineComponent({
  name: "TicketModal",
  components: {
    IconSluggo,
    Dropdown,
    EditableText,
    ConfirmDialog
  },
  props: {
    ticketRecord: {
      type: Object as () => ReadTicketRecord
    },
    teamId: {
      type: String
    }
  },
  emits: ["close"],
  setup: (props, context) => {
    const confirmModalClass = ref("");
    const shouldShowPencil = ref(true);
    const ticketStatus = ref("In Progress");
    const ticketUser = ref("Mason");
    const ticketTeam = ref("Slugbotics");
    const ticketTag = ref("Mechanical");
    const ticketDueDate = ref("2018-07-22");
    const statusColor = ref("#20A6EE");
    const statusDropdownClass = ref("");
    const testUsers = [{ data: "Mason" }, { data: "George" }];
    const testTeams = [{ data: "Slugbotics" }, { data: "Bugslotics" }];
    const testTags = [{ data: "Mechanical" }, { data: "Systems" }];
    const testStatuses = [
      { data: "To Do" },
      { data: "In Progress" },
      { data: "Done" }
    ];
    const statusSelected = (item: string) => {
      ticketStatus.value = item;
    };
    const userSelected = (item: string) => {
      ticketUser.value = item;
    };
    const teamSelected = (item: string) => {
      ticketTeam.value = item;
    };
    const tagSelected = (item: string) => {
      ticketTag.value = item;
    };
    const closeModal = () => {
      context.emit("close");
    };
    const saveChanges = () => {
      context.emit("close");
    };
    const setTicketData = () => {
      if (props.ticketRecord) {
        const ticket = props.ticketRecord;
        ticketStatus.value = ticket.status?.title || "";
        ticketUser.value = ticket.assigned_user?.username || "";
      }
    };
    onMounted(setTicketData);
    return {
      ticketStatus,
      ticketDueDate,
      statusColor,
      statusDropdownClass,
      shouldShowPencil,
      testUsers,
      testTeams,
      testTags,
      ticketUser,
      ticketTeam,
      ticketTag,
      testStatuses,
      confirmModalClass,
      setTicketData,
      closeModal,
      saveChanges,
      statusSelected,
      userSelected,
      teamSelected,
      tagSelected
    };
  }
});
export default ticketModalComponent;
</script>

<style scoped src="./ticket-modal-styles.module.scss" lang="scss"></style>
