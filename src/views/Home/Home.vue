<template>
  <div class="container">
    <div class="columns">
      <div class="column">
        <div class="block">
          <div class="box">
            <label class="title is-5">Hello, User</label>
            <p>It's date. Thank you for using sluggo</p>
          </div>
        </div>
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
        <div v-if="!loading && usersTeamsData && usersTeamsData.length > 0">
          <div class="block" v-if="assignedTicketsData">
            <TicketCards :tickets="assignedTicketsData" />
          </div>
          <div class="block" v-if="usersTeamsData">
            <TeamCards :teams="usersTeamsData" />
          </div>
        </div>
      </div>
      <div class="column is-one-fifth">
        <div class="block">
          <label class="title is-5">Recently Viewed</label>
          <p>Your recently viewed pages will show up here.</p>
        </div>
        <div class="block">
          <label class="title is-5">Invitations</label>
          <p>Invitations to teams will show up here.</p>
        </div>
        <div class="block">
          <label class="title is-5">Pinned Tickets</label>
          <p>Your pinned tickets will show up here.</p>
        </div>
        <div class="block">
          <label class="title is-5">Your Tags</label>
          <div class="tags box">
            <span class="tag">wine</span>
            <span class="tag">robot</span>
            <span class="tag">code</span>
            <span class="tag">wine</span>
            <span class="tag">robot</span>
            <span class="tag">code</span>
            <span class="tag">wine</span>
            <span class="tag">robot</span>
            <span class="tag">code</span>
            <span class="tag">wine</span>
            <span class="tag">robot</span>
            <span class="tag">code</span>
          </div>
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
import TeamCards from "./components/TeamCards.vue";
import TicketCards from "./components/TicketCards.vue";

export default defineComponent({
  name: "Home",
  components: {
    TeamCards,
    TicketCards
  },
  setup: () => {
    const [queryUsersPinned, usersPinnedState] = apiExecutor(
      getUsersPinnedTickets
    );

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
      usersPinnedState,
      assignedTicketsData,
      usersTeamsData,
      loading,
      error
    };
  }
});
</script>

<style src="./styles.module.scss" lang="scss" />
