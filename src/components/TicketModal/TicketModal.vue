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
        <EditableText
          :color="computedStatusColor"
          @startedEditing="shouldShowPencil = false"
          @stoppedEditing="shouldShowPencil = true"
        />
      </div>
      <div class="editable-icon" v-if="shouldShowPencil">
        <i class="bx bx-pencil"></i>
      </div>
      <Dropdown
        :items="testStatuses"
        :firstItem="testStatuses[0].data"
        :style="{ 'margin-left': 'auto' }"
        :backgroundColor="computedStatusColor"
        :textColor="'white'"
        :borderStyle="'none'"
      />
    </div>
    <div class="ticket-modal-first-row columns">
      <Dropdown
        :label="userLabel"
        class="column"
        :items="testUsers"
        :firstItem="testUsers[0].data"
      />
      <Dropdown
        :label="teamLabel"
        class="column"
        :items="testTeams"
        :firstItem="testTeams[0].data"
      />
    </div>
    <div class="ticket-modal-second-row columns">
      <Dropdown
        :label="tagsLabel"
        class="column"
        :items="testTags"
        :firstItem="testTags[0].data"
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
import { defineComponent, ref, computed } from "vue";
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
    const statusDropdownClass = ref("");
    const tagsLabel = ref("Tags");
    const userLabel = ref("Assigned to");
    const teamLabel = ref("Team");
    const testUsers = [{ data: "Mason" }, { data: "George" }];
    const testTeams = [{ data: "Slugbotics" }, { data: "Bugslotics" }];
    const testTags = [{ data: "Mechanical" }, { data: "Systems" }];
    const testStatuses = [
      { data: "To Do" },
      { data: "In Progress" },
      { data: "Done" }
    ];
    const toggleStatusDropdown = () => {
      statusDropdownClass.value =
        statusDropdownClass.value == "is-active" ? "" : "is-active";
    };
    const setTicketStatus = (status: string) => {
      statusDropdownClass.value = "";
      ticketStatus.value = status;
    };
    const computedStatusColor = computed(() => {
      return "#20A6EE";
    });
    return {
      ticketStatus,
      computedStatusColor,
      statusDropdownClass,
      tagsLabel,
      userLabel,
      teamLabel,
      shouldShowPencil,
      testUsers,
      testTeams,
      testTags,
      testStatuses,
      toggleStatusDropdown,
      setTicketStatus
    };
  }
});

export default ticketModalComponent;
</script>

<style scoped src="./styles.module.scss" lang="scss"></style>
