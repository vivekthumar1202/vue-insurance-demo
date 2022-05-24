import { createStore } from "vuex";

export default createStore({
  state: {
    data: {
      name: "",
      age: "",
      insuranceType: "",
      country: {},
      finalPremiun: "",
    },
  },
  mutations: {
    setData(state, data: any): void {
      state.data = data;
    },
  },
  actions: {
    updateData({ commit }, data: any): void {
      commit("setData", data);
    },
  },
});
