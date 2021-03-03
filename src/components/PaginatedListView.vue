<template>
  <section class="section">
    <div class="container">
      <button @click="data.next && $emit('next')">next</button>
      <button @click="data.previous && $emit('prev')">prev</button>
    </div>
    <slot></slot>
  </section>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PaginatedList } from "@/api/base";
import { computed, defineComponent, ref, onMounted } from "vue";
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
    }
  },
  emits: ["next", "prev"]
});
</script>
