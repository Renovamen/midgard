import { createStore } from "vuex";

import hero from "./modules/hero";
import map from "./modules/map";

export default createStore({
  modules: {
    hero,
    map
  }
});
