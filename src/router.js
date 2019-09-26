import Vue from 'vue'
import VueRouter from "vue-router";

import GameHome from './components/home.vue'
import GameMapActive from './components/map-active.vue'

Vue.use(VueRouter)

const routes = [
  { 
    path: '/', 
    name: 'home',
    component: GameHome
  },{
    path: '/map-active',
    name: 'mapActive',
    component: GameMapActive
  }
]

const router = new VueRouter({
  routes ,
})

router.beforeEach((to, from, next) => {
  // if(from.path === to.path){
  //   location.reload();
  // }
  next();
});

export default router;
