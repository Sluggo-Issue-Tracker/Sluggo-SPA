<template>
  <div class="editableText">
    <div v-if="!isEditing">
      <span class="text" @click="enableEditing">
        {{ title }}
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
      required: true
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
      if (e.key === "Enter") {
        this.saveChanges();
      }
    });
  },
  setup: (props, context) => {
    const isEditing = ref(false);
    const title = ref("");
    const tempText = ref("");
    const enableEditing = () => {
      isEditing.value = true;
      context.emit("startedEditing");
    };
    const saveChanges = () => {
      isEditing.value = false;
      if (tempText.value.match(/[A-Za-z]+/)) {
        title.value = tempText.value;
      }
      context.emit("stoppedEditing", title.value);
    };
    onMounted(() => {
      title.value = props.text;
    });
    return {
      isEditing,
      title,
      tempText,
      enableEditing,
      saveChanges
    };
  }
});
export default editableTextComponent;
</script>

<style scoped src="./editable-text-styles.module.scss" lang="scss"></style>
