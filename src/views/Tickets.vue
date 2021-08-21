<template>
  <title>Sluggo/Tickets</title>
  <div id="vue-target">
    <section class="section">
      <div class="container">
        <div class="title">Tickets</div>
      </div>
    </section>

    <!-- TODO: Samuel Schmidt 5 / 21 / 2020 move this into a vue component -->
    <div class="section">
      <div class="modal" :class="modalClass">
        <div class="modal-background"></div>
        <div class="modal-content">
          <TicketModal @close="disableModal" />
        </div>
      </div>
    </div>
    <div class="container">
      <paginated-list-view
        :data="ticketList"
        :page="listPage"
        @next="changePage(1)"
        @prev="changePage(-1)"
      >
        <div class="table-container">
          <ticket-input
            v-bind:teamId="teamId"
            @create="getTeamTickets"
          ></ticket-input>
          <table class="table is-fullwidth is-striped">
            <tbody>
              <ticket-list-entry
                v-for="ticket in ticketList.results"
                :key="ticket.id"
                :data="ticket"
                @click="selectTicket(ticket)"
              ></ticket-list-entry>
            </tbody>
          </table>
        </div>
      </paginated-list-view>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import router from "@/router/index";
import { listTickets } from "@/api";
import { generateTicketPageLink } from "@/methods/teamPage";
import TicketModal from "@/components/TicketModal/TicketModal.vue";
import PaginatedListView from "@/components/PaginatedListView.vue";
import TicketListEntry from "@/components/TicketListEntry.vue";
import TicketInput from "@/components/TicketInput.vue";
import { PaginatedList, ReadTicketRecord } from "@/api/types";
import { wrapExceptions } from "@/methods";

export default defineComponent({
  name: "Tickets",
  props: {
    teamId: {
      type: String,
      required: true
    },
    selected: {
      type: String,
      required: false
    }
  },
  components: {
    TicketModal,
    TicketListEntry,
    TicketInput,
    PaginatedListView
  },
  setup(props) {
    // reactive data
    const ticketList = ref({} as PaginatedList<ReadTicketRecord>);
    const listPage = ref(1);
    const selectedTicket = ref({});
    const modalClass = ref("is-active");
    const teamId = parseInt(props.teamId);
    const disableModal = () => {
      modalClass.value = "";
    };
    const getTeamTickets = async () => {
      const [listTicketResponse, listTicketsError] = await wrapExceptions(
        listTickets,
        teamId,
        listPage.value
      );

      if (listTicketsError) {
        console.log(listTicketsError.message);
        return;
      }

      if (listTicketResponse) {
        ticketList.value = listTicketResponse.data;
      }
    };

    const selectTicket = async (ticket?: ReadTicketRecord) => {
      await router.replace(generateTicketPageLink(props.teamId, ticket?.id));
      await getTeamTickets();
    };

    const changePage = (increment: number) => {
      listPage.value += increment;
      getTeamTickets();
    };

    onMounted(async () => {
      await getTeamTickets();
    });

    return {
      ticketList,
      listPage,
      getTeamTickets,
      selectTicket,
      modalClass,
      disableModal,
      selectedTicket,
      changePage
    };
  }
});
</script>
