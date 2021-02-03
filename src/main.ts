import { createApp } from "vue";
import store from "@/store";
import App from "./App.vue";
import router from "./router";
// import { store, key } from "./store";

require("@/assets/common.scss");

createApp(App)
  .use(store.original)
  .use(router)
  .mount("#app");
