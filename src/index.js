// css libraries
import 'normalize.css/normalize.css'
import 'animate.css/animate.min.css'

// public styles
import './styles/main'
import './styles/dialog'

// public js
import public_function from './js/public-function.js'

import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import filter from './filter'
import store from './store'

// components
import App from './App'
import Package from './components/Package'
import PackageItem from './components/PackageItem'

Vue.component('App', App)
Vue.component('Package', Package)
Vue.component('PackageItem', PackageItem)

Vue.config.errorHandler = function (err, vm) {
  console.warn(err,vm)
  router.replace('/')
}

const app = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')