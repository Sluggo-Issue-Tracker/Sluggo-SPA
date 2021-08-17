<template>
  <div class="editableText" ref="inputElement">
    <div v-if="!isEditing">
      <span class="text" @click="enableEditing">{{ placeholderText }}</span>
    </div>
    <div v-if="isEditing" @focusout="disableEditing">
      <input
        v-model="tempText"
        class="input text-box"
        v-bind:style="{ 'background-color': backgroundColor }"
        v-focus
      />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "EditableText",
  props: {
    placeholderText: {
      type: String,
      required: true
    },
    backgroundColor: {
      type: String,
      required: true
    }
  },
  emits: ["save", "isEditing", "isHiding"],
  created() {
    window.addEventListener("keydown", e => {
      if (e.key == "Enter") {
        this.saveChanges();
      }
    });
  },
  setup(props, context) {
    const ticketTitle = ref(null);
    const placeholderText = ref(props.placeholderText);
    const isEditing = ref(false);
    const tempText = ref("");
    const inputElement = ref(null);
    const enableEditing = () => {
      context.emit("isEditing");
      tempText.value = placeholderText.value;
      isEditing.value = true;
    };
    const disableEditing = () => {
      context.emit("isHiding");
      tempText.value = "";
      isEditing.value = false;
    };
    const saveChanges = () => {
      if (isEditing.value == true) {
        context.emit("save");
        placeholderText.value = tempText.value;
        isEditing.value = false;
      }
    };
    return {
      ticketTitle,
      enableEditing,
      disableEditing,
      saveChanges,
      tempText,
      inputElement,
      isEditing
    };
  }
});
</script>
<style scoped src="./styles.module.scss" lang="scss"></style>
