<template>
  <a @click="show = true"> <i class="fa fa-plus fa-fw"></i> Add a ticket ... </a>
  <div v-if="show" class="modal is-active">
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
import { TeamRecord } from "@/api/teams";
import { WriteTicketRecord, createTicket } from "@/api/tickets";
import store from "@/store";

export default defineComponent({
  name: "TicketModal",
  props: {
    team: {
      type: Object,
      required: true
    } 
  },
  emits: [
    "create"
  ],
  setup(props, context) {
    const show = ref(false);

    const ticketRecord = ref({
      tag_list: [],
      assigned_user: undefined,
      status: undefined,
      title: "",
      description: ""
    } as WriteTicketRecord);

    const submit = async () => {
      show.value = !show.value
      const axiosInstance = store.getters.generateAxiosInstance; 

      console.log(props.team);
      const ticket = await createTicket(ticketRecord.value, props.team as TeamRecord, axiosInstance);

      context.emit("create");
    }

    const cancel = () => {
      show.value = !show.value;
    }

    onMounted(() => {
      console.log(props.team);
    })
    
    return {
      show,
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
