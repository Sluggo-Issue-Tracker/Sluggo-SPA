<template>
  <div class="pset">
    <p>Profile Settings</p>
    <div class="logo">
      <IconSluggo :height="50" :width="50" />
    </div>
    <hr />
    <div class="columns">
      <div class="column">
        <div class="email">
          <label class="label is-medium">Email</label>
          <textarea
            class="textarea is-medium"
            :placeholder="email"
            rows="1"
          ></textarea>
        </div>
      </div>
      <div class="column">
        <div class="username">
          <label class="label is-medium">Username</label>
          <textarea
            class="textarea is-medium"
            :placeholder="userName"
            rows="1"
          ></textarea>
        </div>
      </div>
      <div class="column is-half">
        <div class="bio">
          <label class="label is-medium">Bio</label>
          <textarea
            class="textarea is-large"
            :placeholder="bio"
            rows="5"
          ></textarea>
        </div>
      </div>
      <br />
      <div class="column">
        <div class="secondRow">
          <div class="firstName">
            <label class="label is-medium">First Name</label>
            <textarea
              class="textarea is-medium"
              :placeholder="firstName"
              rows="1"
            ></textarea>
          </div>
        </div>
        <div class="column">
          <div class="lastName">
            <label class="label is-medium">Last Name</label>
            <textarea
              class="textarea is-medium"
              :placeholder="lastName"
              rows="1"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
    <br />
    <div class="thirdRow">
      <div class="pronouns">
        <label class="label is medium">Pronouns</label>
        <textarea class="textarea is medium" :placeholder="pronouns" rows="1" />
      </div>
    </div>
    <div class="fourthRow">
      <div class="bio">
        <label class="label is-medium">Bio</label>
        <textarea
          class="textarea is-large"
          :placeholder="bio"
          rows="5"
        ></textarea>
      </div>
    </div>
    <div class="updateprofilebutton">
      <button class="button is-info is-outlined" @click="updateProfile">
        Update Profile
      </button>
    </div>
    <div class="tags"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import store from "@/store";
import { listMembersDepaginated, updateMember } from "@/api/members";
import { getUsersTeams } from "@/api/teams";
import { listTags } from "@/api/tags";
import {
  TagRecord,
  MemberRecord,
  UserRecord,
  ReadTeamRecord
} from "@/api/types";

export default defineComponent({
  name: "Settings",
  components: {},
  setup() {
    const isInDevMode =
      process.env.NODE_ENV == "test" || process.env.NODE_ENV == "development"
        ? true
        : false;
    const members = ref(Array<MemberRecord>());
    const email = ref("");
    const pronouns = ref("");
    const id = ref("");
    const teamId = ref(1);
    const firstName = ref("");
    const bio = ref("");
    const lastName = ref("");
    const userName = ref("");
    const updateProfile = async () => {
      await updateMember(email.value, pronouns.value, id.value, teamId.value);
    };

    onMounted(async () => {
      try {
        members.value = await listMembersDepaginated(1, 1);
        if (members.value[0].bio) {
          bio.value = members.value[0].bio;
        }
        if (members.value[0].pronouns) {
          pronouns.value = members.value[0].pronouns;
        }
        email.value = members.value[0].owner.email;
        firstName.value = members.value[0].owner.first_name;
        lastName.value = members.value[0].owner.last_name;
        userName.value = members.value[0].owner.username;
      } catch (error) {
        alert(error);
      }
    });
    return {
      email,
      isInDevMode,
      members,
      updateProfile,
      firstName,
      bio,
      pronouns,
      userName,
      lastName
    };
  }
});
</script>
<style src="./settings.scss" lang="scss"></style>
