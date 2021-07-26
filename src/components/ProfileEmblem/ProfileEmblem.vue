<template>
  <div class="simpleLevel">
    <div class="sizeMedium profileContainer">
      <span class="sizeMedium profile">{{ initials }}</span>
    </div>
    <span>{{ name }}</span>
  </div>
</template>

<script lang="ts">
import { computed } from "vue";

export default {
  name: "ProfileEmblem",
  props: {
    name: {
      type: String,
      required: true
    }
  },
  setup: props => {
    const initials = computed(() =>
      props.name
        .split(" ")
        .map((value: string) => value[0])
        .join("")
    );
    return {
      initials
    };
  }
};
</script>

<style src="./styles.module.scss" lang="scss"></style>
