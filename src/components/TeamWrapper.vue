<template>
  <Suspense>
    <template #default>
      <router-view />
    </template>
    <template #fallback>
      <p>Loading...</p>
    </template>
  </Suspense>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const teamWrapperComponent = defineComponent({
  name: "TeamWrapper"
});

export default teamWrapperComponent;
</script>
