<template>
  <title>Sluggo/Tickets</title>
  <div id="vue-target">
    <section class="section">
      <div class="container">
        <div class="title">Tickets</div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column">
            <div class="field is-pulled-right">
              <div class="control has-icons-left">
                <span class="icon is-medium">
                  <i class="fa fa-search"></i>
                </span>
                <input class="input" type="text" placeholder="Search" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- TODO: Samuel Schmidt 5 / 21 / 2020 move this into a vue component -->
    <section class="section">
      <div class="container has-background-light">
        <div class="section">
          <ticket-input
            v-bind:team="teamRecord"
            @create="getTeamTickets"
          ></ticket-input>
        </div>
        <div class="section">
          <ticket-modal
            v-if="showModal"
            v-bind:ticket="selectedTicket"
            v-bind:team="teamRecord"
            v-on:close="getTeamTickets"
          ></ticket-modal>
        </div>
        <div class="section">
          <paginated-list-view
            :data="ticketList"
            @next="changePage(1)"
            @prev="changePage(-1)"
          >
            <ticket-list-entry
              v-for="ticket in ticketList.results"
              :key="ticket.id"
              :data="ticket"
              @click="selectTicket(ticket)"
            ></ticket-list-entry>
          </paginated-list-view>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { listTickets, TicketRecord } from "@/api/tickets";
import { PaginatedList } from "@/api/base";
import { TeamRecord, getTeam } from "@/api/teams";
import store from "@/store";
import TicketModal from "@/components/TicketModal.vue";
import PaginatedListView from "@/components/PaginatedListView.vue";
import TicketListEntry from "@/components/TicketListEntry.vue";
import TicketInput from "@/components/TicketInput.vue";

export default defineComponent({
  name: "Tickets",
  props: {
    teamId: {
      type: String,
      required: true
    }
  },
  components: {
    TicketModal,
    TicketListEntry,
    TicketInput,
    PaginatedListView
  },
  setup(props) {
    const teamRecord = ref({} as TeamRecord);
    const ticketList = ref({} as PaginatedList<TicketRecord>);
    const listPage = ref(1);
    const selectedTicket = ref({});
    const showModal = ref(false);

    const getTeamTickets = async () => {
      showModal.value = false;
      const axiosInstance = store.getters.generateAxiosInstance;
      const team = teamRecord.value;

      // hack. v-for does not detect change on results unless this is reset
      // manually
      ticketList.value.results = [];
      ticketList.value = await listTickets(team, listPage.value, axiosInstance);
    };

    const getTeamRecord = async () => {
      const axiosInstance = store.getters.generateAxiosInstance;
      const teamId = parseInt(props.teamId);
      const team = await getTeam(axiosInstance, teamId);
      teamRecord.value = team;
    };

    const changePage = (increment: number) => {
      listPage.value += increment;
      getTeamTickets();
    };

    const selectTicket = (ticket: TicketRecord) => {
      selectedTicket.value = ticket;
      showModal.value = true;
    };

    onMounted(async () => {
      await getTeamRecord();
      await getTeamTickets();
    });

    return {
      teamRecord,
      ticketList,
      listPage,
      getTeamTickets,
      getTeamRecord,
      selectTicket,
      showModal,
      selectedTicket,
      changePage
    };
  }
});
</script>
