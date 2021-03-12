<template>
  <slot></slot>
  <br />
  <nav class="pagination is-centered" role="naviation">
    <a class="pagination-previous" @click="data.previous && $emit('prev')"
      >prev</a
    >
    <a class="pagination-next" @click="data.next && $emit('next')">next</a>
    <ul class="pagination-list">
      <li v-if="page !== 1">
        <a class="pagination-link">1</a>
      </li>
      <li>
        <a class="pagination-link is-current">{{ page }} </a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PaginatedList } from "@/api/base";
import { defineComponent } from "vue";
// import TicketListEntry from "@/components/TicketListEntry.vue";

export default defineComponent({
  // components: { TicketListEntry },
  name: "PaginatedListView",
  props: {
    data: {
      // paginated list can hold anything. necessary results field is
      // parameterized.
      type: Object as () => PaginatedList<any>,
      required: true
    },
    page: {
      type: Number,
      required: true
    }
  },
  emits: ["next", "prev"]
});
</script>
