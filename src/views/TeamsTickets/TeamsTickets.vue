<template>
  <div>Hello world!</div>
  <div class="section">
    <div class="modal" :class="modalClass">
      <div class="modal-background"></div>
      <div class="modal-content">
        <EditTicketModal
          @close="modalClass = ''"
          v-if="modalClass == 'is-active'"
          :ticketRecord="selectedTicket"
          :teamId="ticketTeamId"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ReadTicketRecord, PaginatedList, ReadTeamRecord } from "@/api/types";
import { getUsersTeams } from "@/api/teams";
import { listTickets } from "@/api/tickets";
import { ref, onMounted } from "vue";
import EditTicketModal from "@/components/TicketModal/EditTicketModal.vue";
export default {
  name: "TeamsTickets",
  components: {
    EditTicketModal
  },
  setup: () => {
    const modalClass = ref("is-active");
    const teams = ref(Array<ReadTeamRecord>());
    const tickets = ref({} as PaginatedList<ReadTicketRecord>);
    const selectedTicket = ref({} as ReadTicketRecord);
    const ticketTeamId = ref(1);
    const getTeams = async () => {
      try {
        teams.value = Object.values(await getUsersTeams());
        console.log(teams.value[0].name);
      } catch (error) {
        alert(error);
      }
    };
    const getTeamTickets = async () => {
      try {
        tickets.value = await listTickets(teams.value[0].id, 1);
        selectedTicket.value = tickets.value.results[0];
        console.log(selectedTicket.value.title);
        //ticketTeamId.value = tickets.value.results[0].id;
      } catch (error) {
        alert(error);
      }
    };
    onMounted(async () => {
      await getTeams();
      await getTeamTickets();
    });
    return {
      modalClass,
      tickets,
      selectedTicket,
      ticketTeamId
    };
  }
};
</script>

<style scoped></style>
