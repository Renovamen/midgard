// css libraries
import 'normalize.css/normalize.css'
import 'animate.css/animate.min.css'

// public styles
import './styles/main.stylus'
import './styles/dialog-modal.stylus'

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