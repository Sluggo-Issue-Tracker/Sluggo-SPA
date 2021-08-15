<template>
  <div class="modal is-active">
    <div class="modal-background" @click="cancel"></div>
    <div class="modal-content new_ticket_modal">
      <section class="box">
        <div class="columns">
          <div class="column is-three-quarters">
            <div class="field">
              <span class="subtitle">Title</span>
              <input
                type="text"
                class="input"
                v-model="ticketRecord.title"
                placeholder="Enter new title here"
              />
            </div>
            <div class="field">
              <span class="subtitle">Tags</span>
              <!-- <v-select
                class="tag-chooser"
                maxHeight="100px"
                multiple
                placeholder="Choose Tags"
              ></v-select> -->
            </div>
            <div class="field">
              <span class="subtitle">Description</span>
              <textarea
                class="textarea is-fullwidth"
                placeholder="Enter new ticket here"
                v-model="ticketRecord.description"
              ></textarea>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <span class="subtitle">Due Date</span>
              <input class="input" type="date" placeholder="mm / dd / yyyy" />
              <span class="has-text-danger">Invalid Format</span>
            </div>
            <div class="field">
              <span class="subtitle">Assignee</span>
              <!-- <v-select
                class="tag-chooser"
                maxHeight="100px"
                placeholder="No assignment"
              ></v-select> -->
            </div>
          </div>
        </div>
        <button class="button is-success" @click="submit">Save changes</button>
        <button class="button" @click="cancel">Cancel</button>
        <button class="button" @click="remove">Delete</button>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/camelcase */
import { defineComponent, onMounted, ref } from "vue";
import {
  updateTicket,
  deleteTicket,
  getTicket
} from "@/api/tickets";
import {
  ReadTicketRecord
} from "@/api/types";
import store from "@/store";

export default defineComponent({
  name: "TicketModal",
  props: {
    teamId: {
      type: String,
      required: true
    },
    ticketId: {
      type: String,
      required: true
    }
  },
  emits: ["close"],
  setup(props, context) {
    const ticketId = parseInt(props.ticketId);
    const teamId = parseInt(props.teamId);

    const ticketRecord = ref({});
    const resetData = () => {
      ticketRecord.value = {};
    };

    const getData = async () => {
      try {
        console.log(props.teamId);
        ticketRecord.value = await getTicket(ticketId, teamId);
      } catch (error) {
        alert(error);
      }
    };

    const submit = async () => {
      try {
        await updateTicket(
          ticketRecord.value as ReadTicketRecord,
          teamId
        );
      } catch (error) {
        alert(error);
        return;
      }
      context.emit("close");
    };

    const remove = async () => {
      try {
        await deleteTicket(
          ticketRecord.value as ReadTicketRecord,
          teamId
        );
      } catch (error) {
        alert(error);
        return;
      }
      context.emit("close");
    };

    const cancel = () => {
      resetData();
      context.emit("close");
    };

    onMounted(async () => {
      await getData();
    });

    return {
      ticketRecord,
      submit,
      remove,
      cancel
    };
  }
});
</script>

<style scoped>
.tag-chooser .vs__dropdown-menu {
  max-height: 200px;
}
.new_ticket_modal {
  width: 1000px;
}
</style>
