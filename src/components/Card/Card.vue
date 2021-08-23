<template>
  <div class="cardContainer">
    <slot />
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Card"
});
</script>

<style scoped src="./styles.module.scss" lang="scss"></style>
