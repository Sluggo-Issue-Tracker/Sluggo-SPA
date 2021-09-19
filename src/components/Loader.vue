<template>
  <div
    :style="{
      width: `${width}px`,
      height: `${height}px`,
      border: `${borderWidth}px solid #f3f3f3`,
      'border-top': `${borderWidth}px solid #3498db`
    }"
    class="loader"
  />
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "Loader",
  props: {
    width: {
      type: Number,
      optional: true,
      default: 120
    },
    height: {
      type: Number,
      optional: true,
      default: 120
    }
  },
  setup: props => {
    const borderWidth = computed(() => props.width / 7.5);
    return {
      borderWidth
    };
  }
});
</script>

<style scoped>
.loader {
  border-radius: 50%;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
