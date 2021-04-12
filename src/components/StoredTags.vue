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
        <div class="level-item" v-if="!isValidTag">
          <p class="has-text-danger">
            Tag must be non-empty, one word, and alphanumeric.
          </p>
        </div>
        <div class="level-item">
          <div class="field has-addons">
            <p class="control">
              <input
                class="input"
                type="text"
                placeholder="Add a Tag"
                v-model="newTag.title"
                v-on:input="validateTag"
              />
            </p>
            <p class="control">
              <button class="button is-info" @click="createTags">
                Add
              </button>
            </p>
          </div>
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
          <thead>
            <tr>
              <th>Active Tags</th>
            </tr>
          </thead>
          <tag-entry
            v-for="tag in tagsList.results"
            v-bind:key="tag.id"
            v-bind:tagId="tag.id"
            v-bind:teamId="teamId"
            v-bind:tagTitle="tag.title"
            v-on:update="getTags"
          >
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
import TagEntry from "@/components/TagEntry.vue";
import { createTag, listTag, TagRecord, WriteTagRecord } from "@/api/tags";
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
    const newTag = ref({} as WriteTagRecord);
    const isValidTag = ref(true);

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

    const createTags = async () => {
      const axiosInstance = store.getters.generateAxiosInstance;
      const team = teamRecord.value;
      if (team) {
        try {
          await createTag(newTag.value, teamRecord.value, axiosInstance);
          await getTags();
        } catch (error) {
          alert(error);
          return;
        }
      }
    };

    const validateTag = async () => {
      if (newTag.value.title.match("^[A-Za-z0-9]+$")) {
        isValidTag.value = true;
      } else {
        isValidTag.value = false;
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
      newTag,
      createTags,
      isValidTag,
      validateTag,
    };
  },
});
</script>