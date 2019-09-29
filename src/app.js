// public css
require("./css/animate.css");
require("./css/main.css");
require("./css/dialog-modal.css");
require("normalize.css");

// require('babel-polyfill');

// public js
import public_function from './js/public-function.js';

import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import filter from './filter'
import store from './store'
// import axios from 'axios'

// components
import App from './components/App.vue'
import Package from './components/package.vue'
import ComponentItem from './components/component-item.vue'

Vue.component('App', App)
Vue.component('package', Package)
Vue.component('component-item', ComponentItem)

Vue.config.errorHandler = function (err, vm) {
  console.warn(err,vm);
  router.replace('/');
}

// Object.assign(axios.defaults,{
//   baseURL : 'http://127.0.0.1:8000',
// })

const app = new Vue({
  store,
  router,
  template: `<App/>`
}).$mount('#app')


