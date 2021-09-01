<template>
  <div class="editableText">
    <div v-if="!isEditing">
      <span class="text" @click="enableEditing">
        {{ ticketTitle }}
      </span>
    </div>
    <div v-if="isEditing" @focusout="saveChanges">
      <input
        v-model="tempText"
        class="input text-box"
        :style="{ 'background-color': color }"
        v-focus
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
const editableTextComponent = defineComponent({
  name: "EditableText",
  props: {
    text: {
      type: String,
      required: true,
      default: ""
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
    const ticketTitle = ref("");
    const tempText = ref("");
    const enableEditing = () => {
      isEditing.value = true;
      tempText.value = "";
      context.emit("startedEditing");
    };
    const saveChanges = () => {
      if (isEditing.value == true) {
        isEditing.value = false;
        ticketTitle.value = tempText.value;
        if (!ticketTitle.value.match(/[A-Za-z]+/)) {
          ticketTitle.value = props.text;
        }
        context.emit("stoppedEditing", ticketTitle.value);
      }
    };
    onMounted(() => {
      ticketTitle.value = props.text;
    });
    return {
      isEditing,
      ticketTitle,
      tempText,
      enableEditing,
      saveChanges
    };
  }
});
export default editableTextComponent;
</script>

<style scoped src="./editable-text-styles.module.scss" lang="scss"></style>
