<template>
  <div data-testid="team-details-container">
    <a
      :class="{ 'is-active': isSelected, iconTitle: true }"
      :onclick="toggleOpen"
    >
      <i
        :class="{ 'bx bx-chevron-down': !isOpen, 'bx bx-chevron-up': isOpen }"
      />
      <span>{{ team.name }}</span>
    </a>
    <ul v-if="isOpen">
      <li>
        <router-link
          :class="{ 'is-active': Boolean(currentSubviewSelection['tickets']) }"
          :to="{ name: 'TeamsTickets', params: { id: team.id } }"
        >
          Tickets
        </router-link>
      </li>
      <li>
        <router-link
          :class="{ 'is-active': Boolean(currentSubviewSelection['members']) }"
          :to="{ name: 'TeamsMembers', params: { id: team.id } }"
        >
          Members
        </router-link>
      </li>
      <li>
        <router-link
          :class="{ 'is-active': Boolean(currentSubviewSelection['admin']) }"
          :to="{ name: 'TeamsAdmin', params: { id: team.id } }"
        >
          Admin
        </router-link>
      </li>
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

    // mark the subview as selected if the team is also selected
    const currentSubviewSelection = computed<{ [p: string]: boolean }>(() => ({
      [props.selectedView[2]]: isSelected.value
    }));

    const isOpen = ref<boolean>(false);

    const toggleOpen = () => {
      isOpen.value = !isOpen.value;
    };

    return {
      isSelected,
      isOpen,
      currentSubviewSelection,
      toggleOpen
    };
  }
});
</script>

<style scoped src="../styles.module.scss" lang="scss"></style>
