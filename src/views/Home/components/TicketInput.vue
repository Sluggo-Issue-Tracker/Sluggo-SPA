<template>
  <Card>
    <h3>Quick Add</h3>
    <div class="loadingContainer" v-if="teamsLoading">
      <Loader :width="50" :height="50" />
    </div>
    <div v-else-if="!teamsLoading && teamsData && teamsData.length !== 0">
      <o-field label="Team">
        <o-select
          placeholder="Select a team"
          class="select"
          :expanded="true"
          v-model="selectedTeam"
        >
          <option v-for="team in teamsData" :key="team.id" :value="team">{{
            team.name
          }}</option>
        </o-select>
      </o-field>
      <o-field label="Title">
        <o-input :v-model="ticketTitle" placeholder="Enter a title"></o-input>
      </o-field>
      <o-button variant="success">
        <div @click="onCreate()">
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
import { computed, defineComponent, onMounted, ref } from "vue";
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

    const [
      teamsQuery,
      { loading: teamsLoading, data: teamsData, error: teamsError }
    ] = apiExecutor(getUsersTeams);

    const ticketErrorMessage = computed<string>(() => {
      return "";
    });

    const onCreate = async () => {
      console.log(selectedTeam.value);
      if (!selectedTeam.value) {
        teamErrorMessage.value = "You must select a team.";
        console.log("must select a team");
        return;
      }

      if (!teamsData.value) {
        console.log("must specify a value");
        return;
      }
      const selectedTeamObj = selectedTeam.value;

      const [data, error] = await wrapExceptions(
        createTicket,
        { title: ticketTitle },
        selectedTeamObj?.id
      );

      if (!data || error) {
        console.log("failed to create ticket!");
      }

      console.log("created!");
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
      onCreate
    };
  }
});
</script>
<style scoped lang="scss" src="../styles.module.scss">
.select {
  width: 100%;
}
</style>
