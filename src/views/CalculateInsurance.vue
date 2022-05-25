<template>
  <form>
    <div class="calculate-info">
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
            <span
              >Safe (+{{ data.packagesPremiumSafe }}{{ data.country.currency }},
              50%)</span
            >
          </div>
          <div class="radio-btn">
            <input
              type="radio"
              name="insuranceType"
              value="super"
              @change="calculatePremium()"
              v-model="data.insuranceType"
            />
            <span
              >Super Safe (+{{ data.packagesPremiumSuper
              }}{{ data.country.currency }}, 75%)</span
            >
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
import { Options, mixins } from "vue-class-component";
import CalculateMixin from "@/mixins/Calculate";

export default class CalculateInsurance extends mixins(CalculateMixin) {
  finalPremiun = 0;
  isFormSubmitted = false;
  public countries: Array<object> = [
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
    packagesPremiumSafe: 0,
    packagesPremiumSuper: 0,
  };

  public mounted() {
    if (this.$store.state.data && this.$store.state.data.insuranceType) {
      this.data = this.$store.state.data;
      this.calculatePremium();
    }
  }

  public calculatePremium() {
    this.data = this.calculateAmount(this.data);
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
@import "./CalculateInsurance.css";
</style>
