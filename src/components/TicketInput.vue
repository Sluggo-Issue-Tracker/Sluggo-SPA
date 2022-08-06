<template>
  <a v-if="!show" @click="show = true">+ Add a ticket...</a>
  <div v-if="show" class="level">
    <div class="level-left">
      <input
        type="text"
        class="input level-item"
        v-model="ticketRecord.title"
        placeholder="Enter new title here"
        v-on:keyup.enter="submit"
        v-on:keyup.esc="reset"
      />
      <button class="level-item button is-link" @click="submit">Submit</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { createTicket } from "@/api/tickets";
import { WriteTicketRecord } from "@/api/types";
export default defineComponent({
  name: "TicketInput",
  props: {
    teamId: {
      type: String,
      required: true
    }
  },
  emits: ["create"],
  setup(props, context) {
    const ticketRecord = ref({} as WriteTicketRecord);
    const show = ref(false);

    const teamId = parseInt(props.teamId);

    const reset = () => {
      show.value = false;
      ticketRecord.value = {
        title: ""
      };
    };

    const submit = async () => {
      try {
        await createTicket(ticketRecord.value, teamId);
      } catch (error) {
        alert(error);
        return;
      }
      reset();
      context.emit("create");
    };

    return {
      ticketRecord,
      show,
      reset,
      submit
    };
  }
});
</script>
