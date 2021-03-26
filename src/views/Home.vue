<template>
  <div id="home-page">
    <section id="home-section" class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-two-thirds">
            <p class="title">Hey, {{ userName }}</p>
            <p class="subtitle">It's {{ date }}. Here's your overview:</p>
            <div class="level">
              <div class="level-item level-left">
                <p class="is-size-4 has-text-weight-semibold">
                  Assigned to You
                </p>
              </div>
              <div class="level-item level-right">
                <button class="button is-primary" @click="fetchAssignedTickets">
                  <i class="bx bx-refresh"></i>
                </button>
              </div>
            </div>
            <div v-if="assignedTickets.length === 0">
              <div class="columns">
                <div class="column">
                  <p>You don't have any incomplete tickets assigned to you.</p>
                </div>
              </div>
            </div>
            <assigned-ticket
              v-for="ticket in assignedTickets"
              :key="ticket.id"
              :ticketRecord="ticket"
            ></assigned-ticket>
            <!-- TODO: Implement filtering on the Tickets page -->
            <!-- <div class="columns">
              <div class="column">
                <a class="sluggo_clickable"
                  >See all tickets assigned to you &rarr;</a
                >
              </div>
            </div> -->
            <br />
            <div class="columns is-multiline">
              <p class="column is-12 is-size-4 has-text-weight-semibold">
                Recent Updates
              </p>
              <br />
              <p class="column is-12">
                Recent updates are not currently implemented.
              </p>
            </div>
            <!-- <div>
              <article class="notification">
                <div class="columns">
                  <div class="column">
                    // generic debug
                    <p>User {{e.web_action_user_name}} performed action {{e.type}} with content {{e.description}}
                            on ticket {{e.related_ticket}}
                         </p>
                    <p>
                      USERNAME posted on Ticket TICKET: EVENT DESCRIPTION
                    </p>
                    <p>
                      USERNAME just marked Ticket TICKET: RELATED DESCRIPTION
                      <span> Awesome!</span>
                    </p>
                    <p><span class="has-text-weight-bold">Andrew Gavgavian posted on Ticket 21 "Submitting software proposal for...": </span>
                         </p><p>"Great work! I think we can start moving this proposal forward. I cleaned up some of the wording
                            and described some more technical mechanisms.""
                         </p>
                  </div>
                </div>
              </article>
            </div> -->
          </div>
          <div class="column is-one-third">
            <div class="box">
              <div class="level">
                <div class="level-item level-left">
                  <p class="is-size-4 has-text-weight-semibold">
                    Pinned Tickets
                  </p>
                </div>
                <!-- TODO: Implement easy pinned ticket modification -->
                <!-- <div class="level-item level-right buttons">
                      <div class="button">
                         Edit
                      </div>
                   </div> -->
              </div>
              <div class="columns" v-if="pinnedTickets.length === 0">
                <div class="column">
                  <p>You don't have any pinned tickets.</p>
                </div>
              </div>
              <pinned-ticket
                v-for="pt in pinnedTickets"
                :key="pt.id"
                :pinRecord="pt"
                @pinnedDidUpdate="fetchPinnedTickets"
              ></pinned-ticket>
            </div>
            <div class="box">
              <div class="level">
                <div class="level-item level-left">
                  <p class="is-size-4 has-text-weight-semibold">Your Tags</p>
                </div>
              </div>
              <p>Personal tags are currently not implemented.</p>
              <!-- <div class="">
                You don't have any tags
              </div>
              <div class="tile is-ancestor">
                <div class="tile is-parent is-vertical">
                  <article
                    class="sluggo_hp_tag tile is-child notification is-grey-lighter"
                  >
                    <p>
                      TAG NAME
                      // TODO: Reimplement once backend has due dates
                      <span class="has-text-danger"
                        >(overdue count) tickets</span
                      >
                    </p>
                  </article>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { ref, computed, defineComponent } from "vue";
import { DateTime } from "luxon";
import store from "@/store";
import PinnedTicket from "@/components/homepage/PinnedTicket.vue";
import AssignedTicket from "@/components/homepage/AssignedTicket.vue";

import { getPinnedTicketsForMember, PinnedTicketRecord } from "@/api/pinned";
import { userNameForUser, dateStringForDate } from "@/methods/common";
import { listTickets, TicketRecord } from "@/api/tickets";

export default defineComponent({
  name: "Home",
  components: {
    PinnedTicket,
    AssignedTicket
  },
  async setup() {
    const userName = computed(() => {
      const user = store.state.user;
      if (typeof user === "undefined") return undefined;

      return userNameForUser(user);
    });

    const date = ref(dateStringForDate(DateTime.now()));

    // MARK: Assigned Tickets
    const assignedTickets = ref([] as TicketRecord[]);
    const fetchAssignedTickets = async () => {
      const team = store.getters.team; // will error if nonexistent

      const user = store.getters.user; // will error if nonexistent

      const assignedTicketResults = await listTickets(
        team.id,
        1, // Assuming one page holds at least three results
        store.getters.generateAxiosInstance,
        {
          assigned: user
        }
      );

      assignedTickets.value = assignedTicketResults.results.slice(0, 3);
    };

    await fetchAssignedTickets();

    // MARK: Pinned Tickets
    const pinnedTickets = ref<PinnedTicketRecord[]>([]);

    const fetchPinnedTickets = async () => {
      const team = store.state.team;
      if (typeof team === "undefined") {
        console.log("Attempted to fetch pinned tickets without team in store");
        return [];
      }

      const member = store.state.member;
      if (typeof member === "undefined") {
        console.log(
          "Attempted to fetch pinned tickets without member in store"
        );
        return [];
      }

      const fetchedPinnedTickets = await getPinnedTicketsForMember(
        store.getters.generateAxiosInstance,
        team.id,
        member.id
      );

      console.log(team.id + " " + member.id);
      console.log(pinnedTickets);

      pinnedTickets.value = fetchedPinnedTickets;
    };

    await fetchPinnedTickets();

    return {
      pinnedTickets,
      fetchPinnedTickets,
      userName,
      date,
      assignedTickets,
      fetchAssignedTickets
    };
  }
});
</script>
