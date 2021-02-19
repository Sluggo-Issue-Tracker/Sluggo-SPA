<template>
  <a @click.prevent="navigate()" href="#">
    <slot></slot>
  </a>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import store from "@/store";

const navbarPageLinkComponent = defineComponent({
  name: "NavbarPageLink",
  props: {
    destination: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const router = useRouter();

    const navigate = () => {
      // Get team record from store and verify
      const record = store.state.team;

      if (typeof record === "undefined") {
        console.warn(
          "Note: Team was not set when attempting to navigate to a team page. Navigating to /login instead."
        );

        router.push("/login");
        return;
      }

      router.push("/teams/" + record.id + "/" + props.destination);
    };

    return {
      navigate
    };
  }
});

export default navbarPageLinkComponent;
</script>
