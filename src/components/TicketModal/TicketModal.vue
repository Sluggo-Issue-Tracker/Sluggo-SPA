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
        :stringPropSpecifier="'title'"
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
    ticketRecord: {
      type: Object as () => ReadTicketRecord
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
    const selectedMember = ref({} as MemberRecord);
    const statuses = ref(Array<StatusRecordOutput>());
    const selectedStatus = ref({} as StatusRecordOutput);
    const ticketObj = ref({} as WriteTicketRecord);
    const doesTicketExist = ref(false);
    const shouldShowPencil = ref(true);

    const initializeData = () => {
      if (props.ticketRecord) {
        doesTicketExist.value = true;
      }
      ticketObj.value.description = "";
      ticketObj.value.title = "Title";
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
    const setTags = (tagResults: TagRecord[]) => {
      tags.value = tagResults;
      selectedTag.value.title = "None";
      selectedTagId.value = [-1];
    };
    const setMembers = (memberResults: MemberRecord[]) => {
      members.value = memberResults;
      selectedUser.value.username = "None";
      selectedMember.value.id = "-1";
    };
    const setStatuses = (statusResults: StatusRecordOutput[]) => {
      statuses.value = statusResults;
      selectedStatus.value = statusResults[0];
    };
    const getTeamData = async () => {
      try {
        const results = await Promise.all([
          listTags(selectedTeam.value.id),
          listMembersDepaginated(selectedTeam.value.id),
          listStatuses(selectedTeam.value.id)
        ]);
        setTags(Object.values(results[0]));
        setMembers(results[1]);
        setStatuses(Object.values(results[2]));
      } catch (error) {
        alert(error);
      }
    };
    const statusSelected = (item: StatusRecordOutput) => {
      selectedStatus.value = item;
    };
    const userSelected = (item: MemberRecord) => {
      selectedUser.value = item.owner;
      selectedMember.value = item;
      console.log(selectedMember.value);
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
        ticket.due_date = DateTime.fromFormat(
          ticketObj.value.due_date,
          "yyyy-mm-dd"
        )
          .toUTC(0)
          .toISO();
      }
      if (selectedMember.value.id !== "-1") {
        ticket.assigned_user = selectedMember.value.id;
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
      await getTeamData();
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
