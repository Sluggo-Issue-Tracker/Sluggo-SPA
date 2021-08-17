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
    <div class="section" style="height:60vh;overflow:auto;">
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
            <th>Active Tags</th>
          </tr>
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
import TagEntry from "@/components/TagEntry.vue";
import { createTag, listTags } from "@/api/tags";
import { PaginatedList, TagRecord, WriteTagRecord } from "@/api/types";
import { wrapExceptions } from "@/methods";

export default defineComponent({
  components: { TagEntry },
  name: "Tags",
  props: {
    teamId: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const tagsList = ref({} as PaginatedList<TagRecord>);
    const listPage = ref(1);
    const newTag = ref({} as WriteTagRecord);
    const isValidTag = ref(true);

    const getTags = async () => {
      const [listTagResponse, listTagError] = await wrapExceptions(
        listTags,
        props.teamId,
        listPage.value
      );

      if (listTagError) {
        console.log(listTagError.message);
        return;
      }

      if (listTagResponse) {
        tagsList.value = listTagResponse;
      }
    };

    const createTags = async () => {
      const [, createTagError] = await wrapExceptions(
        createTag,
        newTag.value,
        props.teamId
      );

      if (createTagError) {
        alert(createTagError);
        return;
      }
    };

    const validateTag = async () => {
      isValidTag.value = Boolean(newTag.value.title.match("^[A-Za-z0-9]+$"));
    };

    onMounted(async () => {
      await getTags();
    });

    return {
      tagsList,
      listPage,
      getTags,
      newTag,
      createTags,
      isValidTag,
      validateTag
    };
  }
});
</script>
