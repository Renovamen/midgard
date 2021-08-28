import { createStore } from "vuex";

import hero from "./modules/hero";

export default createStore({
  modules: {
    hero
  },
  state: {
    UPDATE: 1
  },
  mutations: {
    UPDATE(state: any) {
      state.UPDATE = Math.random() + Date.now();
    }
  }
});
