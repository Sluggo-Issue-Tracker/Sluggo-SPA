<template>
  <Card>
    <h3>Quick Add</h3>
    <div class="loadingContainer" v-if="teamsLoading">
      <Loader :width="50" :height="50" />
    </div>
    <div v-else-if="!teamsLoading && teamsData && teamsData.length !== 0">
      <o-field
        label="Team"
        :variant="{ danger: Boolean(teamErrorMessage) }"
        :message="teamErrorMessage"
      >
        <o-select
          placeholder="Select a team"
          class="select"
          :expanded="true"
          v-model="selectedTeam"
        >
          <option v-for="team in teamsData" :key="team.id" :value="team">
            {{ team.name }}
          </option>
        </o-select>
      </o-field>
      <o-field
        label="Title"
        :variant="{ danger: Boolean(ticketErrorMessage) }"
        :message="ticketErrorMessage"
      >
        <o-input v-model="ticketTitle" placeholder="Enter a title"></o-input>
      </o-field>
      <o-button variant="success">
        <div v-if="createTicketLoading">
          <Loader :width="20" :height="20" />
        </div>
        <div v-else-if="createTicketSuccess">
          <i class="bx bx-check" />
        </div>
        <div v-else @click="onCreate()">
          Create
        </div>
      </o-button>
    </div>
    <div v-else-if="teamsError">
      Error loading teams!
    </div>
  </Card>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import Card from "@/components/Card";
import { apiExecutor, wrapExceptions } from "@/methods";
import { createTicket, getUsersTeams } from "@/api";
import Loader from "@/components/Loader.vue";
import { ReadTeamRecord } from "@/api/types";

export default defineComponent({
  name: "TicketInput",
  components: {
    Card,
    Loader
  },
  setup: () => {
    const ticketTitle = ref("");
    const selectedTeam = ref<ReadTeamRecord | null>(null);
    const teamErrorMessage = ref<string>("");
    const createTicketSuccess = ref<boolean>(false);
    const createTicketLoading = ref<boolean>(false);
    const ticketErrorMessage = ref<string>("");

    const [
      teamsQuery,
      { loading: teamsLoading, data: teamsData, error: teamsError }
    ] = apiExecutor(getUsersTeams);

    const clearFields = () => {
      ticketTitle.value = "";
      selectedTeam.value = null;
    };

    const clearErrorMessages = () => {
      teamErrorMessage.value = "";
      ticketErrorMessage.value = "";
    };

    const assertInputIsValid = (): boolean => {
      let isValid = true;
      if (!selectedTeam.value) {
        teamErrorMessage.value = "You must select a team.";
        isValid = false;
      }

      if (!ticketTitle.value) {
        ticketErrorMessage.value = "You must specify a title.";
        isValid = false;
      }
      return isValid;
    };

    const onCreate = async () => {
      clearErrorMessages();
      if (!assertInputIsValid()) {
        return;
      }

      createTicketLoading.value = true;
      const [data, error] = await wrapExceptions(
        createTicket,
        { title: ticketTitle.value },
        selectedTeam.value?.id
      );
      createTicketLoading.value = false;

      if (!data || error) {
        return;
      }
      createTicketSuccess.value = true;

      // delay 1 second before resetting the fields and
      // returning to starting state.
      setTimeout(() => {
        createTicketSuccess.value = false;
        clearFields();
        clearErrorMessages();
      }, 1000);
    };

    onMounted(() => {
      teamsQuery();
    });

    return {
      teamsLoading,
      teamsData,
      teamsError,
      selectedTeam,
      ticketTitle,
      createTicketSuccess,
      createTicketLoading,
      teamErrorMessage,
      ticketErrorMessage,
      onCreate
    };
  }
});
</script>
<style scoped lang="scss" src="../styles.module.scss"></style>
