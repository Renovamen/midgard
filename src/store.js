import Vue from 'vue'
import Vuex from 'vuex'

import HeroStore from './store/hero-store'
import MapStore from './store/map-store'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    HeroStore,
    MapStore
  },
  state: {
    UPDATE: 1
  },
  mutations: {
    UPDATE(state) {
      Vue.set(state,'UPDATE', Math.random() + Date.now())
    }
  }
})

export default store