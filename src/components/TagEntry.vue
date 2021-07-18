<template>
  <tr>
    <td>
      {{ tagTitle }}
    </td>
    <td>
      <div class="level-right">
        <button class="button is-link" @click="remove">
          Remove
        </button>
      </div>
    </td>
    <td>
      <div>
        <button v-if="!show" class="button is-link" @click="show = true">
          Edit
        </button>
        <div v-if="show" class="level">
          <div class="level-left">
            <input
              type="text"
              class="input level-item"
              v-model="newTitle"
              placeholder="Enter new title here"
              v-on:keyup.esc="reset"
            />
            <button class="level-item button is-link" @click="changeTitle">
              Submit
            </button>
            <button class="level-item button is-link" @click="reset">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </td>
  </tr>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { updateTag, deleteTag } from "@/api/tags";
import { PaginatedList, TagRecord } from "@/api/types";
import { wrapExceptions } from "@/methods";

export default defineComponent({
  name: "DeleteTag",
  props: {
    teamId: {
      type: Number,
      required: true
    },
    tagId: {
      type: Number,
      required: true
    },
    tagTitle: {
      type: String,
      required: true
    }
  },

  emits: ["update"],

  setup: function(props, context) {
    const tagsList = ref({} as PaginatedList<TagRecord>);
    const listPage = ref(1);
    const tagRecord = ref({} as TagRecord);
    const show = ref(false);
    const newTitle = ref("");

    const reset = () => {
      show.value = false;
      newTitle.value = "";
    };

    const remove = async () => {
      const [, deleteError] = await wrapExceptions(
        deleteTag,
        tagRecord.value,
        props.teamId
      );

      if (deleteError) {
        console.log(deleteError.message);
        return;
      }

      context.emit("update");
    };

    const changeTitle = async () => {
      console.log(newTitle);
      tagRecord.value.title = newTitle.value;
      const [, updateErrors] = await wrapExceptions(
        updateTag,
        tagRecord.value,
        props.teamId
      );

      if (updateErrors) {
        console.log(updateErrors);
        return;
      }

      reset();
      context.emit("update");
    };

    return {
      tagsList,
      listPage,
      remove,
      show,
      changeTitle,
      tagRecord,
      newTitle,
      reset
    };
  }
});
</script>
