import { Vue } from "vue-class-component";

export default class CalculateMixin extends Vue {
  public calculateAmount(data: any) {
    if (data.age) {
      data.finalPremiun = 10 * data.age * data.country.rate;
      data.packagesPremiumSafe = Number((data.finalPremiun * 0.5).toFixed(2));
      data.packagesPremiumSuper = Number((data.finalPremiun * 0.75).toFixed(2));
      switch (data.insuranceType) {
        case "safe":
          data.finalPremiun = data.finalPremiun + data.packagesPremiumSafe;
          break;
        case "super":
          data.finalPremiun = data.finalPremiun + data.packagesPremiumSuper;
          break;
        default:
          break;
      }
      return data;
    } else {
      data.packagesPremiumSafe = 0;
      data.packagesPremiumSuper = 0;
      data.finalPremiun = 0;
      return data;
    }
  }
}
