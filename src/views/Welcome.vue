<template>
  <div class="welcome-home">
    <div class="box">
      <h1>Hello There!</h1>
      <div class="subtitle-text">
        Let's buy some insurance. It is going to take only a few steps
      </div>
      <button @click="nextPage()" class="start-btn">Start</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class WelcomeView extends Vue {
  nextPage() {
    this.$router.push("/calculate-insurance");
  }
}
</script>

<style scoped>
@import "./Welcome.css";
</style>
