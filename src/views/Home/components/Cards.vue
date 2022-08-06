<template>
  <div class="level">
    <div class="level-left">
      <div class="level-item">
        <label class="title is-4">
          {{ title }}
        </label>
      </div>
    </div>
    <div class="level-right">
      <div class="level-item">
        <o-pagination
          v-if="list.length > pageSize"
          v-model:current="page"
          :total="list.length"
          :perPage="pageSize"
          size="small"
          :simple="true"
          order="right"
          iconPrev="bxs-chevron-left"
          iconNext="bxs-chevron-right"
          iconPack="bx"
        />
      </div>
    </div>
  </div>
  <div v-if="list">
    <div v-if="list && list.length > 0">
      <div class="tile is-ancestor">
        <div
          v-for="item in listPage"
          class="tile is-parent is-vertical"
          :key="item[itemKey]"
        >
          <article class="tile is-child">
            <div class="box is-tile ticket-card">
              <label class="title is-6">
                <slot name="header" :item="item"></slot>
              </label>
              <p>
                <slot name="body" :item="item"></slot>
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>
    <p v-else>
      {{ missingMessage }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType, toRefs } from "vue";

const pageSize = 3;

export default defineComponent({
  props: {
    list: {
      type: Object as PropType<Record<string, any>[]>,
      required: true
    },
    itemKey: {
      type: String,
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

<style scoped></style>
