<template>
  <tr>
    <td>
      {{ tagName }}
    </td>
    <td>
      <div class="buttons">
        <button class="button is-link" @click="deleteTag">
          Unapprove
        </button>
      </div>
    </td>
  </tr>
</template>


<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  inject: ["deleteTag"],
  props: {
    tagName: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
});
</script>