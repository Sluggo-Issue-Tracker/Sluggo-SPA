<template>
  <div class="container">
    <div class="columns">
      <div class="column">
        <div class="block">
          <div class="box">
            <label class="title is-5">Hello, {{ user.username }}</label>
            <p>It's {{ date }}. Thank you for using sluggo.</p>
          </div>
        </div>

        <!-- case where user has no teams -->
        <div
          v-if="!loading && usersTeamsData && usersTeamsData.length === 0"
          class="block"
        >
          <div class="box">
            Sluggo is an invite-only issue tracker, designed for use by teams.
            If you're seeing this message, that means you're not currently a
            member of any team. To become one, contact your administrator. Team
            invites will show up on this home screen, as well as the teams page.
          </div>
        </div>

        <!-- user has teams -->
        <div v-if="!loading && usersTeamsData && usersTeamsData.length > 0">
          <div class="block" v-if="usersPinnedData">
            <TicketCards
              title="Your Pinned Tickets"
              :tickets="usersPinnedData"
            />
          </div>
          <div class="block" v-if="assignedTicketsData">
            <TicketCards
              title="Tickets Assigned to You"
              :tickets="assignedTicketsData"
            />
          </div>
          <div class="block" v-if="usersTeamsData">
            <TeamCards :teams="usersTeamsData" />
          </div>
        </div>
      </div>

      <!-- sidebar (recently viewed, invitations, pinned tickets) -->
      <div class="column is-one-fifth">
        <div class="block">
          <p class="title is-5">Recently Viewed</p>
          <p>Your recently viewed pages will show up here.</p>
        </div>

        <!-- invitations -->
        <div class="block">
          <UsersInvites />
        </div>

        <!-- tags-->
        <div class="block">
          <p class="title is-5">Your Tags</p>
          <p>Your tags will show up here.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import { apiExecutor } from "@/methods";
import {
  getUsersPinnedTickets,
  getUsersAssignedTickets,
  getUsersTeams
} from "@/api";
import UsersInvites from "./components/UsersInvites.vue";
import TeamCards from "./components/TeamCards.vue";
import TicketCards from "./components/TicketCards.vue";
import { DateTime } from "luxon";
import { userKey } from "@/api/types";
import { injectStrict } from "@/methods/injectStrict";

export default defineComponent({
  name: "Home",
  components: {
    TeamCards,
    TicketCards,
    UsersInvites
  },
  setup: () => {
    const user = injectStrict(userKey);
    const date = computed(() => {
      const dt = DateTime.now();
      return dt.toLocaleString(DateTime.DATE_HUGE);
    });

    const [
      queryUsersPinned,
      {
        data: usersPinnedData,
        loading: usersPinnedLoading,
        error: usersPinnedError
      }
    ] = apiExecutor(getUsersPinnedTickets);

    const [
      queryUsersAssigned,
      {
        data: assignedTicketsData,
        loading: assignedTicketsLoading,
        error: assignedTicketsError
      }
    ] = apiExecutor(getUsersAssignedTickets);

    const [
      queryUsersTeams,
      {
        data: usersTeamsData,
        loading: usersTeamsLoading,
        error: usersTeamsError
      }
    ] = apiExecutor(getUsersTeams);

    const loading = computed(
      () => assignedTicketsLoading.value || usersTeamsLoading.value
    );
    const error = computed(
      () => assignedTicketsError.value || usersTeamsError.value
    );

    onMounted(() => {
      queryUsersPinned();
      queryUsersAssigned();
      queryUsersTeams();
    });

    return {
      user,
      date,
      usersPinnedData,
      usersPinnedLoading,
      usersPinnedError,
      assignedTicketsData,
      usersTeamsData,
      loading,
      error
    };
  }
});
</script>

<style scoped lang="scss">
.has-top-border {
  border-top: 1px solid hsl(0, 0%, 21%);
}
</style>
