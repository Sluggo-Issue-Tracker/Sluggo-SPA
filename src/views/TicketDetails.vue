<template>
  <ticket-modal></ticket-modal>
  <add-subticket-modal></add-subticket-modal>
  <section class="section">
    <div class="container">
      <div class="level">
        <div class="level-left">
          <div class="level-item" style="word-wrap: break-word">
            <span class="title" style="max-width: 500px; word-wrap: break-word">
              Title #ID
            </span>
          </div>
          <div class="level-item">
            <span class="tag">
              Ticket Status
            </span>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <span>
              <i class="fa fa-star"></i>
              <i class="fa fa-star-o"></i>
            </span>
          </div>
          <div class="level-item">
            <button class="button is-success">Edit</button>
          </div>
          <div class="level-item">
            <a>Cancel</a>
          </div>
          <div class="level-item">
            <button class="button is-success">Save Changes</button>
          </div>
        </div>
      </div>
      <section style="border-bottom: darkgray 1px solid;"></section>
    </div>
  </section>
  <section class="section">
    <div class="container">
      <div class="columns has-background-light">
        <div class="column is-three-quarters">
          <div class="box">
            <div
              class="columns"
              style="border-bottom: darkgray 1px solid; padding-bottom: 10px;"
            >
              <div class="column is-half">
                <span class="subtitle">Tags</span>
                <!-- <v-select class="has-background-white" v-if="!edit" multiple placeholder="Tags"
                                         disabled
                                         v-model="selected_tags"
                                         :options="tag_options"></v-select>
                               <v-select class="has-background-white" v-if="edit" multiple placeholder="Tags"
                                         v-model="selected_tags"
                                         :options="tag_options"></v-select> -->
              </div>
              <div class="column">
                <span class="subtitle">Due Date</span>
                <div>No Date Selected</div>
                <div class="field">
                  <input
                    class="input"
                    type="date"
                    placeholder="mm / dd / yyyy"
                  />
                  <span class="has-text-danger">Invalid Format</span>
                </div>
              </div>
            </div>
            <span class="subtitle">Description</span>
            <div style="padding-bottom: 10px; word-wrap: break-word;"></div>
            <textarea class="textarea"></textarea>
            <span class="has-text-danger">Field must be Alphanumeric</span>
          </div>
        </div>
        <div class="column">
          <div style="border-bottom: darkgray 1px solid">
            <div class="level">
              <div class="level-left">
                <div class="level-item"><span>Completion</span></div>
              </div>
            </div>
            <progress class="progress" max="1"></progress>
            <br />
          </div>
          <br />
          <div style="border-bottom: darkgray 1px solid">
            <div class="level">
              <div class="level-left">
                <div class="level-item"><span>Progress</span></div>
              </div>
            </div>
            <p class="is-size-6 has-text-centered">
              <!-- <v-select class="has-background-white" :clearable="false" v-model="current_status" :options="status_strings" v-on:input="change_status"></v-select> -->
            </p>
            <br />
          </div>
          <br />

          <div style="border-bottom: darkgray 1px solid">
            <div class="level">
              <div class="level-left">
                <div class="level-item">
                  Assignee
                </div>
              </div>
            </div>
            <v-select class="has-background-white"></v-select>
            <br />
          </div>
          <br />

          <div style="border-bottom: darkgray 1px solid">
            <div class="level">
              <div class="level-left">
                <div class="level-item"><span>Subtickets</span></div>
              </div>
              <div class="level-right">
                <div class="level-item">
                  <div class="dropdown is-active is-right">
                    <div class="dropdown-trigger">
                      <span><i class="fa fa-ellipsis-h"></i></span>
                    </div>
                    <div class="dropdown-menu">
                      <div class="dropdown-content">
                        <div class="dropdown-item">Add existing</div>
                        <div class="dropdown-item">Add new</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style="padding-bottom: 10px;">
              <div
                class="box has-background-white is-size-6 is-fullwidth has-text-left"
              >
                Ticket Title #ID
              </div>
            </div>
            <br />
          </div>
          <br />
          <div class="level">
            <span class="level-left">
              <span class="level-item">
                <a class="has-text-danger">
                  Delete Ticket
                </a>
                <button class="button is-danger">
                  Confirm
                </button>
              </span>
              <span class="level-item">
                <a>
                  Cancel
                </a>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Help",
  setup: function() {


    return {
    };
  }
});
</script>
