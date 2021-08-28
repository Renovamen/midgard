import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";

// css libraries
import "normalize.css/normalize.css";
import "animate.css/animate.min.css";

// public styles
import "@/styles/main.styl";
import "@/styles/dialog.styl";

// store
import store from "@/store";

createApp(App).use(router).use(store).mount("#app");
