<template>
  <div class="level">
    <div class="level-left">
      <div class="level-item" style="max-width: 500px; word-wrap: break-word">
        <a class="title">
          <span> {{ ticket.ticket_number }} | {{ ticket.title }} </span>
        </a>
      </div>
      <div class="level-item">
        <span v-if="ticket.status" class="tag is-link">
          {{ ticket.status.title }}
        </span>
      </div>
      <div
        v-for="tag in ticket.tag_list"
        v-bind:key="tag.id"
        class="level-item"
        style="max-width: 100px; word-wrap: break-word"
      >
        <span class="tag has-background-grey-lighter">
          {{ tag.title }}
        </span>
      </div>
    </div>
    <div class="level-right">
      <div class="level-item">
        <span>
          <i class="fa fa-star"></i>
          <i class="fa fa-star-o"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { TicketRecord } from "@/api/tickets";
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  name: "TicketListEntry",
  props: {
    data: {
      type: Object as () => TicketRecord,
      required: true
    }
  },
  setup(props) {
    const ticket = ref(props.data);
    return {
      ticket
    };
  }
});
</script>
