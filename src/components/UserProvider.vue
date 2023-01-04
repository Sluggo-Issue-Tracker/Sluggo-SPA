<template>
  <div v-if="authUser">
    <slot></slot>
  </div>
  <div v-if="!authUser">
    Loading...
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, provide, ref } from "vue";
import { getUser } from "@/api";
import { UserRecord, userKey } from "@/api/types";
import { LOGIN_REDIRECT } from "../../constants";
import axios from "axios";
import { wrapExceptions } from "@/methods";

export default defineComponent({
  setup: () => {
    const authUser = ref<undefined | UserRecord>();
    provide(userKey, authUser);
    onMounted(async () => {
      const [user, error] = await wrapExceptions(getUser);
      if (error || !user) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            window.location.replace(LOGIN_REDIRECT);
          }
        }
        return;
      }
      authUser.value = user;
    });

    return {
      authUser
    };
  }
});
</script>

<style scoped></style>
