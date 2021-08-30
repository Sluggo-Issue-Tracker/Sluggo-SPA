<template>
  <div class="rowContainer" :style="{ backgroundColor: '#219653' }">
    <div class="cell">
      Develop the Homepage
    </div>
    <div class="cell">
      Develop the Homepage
    </div>
    <div class="cell">
      Develop the Homepage
    </div>
    <div class="cell">
      Develop the Homepage
    </div>
    <div class="cell">
      <ProfileEmblem name="Test" />
      <span>Test</span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import ProfileEmblem from "@/components/ProfileEmblem/ProfileEmblem";

export default defineComponent({
  name: "TicketRow",
  components: { ProfileEmblem }
});
</script>

<style scoped src="../styles.module.scss" lang="scss"></style>
