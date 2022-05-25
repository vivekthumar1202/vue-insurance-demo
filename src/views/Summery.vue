<template>
  <form>
    <div class="summery-info">
      <div class="box" v-if="$store.state.data.age <= 100">
        <h1>Summary</h1>
        <h2>{{ $store.state.data.name }}</h2>
        <h4>Name: {{ $store.state.data.name }}</h4>
        <h4>Age: {{ $store.state.data.age }}</h4>
        <h4>Where do you live: {{ $store.state.data.country.name }}</h4>
        <h4>
          Package: {{ capitalFirstLetter($store.state.data.insuranceType) }}
        </h4>
        <h4>
          Premium: {{ $store.state.data.finalPremiun }}
          {{ $store.state.data.country.currency }}
        </h4>
        <div class="btn-grp">
          <button type="button" @click="backPage()" class="back-btn">
            Back
          </button>
          <button type="button" @click="buyPage()" class="next-btn">Buy</button>
        </div>
      </div>
      <div class="box" v-if="$store.state.data.age > 100">
        <h1>Ooops</h1>
        <h5>
          Your age is over our accepted limit.<br />We are sorry but we cannot
          insure you now
        </h5>
        <button type="button" @click="errorPage()" class="ok-btn">Ok :(</button>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
@Options({})
export default class Summery extends Vue {
  public data: any = {
    name: "",
    age: "",
    insuranceType: "standard",
    country: {
      name: "Hong Kong",
      rate: 1,
      currency: "HKD",
    },
  };

  public mounted() {
    if (this.$store.state.data && this.$store.state.data.insuranceType) {
      this.data = this.$store.state.data;
    }
  }

  capitalFirstLetter(type: string) {
    return type.charAt(0).toUpperCase() + type.substring(1);
  }

  backPage() {
    this.$router.push("/calculate-insurance");
  }

  buyPage() {
    alert("Thank you for purchased!");
    this.$store.dispatch("updateData", {
      name: "",
      age: "",
      insuranceType: "",
      country: {},
      finalPremiun: 0,
    });
    this.$router.push("/");
  }

  errorPage() {
    this.$router.push("/");
  }
}
</script>

<style scoped lang="scss">
@import "./Summery.css";
</style>
