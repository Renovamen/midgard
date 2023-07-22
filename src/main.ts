import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router/auto";
import { createPinia } from "pinia";
import App from "~/App.vue";

import "@unocss/reset/tailwind.css";
import "~/styles/main.css";
import "uno.css";
import "animate.css/animate.min.css";

const app = createApp(App);

const pinia = createPinia();
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL)
});

router.beforeEach((to, from, next) => {
  if (to.path === "/map" && from.matched.length === 0) next({ path: "/" });
  else next();
});

app.use(router).use(pinia);
app.mount("#app");
