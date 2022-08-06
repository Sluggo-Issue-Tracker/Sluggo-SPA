<template>
  <div data-testid="ticket-modal" class="ticket-modal" v-if="dataFetched">
    <div
      class="ticket-modal-header"
      :style="{ 'background-color': ticket.status.color }"
    >
      <div class="logo">
        <IconSluggo :height="50" :width="50" />
      </div>
      <div
        class="ticket-name"
        :style="{ 'background-color': ticket.status.color }"
      >
        <EditableText
          data-testid="ticket-title-text"
          :color="ticket.status.color"
          :text="ticket.title"
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
        :firstItem="ticket.status.title"
        :stringPropSpecifier="'title'"
        @itemSelected="statusSelected"
        :style="{ 'margin-left': 'auto' }"
        :class="'is-right'"
        :backgroundColor="ticket.status.color"
        :textColor="'white'"
        :borderStyle="'none'"
      />
    </div>
    <div class="ticket-modal-first-row columns">
      <Dropdown
        data-testid="users-dropdown"
        :label="'Assigned to'"
        class="column"
        :items="members"
        :firstItem="selectedUser.username"
        @itemSelected="userSelected"
      />
      <Dropdown
        data-testid="teams-dropdown"
        :label="'Team'"
        class="column"
        :items="teams"
        :firstItem="selectedTeam.name"
        :stringPropSpecifier="'name'"
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
        :stringPropSpecifier="'title'"
        @itemSelected="tagSelected"
      />
      <div class="ticket-due-date column">
        <label class="ticket-field-label">Due Date</label>
        <input
          data-testid="ticket-due-date"
          class="input is-fullwidth"
          type="date"
          v-model="selectedDueDate"
        />
      </div>
    </div>
    <div class="ticket-modal-third-row columns">
      <div class="ticket-description column">
        <label class="ticket-field-label">Description</label>
        <textarea
          data-testid="ticket-description"
          class="textarea has-fixed-size is-fullwidth"
          v-model="ticket.description"
        ></textarea>
      </div>
    </div>
    <Footer
      :shouldShowDelete="shouldShowDelete"
      @saveChanges="saveChanges"
      @closeModal="closeModal"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import {
  WriteTicketRecord,
  ReadTicketRecord,
  ReadTeamRecord,
  StatusRecordOutput
} from "@/api/types";
import { getTicket, updateTicket, createTicket } from "@/api/tickets";
import { getTeam, getUsersTeams } from "@/api/teams";
import { listTags } from "@/api/tags";
import { listMembersDepaginated } from "@/api/members";
import { listStatuses } from "@/api/statuses";
import { TagRecord, MemberRecord, UserRecord } from "@/api/types";
import { DateTime } from "luxon";
import Dropdown from "@/components/Dropdown/Dropdown.vue";
import EditableText from "@/components/EditableText/EditableText.vue";
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
    ticketId: {
      type: Number
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
    const members = ref(Array<MemberRecord>());
    const selectedUser = ref({} as UserRecord);
    const statuses = ref(Array<StatusRecordOutput>());
    const selectedStatus = ref({} as StatusRecordOutput);
    const selectedDueDate = ref("");
    const ticket = ref({} as ReadTicketRecord);
    const shouldShowPencil = ref(true);
    const dataFetched = ref(false);
    const shouldShowDelete = ref(false);

    const getTeams = async () => {
      try {
        teams.value = Object.values(await getUsersTeams());
        selectedTeam.value.name = teams.value[0].name;
        selectedTeam.value.id = teams.value[0].id;
      } catch (error) {
        alert(error);
      }
    };
    const setTags = (tagResults: TagRecord[]) => {
      tags.value = tagResults;
      selectedTag.value.title = "None";
      selectedTagId.value = [-1];
    };
    const setMembers = (memberResults: MemberRecord[]) => {
      members.value = memberResults;
      selectedUser.value.username = ticket.value.assigned_user?.owner.username
        ? ticket.value.assigned_user.owner.username
        : "None";
    };
    const setStatuses = (statusResults: StatusRecordOutput[]) => {
      statuses.value = statusResults;
      ticket.value.status = ticket.value.status
        ? ticket.value.status
        : statusResults[0];
    };
    const setDueDate = () => {
      if (ticket.value.due_date) {
        selectedDueDate.value = ticket.value.due_date.slice(0, 10);
      }
    };
    const getTicketData = async () => {
      try {
        if (props.ticketId && props.teamId) {
          ticket.value = await getTicket(props.ticketId, props.teamId);
        }
      } catch (error) {
        alert(error);
      }
    };
    const getTeamData = async () => {
      try {
        const results = await Promise.all([
          listTags(props.teamId || selectedTeam.value.id),
          listMembersDepaginated(props.teamId || selectedTeam.value.id),
          listStatuses(props.teamId || selectedTeam.value.id),
          getTeam(props.teamId || selectedTeam.value.id)
        ]);
        setTags(Object.values(results[0]));
        setMembers(results[1]);
        setStatuses(Object.values(results[2]));
        selectedTeam.value = results[3];
      } catch (error) {
        alert(error);
      }
    };
    const statusSelected = (item: StatusRecordOutput) => {
      ticket.value.status = item;
    };
    const userSelected = (item: MemberRecord) => {
      ticket.value.assigned_user = item;
      selectedUser.value = item.owner;
    };
    const teamSelected = async (item: ReadTeamRecord) => {
      if (selectedTeam.value.id !== item.id) {
        selectedTeam.value = item;
        await getTeamData();
      }
    };
    const tagSelected = (item: TagRecord) => {
      selectedTag.value = item;
      selectedTagId.value[0] = item.id;
    };
    const setTitle = (item: string) => {
      ticket.value.title = item;
      shouldShowPencil.value = true;
    };
    const closeModal = () => {
      context.emit("close");
    };
    const saveChanges = async () => {
      if (selectedDueDate.value) {
        ticket.value.due_date = DateTime.fromFormat(
          selectedDueDate.value,
          "yyyy-MM-dd"
        )
          .toUTC(0)
          .toISO();
      }
      try {
        if (props.ticketId && props.teamId) {
          await updateTicket(ticket.value, props.teamId);
        } else {
          const newTicket: WriteTicketRecord = {
            title: ticket.value.title,
            status: ticket.value.status?.id,
            due_date: ticket.value.due_date,
            description: ticket.value.description,
            assigned_user: ticket.value.assigned_user?.id
          };
          await createTicket(newTicket, selectedTeam.value.id);
        }
      } catch (error) {
        alert(error);
      }
      closeModal();
    };
    onMounted(async () => {
      if (props.teamId && props.ticketId) {
        shouldShowDelete.value = true;
        await getTicketData();
        setDueDate();
      } else {
        await getTeams();
        setTitle("Title");
      }
      await getTeamData();
      dataFetched.value = true;
    });
    return {
      ticket,
      selectedStatus,
      shouldShowPencil,
      shouldShowDelete,
      selectedUser,
      selectedTag,
      selectedTeam,
      selectedDueDate,
      members,
      tags,
      teams,
      statuses,
      dataFetched,
      setTitle,
      closeModal,
      saveChanges,
      statusSelected,
      userSelected,
      tagSelected,
      teamSelected
    };
  }
});
export default ticketModalComponent;
</script>

<style scoped src="./ticket-modal-styles.module.scss" lang="scss"></style>
