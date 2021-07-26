import { createApp } from "vue";
import store from "@/store";
import App from "./App.vue";
import router from "./router";
import "boxicons/css/boxicons.min.css";

require("@/assets/common.scss");

createApp(App)
  .use(store.original)
  .use(router)
  .mount("#app");
