<template>
  <div id="home-page">
    <section id="home-section" class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-two-thirds">
            <p class="title">Hey, User</p>
            <p>It's DATE. Here's your overview:</p>
            <p>
              Thank you for registering for Sluggo! Currently your account is
              unapproved, so you won't be able to do much, but feel free to poke
              around where you can, an Admin will approve you shortly.
            </p>
            <div class="level">
              <div class="level-item level-left">
                <p class="is-size-4 has-text-weight-semibold">
                  Assigned to You
                </p>
              </div>
            </div>
            <div>
              <div class="columns">
                <div class="column">
                  <p>You don't have any incomplete tickets assigned to you.</p>
                </div>
              </div>
            </div>
            <div class="notification is-info">
              <div class="columns">
                <div class="column">
                  <p class="is-size-5">
                    Ticket ID | tags | title
                  </p>
                  <p>
                    Due DUEDATE
                  </p>
                </div>
                <!-- <div class="column"></div>
                   <div class="column">
                      <div class="buttons">
                         <div class="button is-inverted is-danger is-outlined">
                            <p>Complete</p>
                         </div>
                      </div>
                   </div> -->
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <a class="sluggo_clickable"
                  >See all tickets assigned to you &rarr;</a
                >
              </div>
            </div>
            <br />
            <div class="columns is-multiline">
              <p class="column is-12 is-size-4 has-text-weight-semibold">
                Recent Updates
              </p>
              <br />
              <p class="column is-12">
                You don't have any events. Star a ticket or get assigned to a
                ticket to see updates here.
              </p>
            </div>
            <div>
              <article class="notification">
                <div class="columns">
                  <div class="column">
                    <!-- generic debug -->
                    <!-- <p>User {{e.web_action_user_name}} performed action {{e.type}} with content {{e.description}}
                            on ticket {{e.related_ticket}}
                         </p> -->
                    <p>
                      USERNAME posted on Ticket TICKET: EVENT DESCRIPTION
                    </p>
                    <p>
                      USERNAME just marked Ticket TICKET: RELATED DESCRIPTION
                      <span> Awesome!</span>
                    </p>
                    <TicketModal />
                    <!-- <p><span class="has-text-weight-bold">Andrew Gavgavian posted on Ticket 21 "Submitting software proposal for...": </span>
                         </p><p>"Great work! I think we can start moving this proposal forward. I cleaned up some of the wording
                            and described some more technical mechanisms.""
                         </p> -->
                  </div>
                </div>
              </article>
            </div>
          </div>
          <div class="column is-one-third">
            <div class="box">
              <div class="level">
                <div class="level-item level-left">
                  <p class="is-size-4 has-text-weight-semibold">
                    Starred Tickets
                  </p>
                </div>
                <!-- TODO: Implement easy pinned ticket modification -->
                <!-- <div class="level-item level-right buttons">
                      <div class="button">
                         Edit
                      </div>
                   </div> -->
              </div>
              <div class="columns">
                <div class="column">
                  <p>You don't have any starred tickets.</p>
                </div>
              </div>
              <div class="notification is-info">
                <div class="columns is-mobile">
                  <div class="column is-10">
                    <p class="is-size-5">
                      Ticket PINNED ID | TAGS | TITLE
                    </p>
                    <p>
                      DUE DATE
                    </p>
                    <!-- <p>Due May 25, 2020.</p> -->
                  </div>
                  <div class="column is-2">
                    <span><i class="bx bxs-pin bx-sm"></i></span>
                  </div>
                  <!-- TODO: Determine how to expose ticket completion
                     endpoints on the homepage -->
                  <!-- <div class="column">
                        <div class="buttons">
                           <div class="button is-static">
                              <p>Complete</p>
                           </div>
                        </div>
                     </div> -->
                  <!-- TODO: Progress indicator -->
                  <!-- <div class="columns">
                     <div class="column">
                        <p class="is-size-6 has-text-weight-semibold">50% Complete (2/4)</p>
                        <progress class="progress" value="50" max="100">50%</progress>
                     </div>
                  </div> -->
                </div>
              </div>
            </div>
            <div class="box">
              <div class="level">
                <div class="level-item level-left">
                  <p class="is-size-4 has-text-weight-semibold">Your Tags</p>
                </div>
              </div>
              <div class="">
                You don't have any tags
              </div>
              <div class="tile is-ancestor">
                <div class="tile is-parent is-vertical">
                  <article
                    class="sluggo_hp_tag tile is-child notification is-grey-lighter"
                  >
                    <p>
                      TAG NAME
                      <span class="has-text-danger"
                        >(overdue count) tickets</span
                      >
                    </p>
                  </article>
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
import { defineComponent } from "vue";
import TicketModal from "@/views/TicketModal/TicketModal.vue";

export default defineComponent({
  name: "Home"
  name: "Home",
   components: {
     TicketModal
   }
});
</script>
