<template>
  <div
    class="rowContainer"
    :style="{ backgroundColor: ticket.status?.color ?? '#EEEEEE' }"
  >
    <div class="cell">
      {{ ticket.title }}
    </div>
    <div class="cell">
      <Tag v-for="tag in ticket.tag_list" :tag="tag" :key="tag.object_uuid" />
    </div>
    <div class="cell">{{ ticket.created }}</div>
    <div class="cell">{{ ticket.status?.title ?? "No Status" }}</div>
    <div class="cell">
      <ProfileEmblem :name="ticket.assigned_user?.username ?? 'Unassigned'" />
      <span>{{ ticket.assigned_user?.username ?? "Unassigned" }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import ProfileEmblem from "@/components/ProfileEmblem";
import Tag from "@/components/Tag";
import { ReadTicketRecord } from "@/api/types";

export default defineComponent({
  name: "TicketRow",
  components: { ProfileEmblem, Tag },
  props: {
    ticket: {
      type: Object as PropType<ReadTicketRecord>,
      required: true
    }
  }
});
</script>

<style scoped src="../styles.module.scss" lang="scss"></style>
