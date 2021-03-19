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
      <ticket-modal
        v-if="selected"
        v-bind:ticketId="selected"
        v-bind:teamId="teamId"
        v-on:close="selectTicket()"
      ></ticket-modal>
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
                :initialPinRecord="pinRecordForTicket(ticket)"
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
import { defineComponent, ref, computed, onMounted } from "vue";
import router from "@/router/index";
import { listTickets, TicketRecord } from "@/api/tickets";
import { MemberRecord } from "@/api/users";
import { getPinnedTicketsForMember, PinnedTicketRecord } from "@/api/pinned";
import { PaginatedList } from "@/api/base";
import { generateTicketPageLink } from "@/methods/teamPage";
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
    const ticketList = ref({} as PaginatedList<TicketRecord>);
    const listPage = ref(1);
    const selectedTicket = ref({});
    const showModal = ref(false);
    const teamId = parseInt(props.teamId);
    const pinnedTickets = ref<PinnedTicketRecord[]>([]);

    const getTeamTickets = async () => {
      const axiosInstance = store.getters.generateAxiosInstance;

      // Update pinned tickets
      // This needs to happen before the normal tickets are fetched,
      // otherwise it might try to pull a pin record before fetching the pin
      // records.

      const member = store.state.member;
      if (typeof member === "undefined") {
        throw Error("Member was undefined unexpectedly on Tickets page.");
      }

      pinnedTickets.value = await getPinnedTicketsForMember(
        axiosInstance,
        teamId,
        member.id
      );

      // hack. v-for does not detect change on results unless this is reset
      // manually
      ticketList.value.results = [];
      ticketList.value = await listTickets(
        teamId,
        listPage.value,
        axiosInstance
      );
    };

    const pinRecordForTicket = (
      ticket: TicketRecord
    ): PinnedTicketRecord | undefined => {
      const filteredPins = pinnedTickets.value.filter(
        pinRecord => pinRecord.ticket.id === ticket.id
      );

      if (filteredPins.length > 0) {
        return filteredPins[0];
      } else {
        return undefined;
      }
    };

    const selectTicket = async (ticket?: TicketRecord) => {
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
      showModal,
      selectedTicket,
      changePage,
      pinRecordForTicket: pinRecordForTicket
    };
  }
});
</script>
