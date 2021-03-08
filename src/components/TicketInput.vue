<template>
  <a v-if="!show" @click="show = true">+ Add a ticket...</a>
  <div v-if="show" class="level">
    <div class="level-left">
      <input
        type="text"
        class="input level-item"
        v-model="ticketRecord.title"
        placeholder="Enter new title here"
      />
      <button class="level-item" @click="submit">Submit</button>
      <button class="level-item" @click="reset">Cancel</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { TeamRecord } from "@/api/teams";
import { createTicket, WriteTicketRecord } from "@/api/tickets";
import store from "@/store";
export default defineComponent({
  name: "TicketInput",
  props: {
    team: {
      type: Object as () => TeamRecord,
      required: true
    }
  },
  emits: ["create"],
  setup(props, context) {
    const ticketRecord = ref({} as WriteTicketRecord);
    const show = ref(false);

    const reset = () => {
      show.value = false;
      ticketRecord.value = {
        title: ""
      };
    };

    const submit = async () => {
      const axiosInstance = store.getters.generateAxiosInstance;
      try {
        await createTicket(ticketRecord.value, props.team, axiosInstance);
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
