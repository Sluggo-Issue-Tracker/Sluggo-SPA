<template>
  <p class="title is-5">Invitations</p>
  <div class="block">
    <p v-if="loading">Loading...</p>
    <div v-else-if="!loading && data">
      <p v-if="data.length === 0">Invitations to teams will show up here.</p>
      <p
        v-else
        v-for="invite in data"
        :key="invite.id"
        class="box is-clickable"
        @click="
          isModalActive = true;
          selectedInvite = invite;
        "
      >
        <span class="title is-6"> {{ invite.team.name }} </span>
      </p>
    </div>
    <p v-else-if="error">Error! {{ error.message }}</p>
  </div>

  <o-modal v-model:active="isModalActive" :width="640">
    <div class="card modal-card">
      <header class="card-header">
        <p class="card-header-title">You're invited</p>
      </header>
      <div v-if="selectedInvite" class="card-content">
        <p>
          You've been invited to
          <strong>{{ selectedInvite.team.name }}</strong> as a member. Select
          accept to become a member of
          <strong>{{ selectedInvite.team.name }}</strong
          >, or reject to delete this invitation.
        </p>
      </div>
      <div class="card-footer">
        <a class="card-footer-item" @click.self="processAccept()">Accept</a>
        <a class="card-footer-item" @click.self="processReject()">Reject</a>
      </div>
    </div>
  </o-modal>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { getUsersInvites, acceptInvite, rejectInvite } from "@/api/teams";
import { apiExecutor, wrapExceptions } from "@/methods";
import { ReadInviteRecord } from "@/api/types";

export default defineComponent({
  setup: () => {
    const isModalActive = ref<boolean>(false);
    const selectedInvite = ref<ReadInviteRecord | undefined>(undefined);
    const [queryUsersInvites, { data, loading, error }] = apiExecutor(
      getUsersInvites
    );

    const inviteProcessor = (
      request: (inviteId: number) => Promise<unknown>
    ) => async () => {
      if (!selectedInvite.value) return;
      const [, error] = await wrapExceptions(request, selectedInvite.value.id);

      if (error) {
        alert(error.message);
      }
      console.log("processed");

      isModalActive.value = false;
      queryUsersInvites();
    };

    const processAccept = inviteProcessor(acceptInvite);
    const processReject = inviteProcessor(rejectInvite);

    onMounted(() => {
      queryUsersInvites();
    });

    return {
      processAccept,
      processReject,
      isModalActive,
      data,
      loading,
      selectedInvite,
      error
    };
  }
});
</script>

<style scoped></style>
