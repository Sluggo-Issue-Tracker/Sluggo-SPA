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
          @stoppedEditing="setTitle"
        />
      </div>
      <div class="editable-icon" v-if="shouldShowPencil">
        <i class="bx bx-pencil"></i>
      </div>
      <Dropdown
        :items="statuses.results"
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
        :items="members.results"
        :firstItem="ticketUser"
        @itemSelected="userSelected"
      />
      <Dropdown
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
        :items="tags.results"
        :firstItem="ticketTag"
        @itemSelected="tagSelected"
      />
      <div class="ticket-due-date column">
        <label class="ticket-field-label">Due Date</label>
        <input class="input is-fullwidth" type="date" v-model="ticketDueDate" />
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
  ReadTeamRecord,
  StatusRecordOutput
} from "@/api/types";
import { createTicket } from "@/api/tickets";
import { getUsersTeams } from "@/api/teams";
import { listTags } from "@/api/tags";
import { listMembers } from "@/api/members";
import { listStatuses } from "@/api/statuses";
import { PaginatedList, TagRecord, MemberRecord } from "@/api/types";
import Dropdown from "@/components/TicketModal/components/Dropdown/Dropdown.vue";
import EditableText from "@/components/TicketModal/components/EditableText/EditableText.vue";
import ConfirmDialog from "@/components/TicketModal/components/ConfirmDialog/ConfirmDialog.vue";
import IconSluggo from "@/assets/IconSluggo";
import { DateTime } from "luxon";
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
    const ticketStatusId = ref(1);
    const ticketUser = ref("");
    const ticketUserId = ref(1);
    const ticketTag = ref("");
    const ticketTeam = ref("");
    const ticketTeamId = ref(1);
    const ticketTitle = ref("Title");
    const ticketDueDate = ref("");
    const statusColor = ref("");
    const statusDropdownClass = ref("");
    const tagsPage = ref(1);
    const membersPage = ref(1);
    const statusesPage = ref(1);
    const description = ref("");
    const tags = ref({} as PaginatedList<TagRecord>);
    const members = ref({} as PaginatedList<MemberRecord>);
    const statuses = ref({} as PaginatedList<StatusRecordOutput>);
    const teams = ref({} as ReadTeamRecord[]);
    const getTeams = async () => {
      try {
        teams.value = await getUsersTeams();
        ticketTeam.value = teams.value[0].name;
        ticketTeamId.value = teams.value[0].id;
      } catch (error) {
        alert(error);
      }
    };
    const getTags = async () => {
      try {
        tags.value = await listTags(ticketTeamId.value, tagsPage.value);
        ticketTag.value = tags.value.results[0].title;
      } catch (error) {
        alert(error);
      }
    };
    const getMembers = async () => {
      try {
        members.value = await listMembers(
          ticketTeamId.value,
          membersPage.value
        );
        ticketUser.value = members.value.results[0].owner.username;
        ticketUserId.value = members.value.results[0].id;
      } catch (error) {
        alert(error);
      }
    };
    const getStatuses = async () => {
      try {
        statuses.value = await listStatuses(
          ticketTeamId.value,
          statusesPage.value
        );
        ticketStatus.value = statuses.value.results[0].title;
        statusColor.value = statuses.value.results[0].color;
        ticketStatusId.value = statuses.value.results[0].id;
      } catch (error) {
        alert(error);
      }
    };
    const statusSelected = (display: string, item: StatusRecordOutput) => {
      ticketStatus.value = display;
      statusColor.value = item.color;
      ticketStatusId.value = item.id;
    };
    const userSelected = (display: string, item: MemberRecord) => {
      ticketUser.value = display;
      ticketUserId.value = item.id;
    };
    const teamSelected = async (display: string, item: ReadTeamRecord) => {
      ticketTeam.value = display;
      ticketTeamId.value = item.id;
      ticketDueDate.value = "";
      await getTags();
      await getMembers();
      await getStatuses();
    };
    const tagSelected = (item: string) => {
      ticketTag.value = item;
    };
    const setTitle = (item: string) => {
      ticketTitle.value = item;
      shouldShowPencil.value = true;
    };
    const closeModal = () => {
      context.emit("close");
    };
    const saveChanges = async () => {
      const ticket: WriteTicketRecord = {
        title: ticketTitle.value,
        description: description.value,
        // eslint-disable-next-line @typescript-eslint/camelcase
        assigned_user: ticketUserId.value,
        status: ticketStatusId.value,
        // eslint-disable-next-line @typescript-eslint/camelcase
        due_date: DateTime.fromFormat(ticketDueDate.value, "yyyy-MM-dd")
      };
      try {
        await createTicket(ticket, ticketTeamId.value);
      } catch (error) {
        alert(error);
      }
      context.emit("close");
    };
    onMounted(async () => {
      await getTeams();
      await getTags();
      await getMembers();
      await getStatuses();
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
      members,
      description,
      confirmModalClass,
      teams,
      tags,
      statuses,
      setTitle,
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
