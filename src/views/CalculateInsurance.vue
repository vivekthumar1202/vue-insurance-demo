<template>
  <form>
    <div class="info">
      <h1>Tell us about yourself {{ form }}</h1>
      <div class="form-control">
        <label>Name</label>
        <input
          placeholder="Enter Name"
          v-bind:class="{ error: !data.name && isFormSubmitted }"
          type="text"
          v-model="data.name"
          name="name"
          required
        />
      </div>
      <div class="form-control">
        <label>Age</label>
        <input
          placeholder="Enter Age"
          v-bind:class="{ error: !data.age && isFormSubmitted }"
          type="number"
          v-model="data.age"
          @input="calculatePremium()"
          name="age"
          required
        />
      </div>
      <div class="form-control">
        <label>Where do you live</label>
        <select v-model="data.country" @change="calculatePremium()">
          <option
            v-for="country in countries"
            :value="country"
            v-bind:key="country.currency"
          >
            {{ country.name }}
          </option>
        </select>
      </div>
      <div class="box">
        <div class="radio-grp">
          <div class="radio-btn">
            <input
              type="radio"
              name="insuranceType"
              value="standard"
              @change="calculatePremium()"
              v-model="data.insuranceType"
            />
            <span>Standard</span>
          </div>
          <div class="radio-btn">
            <input
              type="radio"
              name="insuranceType"
              value="safe"
              @change="calculatePremium()"
              v-model="data.insuranceType"
            />
            <span>Safe (50%)</span>
          </div>
          <div class="radio-btn">
            <input
              type="radio"
              name="insuranceType"
              value="super"
              @change="calculatePremium()"
              v-model="data.insuranceType"
            />
            <span>Super Safe(75%)</span>
          </div>
        </div>

        <h2>
          Your premium is: {{ data.finalPremiun }}{{ data.country.currency }}
        </h2>
        <div class="btn-grp">
          <button type="button" @click="backPage()" class="back-btn">
            Back
          </button>
          <button type="button" @click="nextPage" class="next-btn">Next</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
@Options({})
export default class CalculateInsurance extends Vue {
  finalPremiun = 0;
  isFormSubmitted = false;
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
    finalPremiun: 0,
  };

  public mounted() {
    if (this.$store.state.data && this.$store.state.data.insuranceType) {
      this.data = this.$store.state.data;
      this.calculatePremium();
    }
  }

  public calculatePremium() {
    this.isFormSubmitted = false;
    if (this.data.age) {
      switch (this.data.insuranceType) {
        case "standard":
          this.data.finalPremiun = 10 * this.data.age * this.data.country.rate;
          break;
        case "safe":
          this.data.finalPremiun =
            Number(
              (
                (10 * this.data.age * this.data.country.rate * 50) /
                100
              ).toFixed(2)
            ) +
            10 * this.data.age * this.data.country.rate;

          break;
        case "super":
          this.data.finalPremiun =
            Number(
              (
                (10 * this.data.age * this.data.country.rate * 75) /
                100
              ).toFixed(2)
            ) +
            10 * this.data.age * this.data.country.rate;

          break;
        default:
          break;
      }
    } else {
      this.data.finalPremiun = 0;
    }
  }

  backPage() {
    this.$store.dispatch("updateData", this.data);
    this.$router.push("/");
  }

  nextPage() {
    this.isFormSubmitted = true;
    if (this.data.age && this.data.name) {
      this.$store.dispatch("updateData", this.data);
      this.$router.push("/summery");
    }
  }
}
</script>

<style scoped lang="scss">
.info {
  .title {
    font-size: 26px;
    font-weight: bold;
  }
  display: flex;
  flex-flow: column;
  align-items: center;
  .form-control {
    display: flex;
    flex-flow: column;
    gap: 10px;
    margin-top: 20px;
    align-items: flex-start;
    label {
      font-size: 14px;
    }

    input {
      height: 30px;
      width: 186px;
    }

    select {
      width: 196px;
      height: 36px;
    }
  }
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

    .radio-grp {
      display: flex;
      gap: 20px;
      flex-flow: column;
      .radio-btn {
        display: flex;
        gap: 4px;
      }
    }

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
  }
  .error {
    border: 1px solid red;
  }
}
</style>
