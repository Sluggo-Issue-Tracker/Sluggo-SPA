<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content existing_modal">
      <section class="box ">
        <div class="field">
          <span class="subtitle">Tickets</span>
          <!-- <v-select
            class="ticket_chooser"
            placeholder=""
            v-model="ticket"
            :options="options"
          ></v-select> -->
          <span class="has-text-danger">Field Required</span>
          <div>Select an existing ticket</div>
        </div>
        <br />
        <br />
        <button class="button is-success">Save changes</button>
        <button class="button">Cancel</button>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const subticketChooserComponent = defineComponent({
  name: "SubticketChooserModal"
});

export default subticketChooserComponent;
</script>

<style scoped>
.ticket_chooser .vs__dropdown-menu {
  max-height: 100px;
}
.existing_modal {
  width: 640px;
}
</style>
