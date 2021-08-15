<template>
  <div>
    <a
      :class="{ 'is-active': isSelected }"
      :onclick="() => {isOpen = !isOpen}"
    >
      {{ team.name }}
    </a>
    <ul v-if="isOpen">
      <li><a>Team</a></li>
      <li><a>Tickets</a></li>
      <li><a>Members</a></li>
      <li><a>Admin</a></li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import { ReadTeamRecord } from "@/api/types";

export default defineComponent({
  name: "TeamEntry",
  props: {
    team: {
      type: Object as PropType<ReadTeamRecord>,
      required: true
    },
    selectedView: {
      type: Object as PropType<[string, string, string]>,
      required: true
    }
  },
  setup: props => {
    const isSelected = computed<boolean>(
      () => parseInt(props.selectedView[1]) === props.team.id
    );

    const isOpen = ref<boolean>(false);

    return {
      isSelected,
      isOpen
    };
  }
});
</script>

<style scoped></style>
