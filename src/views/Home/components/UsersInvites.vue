<template>
  <label class="title is-5">Invitations</label>
  <p v-if="loading">Loading...</p>
  <div v-else-if="!loading && data" class="has-max-height">
    <p v-if="data.length === 0">Invitations to teams will show up here.</p>
    <p v-else v-for="invite in data" :key="invite.id" class="box">
      <span class="title is-6"> {{ invite.team.name }} </span>
    </p>
  </div>
  <p v-else-if="error">Error! {{ error.message }}</p>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { getUsersInvites } from "@/api/teams";
import { apiExecutor } from "@/methods";

export default defineComponent({
  setup: () => {
    const [queryUsersInvites, { data, loading, error }] = apiExecutor(
      getUsersInvites
    );

    onMounted(() => {
      queryUsersInvites();
    });

    return {
      data,
      loading,
      error
    };
  }
});
</script>

<style scoped>
.has-max-height {
  max-height: 300px;
}
</style>
