<template>
  <div class="mainHomeContainer">
    <div class="centerView">
      <section class="homepageMessage">
        <h1>Hey, {{ $store.getters.authUser.username }}</h1>
        <p>
          It's date. Here's you're overview:
        </p>
        <p>
          Thanks for using Sluggo! Every day we're working towards new features
          so stay tuned for new releases!
        </p>
      </section>
      <section class="ticketsSection">
        <Card>
          <h3>Assigned to You</h3>
        </Card>
        <Card>
          <h3>Pinned Tickets</h3>
        </Card>
      </section>
    </div>
    <div class="sideView">
      <Card>
        <h3>Quick Add</h3>
      </Card>
      <Card>
        <h3>Recent Updates</h3>
      </Card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Card from "@/components/Card";

export default defineComponent({
  name: "Home",
  components: {
    Card
  }
});
</script>

<style src="./styles.module.scss" lang="scss" />
