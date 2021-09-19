import { createApp } from "vue";
import store from "@/store";
import App from "./App.vue";
import router from "./router";
import "boxicons/css/boxicons.min.css";
import Oruga from "@oruga-ui/oruga-next";
import "@oruga-ui/oruga-next/dist/oruga.css";
import "@/assets/common.scss";

const app = createApp(App);

app
  .use(store.original)
  .use(router)
  .use(Oruga)
  .mount("#app");

app.config.errorHandler = async error => {
  // @ts-ignore
  if (error.response?.status === 401) {
    await router.replace("/login");
    return;
  }
  store.dispatch.doSetError(error);
  await router.replace("/error");
};
