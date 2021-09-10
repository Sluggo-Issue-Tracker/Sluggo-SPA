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
        <span v-if="hasItems() || firstItem">{{ firstItem }}</span>
        <span class="no-items-text" v-else>No options</span>
        <i class="bx bx-chevron-down" v-if="hasItems()"></i>
      </button>
    </div>
    <div class="dropdown-menu">
      <div class="dropdown-content">
        <div
          class="dropdown-item"
          v-for="item in items"
          :key="item[stringPropSpecifier] || item.owner.username"
          @click="itemSelected(item)"
        >
          {{ item[stringPropSpecifier] || item.owner.username }}
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
      type: String,
      default: ""
    },
    firstItem: {
      type: String,
      default: ""
    },
    items: {
      type: [Array]
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
    },
    stringPropSpecifier: {
      type: String,
      default: ""
    }
  },
  emits: ["itemSelected"],
  setup: (props, context) => {
    const dropdownClass = ref("");
    const hasItems = () => {
      if (props.items) {
        if (props.items.length > 0) {
          return true;
        }
      }
      return false;
    };
    const toggleDropdown = () => {
      if (hasItems()) {
        dropdownClass.value =
          dropdownClass.value === "is-active" ? "" : "is-active";
      }
    };
    const itemSelected = (item: object) => {
      dropdownClass.value = "";
      context.emit("itemSelected", item);
    };
    return {
      toggleDropdown,
      dropdownClass,
      itemSelected,
      hasItems
    };
  }
});
export default dropdownComponent;
</script>

<style scoped src="./dropdown-styles.module.scss" lang="scss"></style>
