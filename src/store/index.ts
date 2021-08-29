import { createStore } from "vuex";

import hero from "./modules/hero";
import map from "./modules/map";

export default createStore({
  modules: {
    hero,
    map
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
