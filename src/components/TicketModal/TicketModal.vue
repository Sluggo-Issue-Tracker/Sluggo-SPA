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
          data-testid="ticket-title-text"
          :color="statusColor"
          :text="'Title'"
          @startedEditing="shouldShowPencil = false"
          @stoppedEditing="setTitle"
        />
      </div>
      <div class="editable-icon" v-if="shouldShowPencil">
        <i class="bx bx-pencil"></i>
      </div>
      <Dropdown
        data-testid="statuses-dropdown"
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
        data-testid="users-dropdown"
        :label="'Assigned to'"
        class="column"
        :items="members.results"
        :firstItem="ticketUser"
        @itemSelected="userSelected"
      />
      <Dropdown
        data-testid="teams-dropdown"
        :label="'Team'"
        class="column"
        :items="teamsArray"
        :firstItem="ticketTeam"
        @itemSelected="teamSelected"
      />
    </div>
    <div class="ticket-modal-second-row columns">
      <Dropdown
        data-testid="tags-dropdown"
        :label="'Tags'"
        class="column"
        :items="tags.results"
        :firstItem="ticketTag"
        @itemSelected="tagSelected"
      />
      <div class="ticket-due-date column">
        <label class="ticket-field-label">Due Date</label>
        <input
          data-testid="ticket-due-date"
          class="input is-fullwidth"
          type="date"
          v-model="ticketObj.due_date"
        />
      </div>
    </div>
    <div class="ticket-modal-third-row columns">
      <div class="ticket-description column">
        <label class="ticket-field-label">Description</label>
        <textarea
          data-testid="ticket-description"
          class="textarea has-fixed-size is-fullwidth"
          v-model="ticketObj.description"
        ></textarea>
      </div>
    </div>
    <Footer
      :shouldShowDelete="doesTicketExist"
      @saveChanges="saveChanges"
      @closeModal="closeModal"
    />
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
import Footer from "@/components/TicketModal/components/Footer/Footer.vue";
import IconSluggo from "@/assets/IconSluggo";
const ticketModalComponent = defineComponent({
  name: "TicketModal",
  components: {
    IconSluggo,
    Dropdown,
    EditableText,
    Footer
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
    const ticketObj = ref({} as WriteTicketRecord);
    const doesTicketExist = ref(false);
    const shouldShowPencil = ref(true);
    const ticketStatus = ref("In Progress");
    const ticketUser = ref("None");
    const ticketTag = ref("None");
    const ticketTagId = ref([-1]);
    const ticketTeam = ref("");
    const ticketTeamId = ref(-1);
    const statusColor = ref("");
    const statusDropdownClass = ref("");
    const tagsPage = ref(1);
    const membersPage = ref(1);
    const statusesPage = ref(1);
    const tags = ref({} as PaginatedList<TagRecord>);
    const members = ref({} as PaginatedList<MemberRecord>);
    const statuses = ref({} as PaginatedList<StatusRecordOutput>);
    const teams = ref({} as ReadTeamRecord[]);
    const teamsArray = ref(Array<ReadTeamRecord>());
    const initializeData = () => {
      ticketObj.value.description = "";
      ticketObj.value.title = "Title";
      // eslint-disable-next-line @typescript-eslint/camelcase
      ticketObj.value.assigned_user = -1;
      ticketObj.value.status = 1;
      // eslint-disable-next-line @typescript-eslint/camelcase
      ticketObj.value.due_date = "";
    };
    const getTeams = async () => {
      try {
        teams.value = await getUsersTeams();
        teamsArray.value = Object.values(teams.value);
        ticketTeam.value = teams.value[0].name;
        ticketTeamId.value = teams.value[0].id;
      } catch (error) {
        alert(error);
      }
    };
    const getTags = async () => {
      try {
        tags.value = await listTags(ticketTeamId.value, tagsPage.value);
        ticketTag.value = "None";
        ticketTagId.value = [-1];
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
        ticketUser.value = "None";
        // eslint-disable-next-line @typescript-eslint/camelcase
        ticketObj.value.assigned_user = -1;
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
        ticketObj.value.status = statuses.value.results[0].id;
      } catch (error) {
        alert(error);
      }
    };
    const statusSelected = (display: string, item: StatusRecordOutput) => {
      ticketStatus.value = display;
      statusColor.value = item.color;
      ticketObj.value.status = item.id;
    };
    const userSelected = (display: string, item: MemberRecord) => {
      ticketUser.value = display;
      // eslint-disable-next-line @typescript-eslint/camelcase
      ticketObj.value.assigned_user = item.id;
    };
    const teamSelected = async (display: string, item: ReadTeamRecord) => {
      if (ticketTeamId.value !== item.id) {
        ticketTeam.value = display;
        ticketTeamId.value = item.id;
        await getTags();
        await getMembers();
        await getStatuses();
      }
    };
    const tagSelected = (display: string, item: TagRecord) => {
      ticketTag.value = display;
      ticketTagId.value[0] = item.id;
      console.log(ticketTagId.value[0]);
    };
    const setTitle = (item: string) => {
      ticketObj.value.title = item;
      shouldShowPencil.value = true;
    };
    const closeModal = () => {
      context.emit("close");
    };
    const saveChanges = async () => {
      const ticket: WriteTicketRecord = {
        title: ticketObj.value.title,
        status: ticketObj.value.status
      };
      // eslint-disable-next-line @typescript-eslint/camelcase
      if (ticketObj.value.due_date) {
        // eslint-disable-next-line @typescript-eslint/camelcase
        ticket.due_date = ticketObj.value.due_date;
      }
      // eslint-disable-next-line @typescript-eslint/camelcase
      if (ticketObj.value.assigned_user !== -1) {
        // eslint-disable-next-line @typescript-eslint/camelcase
        ticket.assigned_user = ticketObj.value.assigned_user;
      }
      if (ticketObj.value.description !== "") {
        ticket.description = ticketObj.value.description;
      }
      if (ticketTagId.value[0] !== -1) {
        // eslint-disable-next-line @typescript-eslint/camelcase
        ticket.tag_list = ticketTagId.value;
      }
      try {
        await createTicket(ticket, ticketTeamId.value);
      } catch (error) {
        alert(error);
      }
      closeModal();
    };
    onMounted(async () => {
      initializeData();
      await getTeams();
      await getTags();
      await getMembers();
      await getStatuses();
    });
    return {
      ticketObj,
      ticketStatus,
      statusColor,
      statusDropdownClass,
      shouldShowPencil,
      ticketUser,
      ticketTag,
      ticketTeam,
      members,
      teams,
      teamsArray,
      tags,
      statuses,
      doesTicketExist,
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
