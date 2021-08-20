<template>
  <div class="dropdown" :class="dropdownClass">
    <label class="dropdown-label">{{ label }}</label>
    <div class="dropdown-trigger" @click="toggleDropdown">
      <button
        class="button ticket-tags is-fullwidth"
        :style="{
          'background-color': backgroundColor,
          color: textColor,
          border: borderStyle
        }"
      >
        <span>{{ firstItem || "" }}</span>
        <span class="icon is-small">
          <i class="bx bx-chevron-down"></i>
        </span>
      </button>
    </div>
    <div class="dropdown-menu">
      <div class="dropdown-content">
        <div
          class="dropdown-item"
          v-for="item in items"
          :key="item.data"
          @click="itemSelected(item.data)"
        >
          {{ item.data }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

const dropdownComponent = defineComponent({
  name: "Dropdown",
  props: {
    label: {
      type: String
    },
    firstItem: {
      type: String,
      required: true
    },
    items: {
      type: Array
    },
    backgroundColor: {
      type: String
    },
    textColor: {
      type: String
    },
    borderStyle: {
      type: String
    }
  },
  emits: ["itemSelected"],
  setup: (props, context) => {
    const dropdownClass = ref("");
    const toggleDropdown = () => {
      dropdownClass.value =
        dropdownClass.value == "is-active" ? "" : "is-active";
    };
    const itemSelected = (item: string) => {
      dropdownClass.value = "";
      context.emit("itemSelected", item);
    };
    return {
      toggleDropdown,
      dropdownClass,
      itemSelected,
    };
  }
});

export default dropdownComponent;
</script>

<style scoped src="./styles.module.scss" lang="scss"></style>
