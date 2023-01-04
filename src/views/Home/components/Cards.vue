<template>
  <p class="title is-4">
    {{ title }}
  </p>
  <div v-if="list" class="block">
    <div v-if="list && list.length > 0">
      <div class="tile is-ancestor">
        <div
          v-for="(item, i) in listPage.slice(0, pageSize / 2)"
          class="tile is-parent is-vertical"
          :key="i"
        >
          <slot name="card" :item="item"></slot>
        </div>
      </div>
      <div class="tile is-ancestor">
        <div
          v-for="(item, i) in listPage.slice(pageSize / 2, listPage.length)"
          class="tile is-parent is-vertical"
          :key="i"
        >
          <article class="tile is-child">
            <slot name="card" :item="item"></slot>
          </article>
        </div>
      </div>
    </div>
    <p v-else>
      {{ missingMessage }}
    </p>
  </div>
  <div class="block">
    <o-pagination
      v-if="list.length > pageSize"
      v-model:current="page"
      :total="list.length"
      :perPage="pageSize"
      size="small"
      order="centered"
      iconPrev="bxs-chevron-left"
      iconNext="bxs-chevron-right"
      iconPack="bx"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType, toRefs } from "vue";

const pageSize = 6;

export default defineComponent({
  props: {
    list: {
      type: Object as PropType<Record<string, any>[]>,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    missingMessage: {
      title: String,
      required: true
    }
  },
  setup: props => {
    const page = ref<number>(1);
    const { list } = toRefs(props);
    const listPage = computed(() => {
      const idx = (page.value - 1) * pageSize;
      return Array.isArray(list.value)
        ? list.value.slice(idx, idx + pageSize)
        : [];
    });

    return {
      listPage,
      pageSize,
      page
    };
  }
});
</script>

<style scoped>
.ticket-card {
  border-left: 5px solid red;
}
</style>
