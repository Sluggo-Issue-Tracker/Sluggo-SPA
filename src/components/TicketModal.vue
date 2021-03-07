<template>
  <div class="modal is-active">
    <div class="modal-background" @click="cancel"></div>
    <div class="modal-content new_ticket_modal">
      <section class="box ">
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
              <span class="has-text-danger" v-if="text_error"
                >Required Field</span
              >
              <span class="has-text-danger" v-if="title_type_error"
                >Field must be Alphanumeric</span
              >
            </div>
            <div class="field">
              <span class="subtitle">Tags</span>
              <v-select
                class="tag-chooser"
                maxHeight="100px"
                multiple
                placeholder="Choose Tags"
              ></v-select>
            </div>
            <div class="field">
              <span class="subtitle">Description</span>
              <textarea
                class="textarea is-fullwidth"
                placeholder="Enter new ticket here"
                v-model="ticketRecord.description"
              ></textarea>
              <span class="has-text-danger" v-if="text_type_error"
                >Field must be Alphanumeric</span
              >
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
              <v-select
                class="tag-chooser"
                maxHeight="100px"
                placeholder="No assignment"
              ></v-select>
            </div>
          </div>
        </div>
        <button class="button is-success" @click="submit">Save changes</button>
        <button class="button">Cancel</button>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/camelcase */
import { defineComponent, onMounted, ref } from "vue";
import { WriteTicketRecord, createTicket, TicketRecord } from "@/api/tickets";
import store from "@/store";

export default defineComponent({
  name: "TicketModal",
  props: {
    ticket: {
      type: Object as () => TicketRecord,
      required: true
    }
  },
  emits: ["close"],
  setup(props, context) {
    const ticketRecord = ref({});
    const resetData = () => {
      console.log("asdf");
    };

    const submit = async () => {
        context.emit("close");
    };

    const cancel = () => {
      resetData();
      context.emit("close");
    };

    onMounted(() => {
      console.log(props.ticket);
      ticketRecord.value = props.ticket;
    })

    return {
      ticketRecord,
      submit,
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
