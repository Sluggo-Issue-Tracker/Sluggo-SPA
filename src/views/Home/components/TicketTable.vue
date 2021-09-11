<template>
  <div>
    <div v-if="loading">
      Loading...
    </div>
    <div v-else-if="error">
      Error while loading tickets
    </div>
    <div v-else-if="data" class="dataContainer">
      <TicketRow v-for="ticket in data" :key="ticket.id" :ticket="ticket" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { ReadTicketRecord } from "@/api/types";
import { AxiosError } from "axios";
import { QueryState } from "@/methods/wrapExceptions";
import TicketRow from "./TicketRow.vue";

export default defineComponent({
  name: "TicketTable",
  components: {
    TicketRow
  },
  props: {
    queryState: {
      type: Object as PropType<
        QueryState<ReadTicketRecord[], AxiosError<never>>
      >,
      required: true
    }
  },
  setup: props => {
    // this may seem weird, but since children of the
    // query object are what change, not the queryState itself
    // this component does not rerender
    const loading = ref(props.queryState.loading);
    const data = ref(props.queryState.data);
    const error = ref(props.queryState.error);

    return {
      loading,
      data,
      error
    };
  }
});
</script>

<style scoped src="../styles.module.scss" lang="scss"></style>
