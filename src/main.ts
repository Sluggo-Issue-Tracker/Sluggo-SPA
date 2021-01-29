import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store, key } from "./store";

require("@/assets/common.scss");

createApp(App)
  .use(store, key)
  .use(router)
  .mount("#app");
