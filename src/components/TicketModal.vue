<template>
<<<<<<< HEAD
  <div class="modal is-active">
=======
  <a @click="show = true"> <i class="fa fa-plus fa-fw"></i> Add a ticket ... </a>
  <div v-if="show" class="modal is-active">
>>>>>>> develop
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
<<<<<<< HEAD
import {
  updateTicket,
  TicketRecord,
  deleteTicket,
  getTicket
} from "@/api/tickets";
=======
import { TeamRecord } from "@/api/teams";
import { WriteTicketRecord, createTicket } from "@/api/tickets";
>>>>>>> develop
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
<<<<<<< HEAD
  emits: ["close"],
=======
  emits: [
    "create"
  ],
>>>>>>> develop
  setup(props, context) {
    const ticketId = parseInt(props.ticketId);
    const teamId = parseInt(props.teamId);

    const ticketRecord = ref({});
    const resetData = () => {
<<<<<<< HEAD
      ticketRecord.value = {};
    };

    const getData = async () => {
      const axiosInstance = store.getters.generateAxiosInstance;
      try {
        console.log(props.teamId);
        ticketRecord.value = await getTicket(ticketId, teamId, axiosInstance);
      } catch (error) {
        alert(error);
      }
    };

    const submit = async () => {
      const axiosInstance = store.getters.generateAxiosInstance;
      try {
        await updateTicket(
          ticketRecord.value as TicketRecord,
          teamId,
          axiosInstance
        );
      } catch (error) {
        alert(error);
        return;
      }
      context.emit("close");
    };
=======
      ticketRecord.value = {
        tag_list: [],
        assigned_user: undefined,
        status: undefined,
        title: "",
        description: ""
      };
    }

    const submit = async () => {
      show.value = !show.value
      const axiosInstance = store.getters.generateAxiosInstance; 
>>>>>>> develop

    const remove = async () => {
      const axiosInstance = store.getters.generateAxiosInstance;
      try {
<<<<<<< HEAD
        await deleteTicket(
          ticketRecord.value as TicketRecord,
          teamId,
          axiosInstance
        );
      } catch (error) {
        alert(error);
        return;
      }
      context.emit("close");
    };
=======
        await createTicket(ticketRecord.value, props.team as TeamRecord, axiosInstance);
        context.emit("create");
      } finally {
        resetData();
      }
    }
>>>>>>> develop

    const cancel = () => {
      resetData();
<<<<<<< HEAD
      context.emit("close");
    };
=======
    }
>>>>>>> develop

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
