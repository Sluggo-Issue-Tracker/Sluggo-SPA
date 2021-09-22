<template v-if="isFetched">
  <div class="columns">
    <div class="column">
      <nav class="navbar is-transparent">
        <div class="navbar-brand">
          <a class="navbar-item navbarTitle" :onclick="handleBrandClicked">
            <IconSluggo :height="50" :width="50" />
            <span class="title">SLUGGO</span>
          </a>
          <div
            class="navbar-burger"
            data-target="navbarExampleTransparentExample"
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div id="navbarExampleTransparentExample" class="navbar-menu">
          <div class="navbar-start">
            <a class="navbar-item" href="http://localhost:8080/">
              <span class="icon-text">
                <span class="icon">
                  <i class="bx bx-home-alt" data-v-78f65145=""> </i>
                </span>
                <span>Home</span>
              </span>
            </a>
          </div>
        </div>
      </nav>
    </div>
  </div>
  <div class="columns">
    <div class="rightSide">
      <div class="column">
        <div class="columns">
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
        </div>
        <div class="columns">
          <div class="column">
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
        <div class="column">
          <div class="pronouns">
            <label class="label is medium">Pronouns</label>
            <textarea
              class="textarea is medium"
              :placeholder="pronouns"
              rows="1"
            />
          </div>
        </div>
        <div class="column">
          <div class="bio">
            <label class="label is-medium">Bio</label>
            <textarea
              class="textarea is-large"
              :placeholder="bio"
              rows="5"
            ></textarea>
          </div>
        </div>
        <div class="column">
          <div class="updateprofilebutton">
            <button class="button is-info" @click="updateProfile">
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="column">
      <div class="logo">
        <IconSluggo :height="400" :width="400" />
      </div>
      <div class="column">
        <p class="bd-notification is-danger">TAGS HERE</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import store from "@/store";
import { listMembersDepaginated, updateMember } from "@/api/members";
import { getUsersTeams } from "@/api/teams";
import { listTags } from "@/api/tags";
import IconSluggo from "@/assets/IconSluggo";
import {
  TagRecord,
  MemberRecord,
  UserRecord,
  ReadTeamRecord
} from "@/api/types";
import { DateTime } from "luxon";
import { defineActions } from "direct-vuex";

export default defineComponent({
  name: "Settings",
  components: {
    IconSluggo
  },

  setup() {
    const isInDevMode =
      process.env.NODE_ENV == "test" || process.env.NODE_ENV == "development"
        ? true
        : false;
    const members = ref(Array<MemberRecord>());
    const email = ref("");
    const pronouns = ref("");
    const val = ref({} as MemberRecord);
    const id = ref("");
    const owner = ref({} as UserRecord);
    const teamId = ref(1);
    const firstName = ref("");
    const bio = ref("");
    const lastName = ref("");
    const userName = ref("");
    const objectUuid = ref("");
    const role = ref("");
    const created = ref({} as DateTime);
    const activated = ref({} as DateTime);
    const deactivated = ref({} as DateTime);
    const isFetched = ref(false);
    const updateProfile = async () => {
      val.value.bio = bio.value;
      val.value.pronouns = pronouns.value;
      // eslint-disable-next-line @typescript-eslint/camelcase
      val.value.team_id = teamId.value;
      val.value.id = id.value;
      val.value.pronouns = pronouns.value;
      val.value.owner = owner.value;
      // eslint-disable-next-line @typescript-eslint/camelcase
      val.value.object_uuid = objectUuid.value;
      val.value.role = role.value;
      val.value.created = created.value;
      val.value.activated = activated.value;
      val.value.deactivated = deactivated.value;
      await updateMember(val.value);
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
        isFetched.value = true;
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
      lastName,
      isFetched
    };
  }
});
</script>
<style src="./settings.scss" lang="scss"></style>
