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

    <ticket-modal></ticket-modal>

    <!-- TODO: Samuel Schmidt 5 / 21 / 2020 move this into a vue component -->
    <section class="section">
      <div class="container has-background-light">
        <div class="section">
          <a> <i class="fa fa-plus fa-fw"></i> Add a ticket ... </a>
          <p class="has-text-danger">
            <i class="fa fa-ban fa-fw"></i> Must be approved to add tickets ...
          </p>
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
                    <span>{{ ticket.ticket_number }} | {{ ticket.title }} </span>
                  </a>
                </div>
                <div class="level-item">
                  <span class="tag is-link">
                    Not started
                  </span>
                  <span class="tag is-warning">
                    In progress
                  </span>
                  <span class="tag is-success">
                    Completed
                  </span>
                </div>
                <div
                  class="level-item"
                  style="max-width: 100px; word-wrap:break-word;"
                >
                  <span class="tag has-background-grey-lighter">
                    TAG NAME
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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { listTickets, TicketRecord } from "@/api/tickets";
import { PaginatedList } from "@/api/base";
import { TeamRecord } from "@/api/teams";
import store from "@/store";

export default defineComponent({
  name: "Tickets",
  setup() {
    const ticketList = ref({} as PaginatedList<TicketRecord>);
    const listPage = ref(1);
    const getTeamTickets = async () => {
      const axiosInstance = store.getters.generateAxiosInstance;
      const team = store.state.team;

      if (team) {
        console.log("no team!")
        ticketList.value = await listTickets(team, listPage.value, axiosInstance);
      }
    }
    onMounted(getTeamTickets);

    return {
      ticketList,
      listPage,
      getTeamTickets
    };
  }
});
</script>
