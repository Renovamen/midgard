import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue")
  },
  {
    path: "/map",
    name: "map",
    component: () => import("@/views/Map.vue"),
    beforeEnter: (to, from, next) => {
      if (from.name !== "home") next({ name: "home" });
      else next();
    }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
