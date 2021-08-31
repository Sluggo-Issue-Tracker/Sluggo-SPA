<template>
  <div class="ticket-modal-footer">
    <button class="button is-success" @click="saveChanges">
      Save changes
    </button>
    <button class="button" @click="closeModal">Cancel</button>
    <button
      class="button is-danger"
      @click="confirmModalClass = 'is-active'"
      v-if="shouldShowDelete"
    >
      Delete
    </button>
  </div>
  <div class="modal" :class="confirmModalClass">
    <div class="modal-background"></div>
    <div class="modal-content">
      <ConfirmDialog @close="confirmModalClass = ''" @delete="closeModal" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import ConfirmDialog from "@/components/TicketModal/components/ConfirmDialog/ConfirmDialog.vue";
const footerComponent = defineComponent({
  name: "Footer",
  components: {
    ConfirmDialog
  },
  props: {
    shouldShowDelete: {
      type: Boolean,
      required: true
    }
  },
  emits: ["saveChanges", "closeModal"],
  setup: (props, context) => {
    const confirmModalClass = ref("");
    const saveChanges = () => {
      context.emit("saveChanges");
    };
    const closeModal = () => {
      context.emit("closeModal");
    };
    return {
      confirmModalClass,
      saveChanges,
      closeModal
    };
  }
});
export default footerComponent;
</script>

<style scoped src="./footer-styles.module.scss" lang="scss"></style>
