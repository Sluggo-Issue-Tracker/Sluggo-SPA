<template>
  <div class="editableText">
    <div v-if="!isEditing">
      <span class="text" @click="enableEditing">
        {{ ticketTitle }}
      </span>
    </div>
    <div v-if="isEditing" @focusout="disableEditing">
      <input
        v-model="tempText"
        class="input text-box"
        :style="{ 'background-color': color }"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
const editableTextComponent = defineComponent({
  name: "EditableText",
  props: {
    text: {
      type: String
    },
    color: {
      type: String
    }
  },
  directives: {
    focus: {
      mounted(el) {
        el.focus();
      }
    }
  },
  emits: ["startedEditing", "stoppedEditing", "saveText"],
  created() {
    window.addEventListener("keydown", e => {
      if (e.key == "Enter") {
        this.saveChanges();
      }
    });
  },
  setup: (props, context) => {
    const isEditing = ref(false);
    const ticketTitle = ref("Title");
    const tempText = ref("");
    const enableEditing = () => {
      isEditing.value = true;
      tempText.value = ticketTitle.value;
      context.emit("startedEditing");
    };
    const disableEditing = () => {
      isEditing.value = false;
      tempText.value = "";
      context.emit("stoppedEditing");
    };
    const saveChanges = () => {
      if (isEditing.value == true) {
        isEditing.value = false;
        ticketTitle.value = tempText.value;
        context.emit("stoppedEditing");
        context.emit("saveText", tempText.value);
      }
    };
    return {
      isEditing,
      ticketTitle,
      tempText,
      enableEditing,
      disableEditing,
      saveChanges
    };
  }
});
export default editableTextComponent;
</script>

<style scoped src="./editable-text-styles.module.scss" lang="scss"></style>
