<template>
  <div class="home">
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

<style scoped lang="scss">
.home {
  display: flex;
  justify-content: center;
  margin-top: 60px;
  .box {
    background-color: #8080801a;
    width: 560px;
    display: flex;
    height: 280px;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    gap: 20px;

    h1 {
      margin-bottom: 0;
    }
    .subtitle-text {
      font-size: 14px;
      font-weight: normal;
    }
    .start-btn {
      width: 134px;
      height: 36px;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      outline: none;
      background: black;
      color: white;
    }
  }
}
</style>
