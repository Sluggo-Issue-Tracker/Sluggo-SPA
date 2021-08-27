<template>
  <div class="dropdown" :class="dropdownClass">
    <label class="dropdown-label">{{ label }}</label>
    <div class="dropdown-trigger" @click="toggleDropdown">
      <button
        class="button ticket-tags is-fullwidth has-text-left"
        :style="{
          'background-color': backgroundColor,
          color: textColor,
          border: borderStyle
        }"
      >
        <span>{{
          firstItem ||
            items[0].name ||
            items[0].title ||
            items[0].owner.username ||
            ""
        }}</span>
        <i class="bx bx-chevron-down"></i>
      </button>
    </div>
    <div class="dropdown-menu">
      <div class="dropdown-content">
        <div
          class="dropdown-item"
          v-for="item in items"
          :key="item.name || item.title || item.owner.username"
          @click="itemSelected(item.name || item.title || item.owner.username)"
        >
          {{ item.name || item.title || item.owner.username }}
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
      type: String
    },
    items: {
      type: Array
    },
    backgroundColor: {
      type: String,
      default: "#FFFFFF"
    },
    textColor: {
      type: String,
      default: "black"
    },
    borderStyle: {
      type: String,
      default: ""
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
      itemSelected
    };
  }
});
export default dropdownComponent;
</script>

<style scoped src="./dropdown-styles.module.scss" lang="scss"></style>
