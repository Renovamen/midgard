import Vue from 'vue'
import VueRouter from "vue-router";

import Home from './components/home.vue'
import Map from './components/map.vue'

Vue.use(VueRouter)

const routes = [
  { 
    path: '/', 
    name: 'home',
    component: Home
  },
  {
    path: '/map',
    name: 'map',
    component: Map
  }
]

const router = new VueRouter({
  routes,
})

router.beforeEach((to, from, next) => {
  // if(from.path === to.path){
  //   location.reload();
  // }
  next();
});

export default router;
