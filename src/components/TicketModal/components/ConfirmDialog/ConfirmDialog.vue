<template>
  <div class="confirm-dialog">
    <div class="message is-danger">
      <div class="message-header">
        <p>Delete Ticket</p>
      </div>
      <div class="message-body">
        <p>Are you sure you want to delete this ticket?</p>
        <br />
        <p>This action cannot be undone</p>
      </div>
      <div class="confirm-footer">
        <button class="button is-danger">
          Delete Ticket
        </button>
        <button class="button">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
const confirmDialogComponent = defineComponent({
  name: "ConfirmDialog",
  setup: () => {
    const title = ref("");
    const message = ref("Test Message");
    const confirmText = ref("Confirm");
    const cancelText = ref("Cancel");
    return {
      title,
      message,
      confirmText,
      cancelText
    };
  }
});
export default confirmDialogComponent;
</script>

<style scoped src="./confirm-dialog-styles.module.scss" lang="scss"></style>