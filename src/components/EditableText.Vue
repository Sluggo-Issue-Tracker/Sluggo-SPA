<template>
  <div v-if="!isEditing">
    <span class="text" @click="enableEditing">{{ placeholderText }}</span>
  </div>
  <div v-if="isEditing">
    <input v-model="tempText" class="input" />
    <button @click="disableEditing">Cancel</button>
    <button @click="saveChanges">Save</button>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
const editableTextComponent = defineComponent({
  name: "EditableText",
  props: {
    placeholderText: {
      type: String,
      required: true
    }
  },
  emits: ["save"],
  setup(props, context) {
    const placeholderText = ref(props.placeholderText);
    const isEditing = ref(false);
    const tempText = ref("");
    const enableEditing = () => {
      tempText.value = placeholderText.value;
      isEditing.value = true;
    };
    const disableEditing = () => {
      tempText.value = null;
      isEditing.value = false;
    };
    const saveChanges = () => {
      placeholderText.value = tempText.value;
      isEditing.value = false;
      context.emit("save");
    };
    return {
      enableEditing,
      disableEditing,
      saveChanges
    };
  }
});

export default editableTextComponent;
</script>
<style></style>
