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
      <div>
        <button v-if="!show" class="button is-link" @click="show = true">Edit</button>
        <div v-if="show" class="level">
          <div class="level-left">
            <input
              type="text"
              class="input level-item"
              v-model="newTitle"
              placeholder="Enter new title here"
              v-on:keyup.esc="reset"
            />
            <button class="level-item button is-link" @click="changeTitle"> Submit</button>
            <button class="level-item button is-link" @click="reset"> Cancel</button>
          </div>
        </div>
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
      type: String,
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
    const show = ref(false);
    const newTitle = ref("");
    console.log(tagId);

    const getTeamRecord = async () => {
      const axiosInstance = store.getters.generateAxiosInstance;
      const teamId = parseInt(props.teamId);
      const team = await getTeam(axiosInstance, teamId);
      if (team) {
        teamRecord.value = team;
      }
      console.log("hello");
    };

    const reset = () => {
      show.value = false;
      newTitle.value = "";
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

    const changeTitle = async () => {
      const axiosInstance = store.getters.generateAxiosInstance;
      console.log(newTitle);
      try {
        tagRecord.value = await getTag(tagId, teamRecord.value, axiosInstance);
        tagRecord.value.title = newTitle.value;
        await updateTag(tagRecord.value as TagRecord,
                        teamRecord.value, 
                        axiosInstance);
      }catch (error) {
        alert(error);
        return;
      }
      reset();
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
      show,
      changeTitle,
      tagRecord,
      newTitle,
      reset,
    };
  },
});
</script>
