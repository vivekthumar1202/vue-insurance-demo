<template>
  <form>
    <div class="info">
      <div class="box" v-if="$store.state.data.age <= 100">
        <h1>Summary</h1>
        <h2>{{ $store.state.data.name }}</h2>
        <h4>Name: {{ $store.state.data.name }}</h4>
        <h4>Age: {{ $store.state.data.age }}</h4>
        <h4>Where do you live: {{ $store.state.data.country.name }}</h4>
        <h4>Package: {{ $store.state.data.insuranceType }}</h4>
        <h4>Premium: {{ $store.state.data.finalPremiun }}</h4>
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
        <button type="button" @click="backPage()" class="ok-btn">Ok :(</button>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
@Options({})
export default class Summery extends Vue {
  finalPremiun = 0;
  private countries: Array<object> = [
    {
      name: "Hong Kong",
      rate: 1,
      currency: "HKD",
    },
    {
      name: "USA",
      rate: 2,
      currency: "USD",
    },
    {
      name: "Australia",
      rate: 3,
      currency: "AUD",
    },
  ];
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
      this.calculatePremium();
    }
  }

  public calculatePremium() {
    if (this.data.age) {
      switch (this.data.insuranceType) {
        case "standard":
          this.finalPremiun = 10 * this.data.age * this.data.country.rate;
          break;
        case "safe":
          if (this.data.country.currency === "HKD") {
            this.finalPremiun =
              10 * this.data.age * this.data.country.rate + 250;
          } else {
            this.finalPremiun =
              Number(
                (
                  (10 * this.data.age * this.data.country.rate * 50) /
                  100
                ).toFixed(2)
              ) +
              10 * this.data.age * this.data.country.rate;
          }
          break;
        case "super":
          if (this.data.country.currency === "HKD") {
            this.finalPremiun =
              10 * this.data.age * this.data.country.rate + 375;
          } else {
            this.finalPremiun =
              Number(
                (
                  (10 * this.data.age * this.data.country.rate * 75) /
                  100
                ).toFixed(2)
              ) +
              10 * this.data.age * this.data.country.rate;
          }
          break;
        default:
          break;
      }
    }
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
}
</script>

<style scoped lang="scss">
.info {
  h1 {
    margin-bottom: 0px;
  }
  h4,
  h5 {
    margin: 0px;
    font-weight: normal;
  }
  display: flex;
  flex-flow: column;
  align-items: center;
  .box {
    margin-top: 30px;
    background-color: #8080801a;
    width: 560px;
    display: flex;
    height: max-content;
    padding: 30px 0px;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    gap: 20px;

    .btn-grp {
      display: flex;
      gap: 10px;
      .back-btn {
        width: 134px;
        height: 36px;
        border-radius: 4px;
        font-size: 16px;
        outline: none;
        background: white;
        color: black;
      }
      .next-btn {
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
    .ok-btn {
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
