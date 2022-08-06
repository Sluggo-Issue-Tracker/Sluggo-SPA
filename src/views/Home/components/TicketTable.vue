<template>
  <div>
    <div v-if="loading" class="loadingContainer">
      <Loader :width="50" :height="50" />
    </div>
    <div v-else-if="error">
      Error while loading tickets
    </div>
    <div v-else-if="data && data.length !== 0" class="dataContainer">
      <div class="ticketsContainer">
        <TicketRow v-for="ticket in data" :key="ticket.id" :ticket="ticket" />
      </div>
      <PaginationControls
        v-if="totalPages !== 1"
        :current-page="page"
        :total-pages="totalPages"
        @updatePage="handlePageUpdate"
      />
    </div>
    <div v-if="!loading && !error && (!data || data.length === 0)">
      You have no tickets
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import { ReadTicketRecord } from "@/api/types";
import { AxiosError } from "axios";
import { QueryState } from "@/methods/wrapExceptions";
import Loader from "@/components/Loader.vue";
import TicketRow from "./TicketRow.vue";
import PaginationControls from "@/components/PaginationControls";

export default defineComponent({
  name: "TicketTable",
  components: {
    TicketRow,
    PaginationControls,
    Loader
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
    const pageSize = 5;
    const page = ref(1);
    const loading = ref(props.queryState.loading);
    const data = computed(() => {
      if (props.queryState.data.value) {
        const idx = (page.value - 1) * pageSize;
        return props.queryState.data.value.slice(idx, idx + pageSize);
      }
      return undefined;
    });

    const error = ref(props.queryState.error);

    const totalPages = computed(() => {
      if (props.queryState.data.value) {
        return Math.ceil(props.queryState.data.value.length / pageSize);
      }
      return 1;
    });

    const handlePageUpdate = (newPageNumber: number) => {
      page.value = newPageNumber;
    };

    return {
      loading,
      data,
      error,
      handlePageUpdate,
      totalPages,
      page
    };
  }
});
</script>

<style scoped src="../styles.module.scss" lang="scss"></style>
