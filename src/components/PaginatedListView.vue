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
      <li v-if="page !== maxPage">
        <a class="pagination-link">{{ maxPage }} </a>
        <!-- bad -->
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PaginatedList, pageSize } from "@/api/base";
import { defineComponent, computed } from "vue";
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
  emits: ["next", "prev"],
  setup(props) {
    const maxPage = computed(() => {
      return Math.ceil(props.data.count / pageSize);
    });
    return {
      maxPage
    };
  }
});
</script>
