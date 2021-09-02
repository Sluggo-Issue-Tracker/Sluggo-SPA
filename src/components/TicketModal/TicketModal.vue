<template>
  <div class="ticket-modal">
    <div
      class="ticket-modal-header"
      :style="{ 'background-color': selectedStatus.color }"
    >
      <div class="logo">
        <IconSluggo :height="50" :width="50" />
      </div>
      <div
        class="ticket-name"
        :style="{ 'background-color': selectedStatus.color }"
      >
        <EditableText
          data-testid="ticket-title-text"
          :color="selectedStatus.color"
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
        :items="statuses"
        :firstItem="selectedStatus.title"
        @itemSelected="statusSelected"
        :style="{ 'margin-left': 'auto' }"
        :class="'is-right'"
        :backgroundColor="selectedStatus.color"
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
        :firstItem="selectedUser"
        @itemSelected="userSelected"
      />
      <Dropdown
        data-testid="teams-dropdown"
        :label="'Team'"
        class="column"
        :items="teams"
        :firstItem="selectedTeam.name"
        @itemSelected="teamSelected"
      />
    </div>
    <div class="ticket-modal-second-row columns">
      <Dropdown
        data-testid="tags-dropdown"
        :label="'Tags'"
        class="column"
        :items="tags"
        :firstItem="selectedTag.title"
        @itemSelected="tagSelected"
      />
      <div class="ticket-due-date column">
        <label class="ticket-field-label">Due Date</label>
        <input
          data-testid="ticket-due-date"
          class="input is-fullwidth"
          type="datetime-local"
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
    const teams = ref(Array<ReadTeamRecord>());
    const selectedTeam = ref({} as ReadTeamRecord);
    const tags = ref(Array<TagRecord>());
    const selectedTag = ref({} as TagRecord);
    const selectedTagId = ref([-1]);
    const members = ref({} as PaginatedList<MemberRecord>);
    const selectedUser = ref("None");
    const membersPage = ref(1);
    const statuses = ref(Array<StatusRecordOutput>());
    const selectedStatus = ref({} as StatusRecordOutput);
    const ticketObj = ref({} as WriteTicketRecord);
    const doesTicketExist = ref(false);
    const shouldShowPencil = ref(true);

    const initializeData = () => {
      if (props.ticketRecord) {
        doesTicketExist.value = true;
      }
      selectedStatus.value.id = -1;
      ticketObj.value.description = "";
      ticketObj.value.title = "Title";
      ticketObj.value.assigned_user = "-1";
      ticketObj.value.due_date = "";
    };
    const getTeams = async () => {
      try {
        teams.value = Object.values(await getUsersTeams());
        selectedTeam.value.name = teams.value[0].name;
        selectedTeam.value.id = teams.value[0].id;
      } catch (error) {
        alert(error);
      }
    };
    const getTags = async () => {
      try {
        tags.value = Object.values(await listTags(selectedTeam.value.id));
        selectedTag.value.title = "None";
        selectedTagId.value = [-1];
      } catch (error) {
        alert(error);
      }
    };
    const getMembers = async () => {
      try {
        members.value = await listMembers(
          selectedTeam.value.id,
          membersPage.value
        );
        selectedUser.value = "None";
        ticketObj.value.assigned_user = "-1";
      } catch (error) {
        alert(error);
      }
    };
    const getStatuses = async () => {
      try {
        statuses.value = Object.values(
          await listStatuses(selectedTeam.value.id)
        );
        selectedStatus.value.title = statuses.value[0].title;
        selectedStatus.value.color = statuses.value[0].color;
        selectedStatus.value.id = statuses.value[0].id;
      } catch (error) {
        alert(error);
      }
    };
    const statusSelected = (display: string, item: StatusRecordOutput) => {
      selectedStatus.value.title = display;
      selectedStatus.value.color = item.color;
      selectedStatus.value.id = item.id;
    };
    const userSelected = (display: string, item: MemberRecord) => {
      selectedUser.value = display;
      ticketObj.value.assigned_user = item.id;
    };
    const teamSelected = async (display: string, item: ReadTeamRecord) => {
      if (selectedTeam.value.id !== item.id) {
        selectedTeam.value.name = display;
        selectedTeam.value.id = item.id;
        await getTags();
        await getMembers();
        await getStatuses();
      }
    };
    const tagSelected = (display: string, item: TagRecord) => {
      selectedTag.value.title = display;
      selectedTagId.value[0] = item.id;
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
        status: selectedStatus.value.id
      };
      if (ticketObj.value.due_date) {
        ticket.due_date = ticketObj.value.due_date.replace(/T/, " ");
      }
      if (ticketObj.value.assigned_user !== "-1") {
        ticket.assigned_user = ticketObj.value.assigned_user;
      }
      if (ticketObj.value.description !== "") {
        ticket.description = ticketObj.value.description;
      }
      if (selectedTagId.value[0] !== -1) {
        ticket.tag_list = selectedTagId.value;
      }
      try {
        await createTicket(ticket, selectedTeam.value.id);
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
      selectedStatus,
      shouldShowPencil,
      selectedUser,
      selectedTag,
      selectedTeam,
      members,
      teams,
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
