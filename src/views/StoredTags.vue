<template>
  <!-- Manage Tags -->
  <div>
    <!-- Top header as a level -->
    <nav class="level">
      <!-- Left side -->
      <div class="level-left">
        <div class="level-item">
          <p class="title">
            Manage Tags
          </p>
        </div>
      </div>

      <!-- Right side -->
      <div class="level-right">
        <div class="level-item">
          <div class="field has-addons">
            <p class="control">
              <input class="input" type="text" placeholder="Add a Tag" />
            </p>
            <p class="control">
              <button class="button is-info">
                Add
              </button>
            </p>
          </div>
        </div>
        <div class="level-item">
          <p class="has-text-danger">
            Tag cannot be blank
          </p>
          <p class="has-text-danger">
            Tags must be one word and alphanumeric.
          </p>
        </div>
      </div>
    </nav>

    <!-- Table to show tags -->
    <div class="section" style="height:60vh;overflow-x:auto;overflow:auto;">
      <table class="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>Tag</th>
            <th></th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input class="input" type="text" />
              <input readonly class="input is-static is-bold" type="text" />
            </td>
            <td>
              <div class="buttons">
                <button class="button is-warning">
                  <i class="bx bx-edit"></i>
                </button>
                <button class="button is-success">
                  Save
                </button>
                <button class="button is-warning">
                  Cancel
                </button>
              </div>
            </td>
            <td>
              <div class="buttons">
                <button class="button is-link">
                  Unapprove
                </button>
                <button class="button is-success">
                  Approve
                </button>

                <button class="button is-danger">
                  <i class="bx bx-trash"></i>
                </button>
              </div>
            </td>
          </tr>
          <thead>
            <tr>
              <th>Approved Tags</th>
            </tr>
          </thead>
          <tag-entry v-for="tag in tagsList.results" v-bind:key="tag.id" v-bind:tagId="tag.id" v-bind:teamId="teamId" v-bind:tagTitle="tag.title" v-on:update="getTags">
          </tag-entry>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { TeamRecord, getTeam } from "@/api/teams";
import { PaginatedList } from "@/api/base";
import TagEntry from "./TagEntry.vue";
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
  components: { TagEntry },
  name: "Tags",
  props: {
    teamId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const teamRecord = ref({} as TeamRecord);
    const tagsList = ref({} as PaginatedList<TagRecord>);
    const listPage = ref(1);
    const tagRecord = ref({} as TagRecord);

    const getTeamRecord = async () => {
      const axiosInstance = store.getters.generateAxiosInstance;
      const teamId = parseInt(props.teamId);
      const team = await getTeam(axiosInstance, teamId);
      if (team) {
        teamRecord.value = team;
      }
    };

    const getTags = async () => {
      const axiosInstance = store.getters.generateAxiosInstance;
      const team = teamRecord.value;
      if (team) {
        tagsList.value = await listTag(
          teamRecord.value,
          listPage.value,
          axiosInstance
        );
        console.log(tagsList.value);
      }
    };

    onMounted(async () => {
      await getTeamRecord();
      await getTags();
    });

    return {
      teamRecord,
      tagsList,
      listPage,
      getTags,
      getTeamRecord,
    };
  },
});
</script>
