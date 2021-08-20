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
        :backgroundColor="statusColor"
        :textColor="'white'"
        :borderStyle="'none'"
      />
    </div>
    <div class="ticket-modal-first-row columns">
      <Dropdown
        :label="userLabel"
        class="column"
        :items="testUsers"
        :firstItem="ticketUser"
        @itemSelected="userSelected"
      />
      <Dropdown
        :label="teamLabel"
        class="column"
        :items="testTeams"
        :firstItem="ticketTeam"
        @itemSelected="teamSelected"
      />
    </div>
    <div class="ticket-modal-second-row columns">
      <Dropdown
        :label="tagsLabel"
        class="column"
        :items="testTags"
        :firstItem="ticketTag"
        @itemSelected="tagSelected"
      />
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
import { defineComponent, ref } from "vue";
import { ReadTicketRecord } from "@/api/types";
import Dropdown from "@/components/Dropdown/Dropdown.vue";
import EditableText from "@/components/EditableText/EditableText.vue";
import IconSluggo from "@/assets/IconSluggo";

const ticketModalComponent = defineComponent({
  name: "TicketModal",
  components: {
    IconSluggo,
    Dropdown,
    EditableText
  },
  props: {
    ticketRecord: {
      type: Object as () => ReadTicketRecord
    }
  },
  emits: ["close"],
  setup: () => {
    const shouldShowPencil = ref(true);
    const ticketStatus = ref("In Progress");
    const statusColor = ref("#20A6EE");
    const statusDropdownClass = ref("");
    const tagsLabel = ref("Tags");
    const userLabel = ref("Assigned to");
    const teamLabel = ref("Team");
    const testUsers = [{ data: "Mason" }, { data: "George" }];
    const ticketUser = ref("Mason");
    const testTeams = [{ data: "Slugbotics" }, { data: "Bugslotics" }];
    const ticketTeam = ref("Slugbotics");
    const testTags = [{ data: "Mechanical" }, { data: "Systems" }];
    const ticketTag = ref("Mechanical");
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
    return {
      ticketStatus,
      statusColor,
      statusDropdownClass,
      tagsLabel,
      userLabel,
      teamLabel,
      shouldShowPencil,
      testUsers,
      testTeams,
      testTags,
      ticketUser,
      ticketTeam,
      ticketTag,
      testStatuses,
      statusSelected,
      userSelected,
      teamSelected,
      tagSelected
    };
  }
});

export default ticketModalComponent;
</script>

<style scoped src="./styles.module.scss" lang="scss"></style>
