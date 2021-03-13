<template>
  <title>Sluggo/Tickets</title>
  <div id="vue-target">
    <section class="section">
      <div class="container">
        <div class="title">Tickets</div>
      </div>
    </section>

<<<<<<< HEAD
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
                @click="selectTicket(ticket)"
              ></ticket-list-entry>
            </tbody>
          </table>
        </div>
      </paginated-list-view>
    </div>
=======
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
          <ticket-modal v-bind:team="teamRecord" v-on:create="getTeamTickets"></ticket-modal>
        </div>
        <div class="section">
          <div v-for="ticket in ticketList.results" v-bind:key="ticket.id" class="box">
            <div class="level">
              <div class="level-left">
                <div
                  class="level-item"
                  style="max-width: 500px; word-wrap: break-word"
                >
                  <a class="title">
                    <span>{{ ticket.ticket_number }} | {{ ticket.title }} | {{ ticket.created.toLocaleString() }} </span>
                  </a>
                </div>
                <div class="level-item">
                  <span v-if="ticket.status" class="tag is-link">
                    {{ ticket.status.title }}
                  </span>
                </div>
                <div
                  v-for="tag in ticket.tag_list"
                  v-bind:key="tag.id"
                  class="level-item"
                  style="max-width: 100px; word-wrap:break-word;"
                >
                  <span class="tag has-background-grey-lighter">
                    {{ tag.title }}
                  </span>
                </div>
              </div>
              <div class="level-right">
                <div class="level-item">
                  <span>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star-o"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
>>>>>>> develop
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import router from "@/router/index";
import { listTickets, TicketRecord } from "@/api/tickets";
import { PaginatedList } from "@/api/base";
import { TeamRecord, getTeam } from "@/api/teams";
<<<<<<< HEAD
import { generateTicketPageLink } from "@/methods/teamPage";
import store from "@/store";
import TicketModal from "@/components/TicketModal.vue";
import PaginatedListView from "@/components/PaginatedListView.vue";
import TicketListEntry from "@/components/TicketListEntry.vue";
import TicketInput from "@/components/TicketInput.vue";
=======
import { DateTime } from "luxon";
import store from "@/store";
import TicketModal from "@/components/TicketModal.vue";
>>>>>>> develop

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
<<<<<<< HEAD
    TicketModal,
    TicketListEntry,
    TicketInput,
    PaginatedListView
=======
    TicketModal
>>>>>>> develop
  },
  setup(props) {
    // reactive data
    const ticketList = ref({} as PaginatedList<TicketRecord>);
    const listPage = ref(1);
    const selectedTicket = ref({});
    const showModal = ref(false);
    const teamId = parseInt(props.teamId);

    const getTeamTickets = async () => {
      const axiosInstance = store.getters.generateAxiosInstance;
<<<<<<< HEAD

      // hack. v-for does not detect change on results unless this is reset
      // manually
      ticketList.value.results = [];
      ticketList.value = await listTickets(
        teamId,
        listPage.value,
        axiosInstance
      );
    };

    const selectTicket = async (ticket?: TicketRecord) => {
      await router.replace(generateTicketPageLink(props.teamId, ticket?.id));
      await getTeamTickets();
    };

    const changePage = (increment: number) => {
      listPage.value += increment;
      getTeamTickets();
    };
=======
      const team = teamRecord.value;
      ticketList.value = await listTickets(team, listPage.value, axiosInstance);
    }

    const getTeamRecord = async () => {
      const axiosInstance = store.getters.generateAxiosInstance;
      const teamId = parseInt(props.teamId); 
      const team = await getTeam(axiosInstance, teamId); 
      teamRecord.value = team;
    }
>>>>>>> develop

    onMounted(async () => {
      await getTeamTickets();
    });

    return {
      ticketList,
      listPage,
      getTeamTickets,
<<<<<<< HEAD
      selectTicket,
      showModal,
      selectedTicket,
      changePage
=======
      getTeamRecord
>>>>>>> develop
    };
  }
});
</script>
