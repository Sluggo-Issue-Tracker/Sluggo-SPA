import { createApp } from "vue";
import store from "@/store";
import App from "./App.vue";
import router from "./router";
// import { store, key } from "./store";

require("@/assets/common.scss");

store.dispatch.attempt(localStorage.getItem('token'));

createApp(App)
  .use(store.original)
  .use(router)
  .mount("#app");
