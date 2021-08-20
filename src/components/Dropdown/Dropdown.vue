<template>
  <div class="dropdown" :class="dropdownClass">
    <label class="dropdown-label">{{ label || "" }}</label>
    <div class="dropdown-trigger" @click="toggleDropdown">
      <button class="button ticket-tags is-fullwidth">
        <span>Mechanical, Topside</span>
        <span class="icon is-small">
          <i class="bx bx-chevron-down"></i>
        </span>
      </button>
    </div>
    <div class="dropdown-menu">
      <div class="dropdown-content">
        <div class="dropdown-item">
          Systems
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
    }
  },
  emits: ["close"],
  setup: () => {
    const dropdownClass = ref("");
    const toggleDropdown = () => {
      dropdownClass.value =
        dropdownClass.value == "is-active" ? "" : "is-active";
    };
    return {
      toggleDropdown,
      dropdownClass
    };
  }
});

export default dropdownComponent;
</script>

<style scoped src="./styles.module.scss" lang="scss"></style>
