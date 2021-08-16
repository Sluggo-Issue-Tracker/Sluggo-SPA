<template>
  <div class="ticket-modal">
    <div class="ticket-modal-header">
      <div class="logo">
        <IconSluggo :height="50" :width="50" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import store from "@/store";
import IconSluggo from "@/assets/IconSluggo";
import { UserRecord } from "@/api/types";

const ticketModalComponent = defineComponent({
  name: "TicketModal",
  components: {
    IconSluggo
  },
  setup: () => {
    const authUser = ref<UserRecord>(store.getters.authUser);

    return {
      authUser
    };
  }
});

export default ticketModalComponent;
</script>

<style></style>
