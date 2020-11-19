// public css
require("./css/animate.css")
require("./css/main.css")
require("./css/dialog-modal.css")
require("normalize.css")

// public js
import public_function from './js/public-function.js'

import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import filter from './filter'
import store from './store'

// components
import App from './components/App.vue'
import Package from './components/package.vue'
import ComponentItem from './components/component-item.vue'

Vue.component('App', App)
Vue.component('package', Package)
Vue.component('component-item', ComponentItem)

Vue.config.errorHandler = function (err, vm) {
  console.warn(err,vm)
  router.replace('/')
}

const app = new Vue({
  store,
  router,
  template: `<App/>`
}).$mount('#app')