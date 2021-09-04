<template>
  <div class="error-page">
    <div class="setting" v-if="isInDevMode == true"></div>
    <div class="error-message" v-else>Error, something went wrong!</div>
    <div class="pset">
      <p>Profile Settings</p>
    </div>
    <hr />
    <div class="emailtitle">
      <div class="email">
        <label class="label is-medium">Email Address</label>
        <textarea
          class="textarea is-medium"
          :placeholder="email"
          rows="1"
        ></textarea>
      </div>
      <div class="username">
        <label class="label is-medium">Username</label>
        <textarea class="textarea is medium" :placeholder="userName" rows="1" />
        </div>
    </div>
    <div class="firstRow">
      <div class="firstName">
        <label class="label is-medium">First Name</label>
        <textarea
          class="textarea is-medium"
          v-model="firstName"
          :placeholder="firstName"
          rows="1"
        ></textarea>
      </div>
      <div class="lastName">
        <label class="label is-medium">Last Name</label>
        <textarea
          class="textarea is-medium"
          v-model="lastName"
          :placeholder="lastName"
          rows="1"
        ></textarea>
      </div>
      <div class="pronouns">
        <label class="label is medium">Pronouns</label>
        <textarea
          class="textarea is medium"
          v-model="pronouns"
          :placeholder="pronouns"
          rows="2"
        />
      </div>
    </div>
    <div class="secondRow">
      <div class="bio">
        <label class="label is-large">Bio</label>
        <textarea
          class="textarea is-large"
          v-model="bio"
          placeholder="..."
        ></textarea>
      </div>
      <div class="tags"></div>
    </div>
    <div class="updateprofilebutton">
      <button class="button is-info is-outlined" @click="updateProfile">
        Update Profile
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import store from "@/store";
import { listMembersDepaginated, updateMember } from "@/api/members";
// import { MemberRecord, ReadTeamRecord } from "@/api/types";
import { getUsersTeams } from "@/api/teams";
import { listTags } from "@/api/tags";
import {
  TagRecord,
  MemberRecord,
  UserRecord,
  ReadTeamRecord
} from "@/api/types";
import EditableText from "@/components/TicketModal/components/EditableText/EditableText.vue";

export default defineComponent({
  name: "Settings",
  components: {
  },
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
        console.log(members.value[0]);
        email.value = members.value[0].owner.email;
        console.log(members.value[0]);
        firstName.value = members.value[0].owner.first_name;
        console.log(members.value[0]);
        lastName.value = members.value[0].owner.last_name;
        console.log(members.value[0]);
        userName.value = members.value[0].owner.username;
        console.log(lastName.value);
        console.log(userName.value);
        console.log(email.value);
        console.log(firstName.value);
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
