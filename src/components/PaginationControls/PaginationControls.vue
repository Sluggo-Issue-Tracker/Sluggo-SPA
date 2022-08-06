<template>
  <nav class="pagination is-centered" role="navigation" aria-label="pagination">
    <a
      v-if="currentPage !== 1"
      class="pagination-previous"
      :onclick="buildUpdateCallback(currentPage - 1)"
      >Previous</a
    >
    <a
      v-if="totalPages !== currentPage"
      class="pagination-next"
      :onclick="buildUpdateCallback(currentPage + 1)"
      >Next page</a
    >
    <ul class="pagination-list">
      <li v-if="currentPage > 2">
        <a class="pagination-link" :onclick="buildUpdateCallback(1)">1</a>
      </li>
      <li v-if="currentPage > 3">
        <span class="pagination-ellipsis">&hellip;</span>
      </li>
      <li v-if="currentPage > 1">
        <a
          class="pagination-link"
          :onclick="buildUpdateCallback(currentPage - 1)"
          >{{ currentPage - 1 }}</a
        >
      </li>
      <li>
        <a class="pagination-link is-current">{{ currentPage }}</a>
      </li>
      <li v-if="totalPages - currentPage > 0">
        <a
          class="pagination-link"
          :onclick="buildUpdateCallback(currentPage + 1)"
        >
          {{ currentPage + 1 }}
        </a>
      </li>
      <li v-if="totalPages - currentPage > 2">
        <span class="pagination-ellipsis">&hellip;</span>
      </li>
      <li v-if="totalPages - currentPage > 1">
        <a class="pagination-link" :onclick="buildUpdateCallback(totalPages)">
          {{ totalPages }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PaginationControls",
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  },
  emits: {
    updatePage: null
  },
  setup: (props, instance) => {
    const buildUpdateCallback = (page: number) => () => {
      instance.emit("updatePage", page);
    };
    return { buildUpdateCallback };
  }
});
</script>

<style scoped></style>
