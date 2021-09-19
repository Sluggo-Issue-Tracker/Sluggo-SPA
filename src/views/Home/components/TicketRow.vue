<template>
  <div class="rowContainer">
    <div class="titleCell">
      {{ ticket.title }}
    </div>
    <div class="textCell">
      <span
        class="statusContainer"
        :style="{ backgroundColor: statusColor, color: textColor }"
        >{{ ticket.status?.title ?? "No Status" }}</span
      >
    </div>
    <ProfileEmblem
      :name="ticket.assigned_user?.owner.username ?? 'Unassigned'"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import ProfileEmblem from "@/components/ProfileEmblem";
import { ReadTicketRecord } from "@/api/types";
import { textColorFromBackground } from "@/methods";

export default defineComponent({
  name: "TicketRow",
  components: { ProfileEmblem },
  props: {
    ticket: {
      type: Object as PropType<ReadTicketRecord>,
      required: true
    }
  },
  setup: props => {
    const statusColor = ref(props.ticket.status?.color ?? "#EEEEEEFF");
    const textColor = computed(() =>
      textColorFromBackground(statusColor.value)
    );
    return {
      textColor,
      statusColor
    };
  }
});
</script>

<style scoped src="../styles.module.scss" lang="scss"></style>
