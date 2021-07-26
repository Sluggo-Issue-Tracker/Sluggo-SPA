import { createApp } from "vue";
import store from "@/store";
import App from "./App.vue";
import router from "./router";
import "boxicons/css/boxicons.min.css";

require("@/assets/common.scss");

const app = createApp(App);

app
  .use(store.original)
  .use(router)
  .mount("#app");

app.config.errorHandler = async () => {
  await router.replace("/error");
};

