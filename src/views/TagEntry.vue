<template>
  <tr>
    <td>
      {{ tagTitle }}
    </td>
    <td>
      <div class="buttons">
        <button class="button is-link" @click="remove">
          Remove
        </button>
      </div>
    </td>
  </tr>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { TeamRecord, getTeam } from "@/api/teams";
import { PaginatedList } from "@/api/base";
import {
  createTagRecord,
  createTag,
  updateTag,
  getTag,
  listTag,
  deleteTag,
  TagRecord,
} from "@/api/tags";
import store from "@/store";
export default defineComponent({
  name: "DeleteTag",
  props: {
    teamId: {
      type: String,
      required: true,
    },
    tagId: {
      type: Number,
      required: true,
    },
    tagTitle: {
      type: String,
      required: true,
    },
  },

  emits: ["update"],

  setup(props, context) {
    const teamRecord = ref({} as TeamRecord);
    const tagsList = ref({} as PaginatedList<TagRecord>);
    const listPage = ref(1);
    const tagRecord = ref({} as TagRecord);
    const tagId = parseInt(props.tagId);

    const getTeamRecord = async () => {
      const axiosInstance = store.getters.generateAxiosInstance;
      const teamId = parseInt(props.teamId);
      const team = await getTeam(axiosInstance, teamId);
      if (team) {
        teamRecord.value = team;
      }
      console.log("hello");
    };

    const remove = async () => {
      const axiosInstance = store.getters.generateAxiosInstance;
      try {
        tagRecord.value = await getTag(tagId, teamRecord.value, axiosInstance);
        await deleteTag(
          tagRecord.value as TagRecord,
          teamRecord.value,
          axiosInstance
        );
      } catch (error) {
        alert(error);
        return;
      }
      context.emit("update");
    };

    onMounted(async () => {
      await getTeamRecord();
    });

    return {
      teamRecord,
      tagsList,
      listPage,
      getTeamRecord,
      remove,
    };
  },
});
</script>
