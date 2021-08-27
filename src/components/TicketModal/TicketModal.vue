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
          @saveText="setTitle"
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
        label="Assigned to"
        class="column"
        :items="membersList.results"
        :firstItem="ticketUser"
        @itemSelected="userSelected"
      />
      <Dropdown
        v-if="teams && teams.length > 0"
        :label="'Team'"
        class="column"
        :items="teams"
        :firstItem="ticketTeam"
        @itemSelected="teamSelected"
      />
    </div>
    <div class="ticket-modal-second-row columns">
      <Dropdown
        :label="'Tags'"
        class="column"
        :items="tagsList.results"
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
          v-model="description"
        ></textarea>
      </div>
    </div>
    <div class="ticket-modal-footer">
      <button class="button is-success" @click="saveChanges">
        Save changes
      </button>
      <button class="button" @click="closeModal">Cancel</button>
      <button
        class="button is-danger"
        @click="confirmModalClass = 'is-active'"
        v-if="ticketRecord"
      >
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
import {
  ReadTicketRecord,
  WriteTicketRecord,
  ReadTeamRecord
} from "@/api/types";
import { createTicket } from "@/api/tickets";
import { getUsersTeams } from "@/api/teams";
import { listTags } from "@/api/tags";
import { listMembers } from "@/api/members";
import { PaginatedList, TagRecord, MemberRecord } from "@/api/types";
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
      type: Number
    }
  },
  emits: ["close"],
  setup: (props, context) => {
    const confirmModalClass = ref("");
    const shouldShowPencil = ref(true);
    const ticketStatus = ref("In Progress");
    const ticketUser = ref("Mason");
    const ticketTag = ref("Mechanical");
    const ticketTeam = ref("");
    const ticketTitle = ref("Title");
    const ticketDueDate = ref("2018-07-22");
    const statusColor = ref("#20A6EE");
    const statusDropdownClass = ref("");
    const tagsPage = ref(1);
    const membersPage = ref(1);
    const description = ref("");
    const tagsList = ref({} as PaginatedList<TagRecord>);
    const membersList = ref({} as PaginatedList<MemberRecord>);
    const teams = ref({} as ReadTeamRecord[]);
    const testStatuses = [
      { name: "To Do" },
      { name: "In Progress" },
      { name: "Done" }
    ];
    const getTeams = async () => {
      try {
        teams.value = await getUsersTeams();
      } catch (error) {
        alert(error);
      }
    };
    const getTags = async () => {
      try {
        tagsList.value = await listTags(teams.value[0].id, tagsPage.value);
      } catch (error) {
        alert(error);
      }
    };
    const getMembers = async () => {
      try {
        membersList.value = await listMembers(
          teams.value[0].id,
          membersPage.value
        );
      } catch (error) {
        alert(error);
      }
    };
    const setTicketData = async () => {
      if (props.ticketRecord) {
        const ticket = props.ticketRecord;
        ticketStatus.value = ticket.status?.title || "";
        ticketUser.value = ticket.assigned_user?.username || "";
      }
    };
    const statusSelected = (item: string) => {
      ticketStatus.value = item;
    };
    const userSelected = (item: string) => {
      ticketUser.value = item;
    };
    const teamSelected = async (item: string) => {
      ticketTeam.value = item;
      await getTags();
      await getMembers();
    };
    const tagSelected = (item: string) => {
      ticketTag.value = item;
    };
    const setTitle = (item: string) => {
      ticketTitle.value = item;
    };
    const closeModal = () => {
      description.value = "";
      context.emit("close");
    };
    const saveChanges = async () => {
      const ticket: WriteTicketRecord = {
        title: ticketTitle.value,
        description: description.value
      };
      try {
        await createTicket(ticket, 1);
      } catch (error) {
        alert(error);
      }
      description.value = "";
      context.emit("close");
    };
    onMounted(async () => {
      await getTeams();
      await getTags();
      await getMembers();
      setTicketData();
    });
    return {
      ticketStatus,
      ticketDueDate,
      statusColor,
      statusDropdownClass,
      shouldShowPencil,
      ticketUser,
      ticketTag,
      ticketTeam,
      testStatuses,
      membersList,
      description,
      confirmModalClass,
      teams,
      tagsList,
      setTitle,
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
