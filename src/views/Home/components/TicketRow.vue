<template>
  <div
    class="rowContainer"
    :style="{ backgroundColor: statusColor, color: textColor }"
  >
    <div class="iconCell">{{ ticket.status?.title ?? "No Status" }}</div>
    <div class="titleCell">
      {{ ticket.title }}
    </div>
    <div class="cell tagContainer">
      <Tag v-for="tag in ticket.tag_list" :tag="tag" :key="tag.object_uuid" />
    </div>
    <div class="iconCell">
      <ProfileEmblem
        :name="ticket.assigned_user?.owner.username ?? 'Unassigned'"
      />
      <span>{{ ticket.assigned_user?.owner.username ?? "Unassigned" }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import ProfileEmblem from "@/components/ProfileEmblem";
import Tag from "@/components/Tag";
import { ReadTicketRecord } from "@/api/types";
import { textColorFromBackground } from "@/methods";

export default defineComponent({
  name: "TicketRow",
  components: { ProfileEmblem, Tag },
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
