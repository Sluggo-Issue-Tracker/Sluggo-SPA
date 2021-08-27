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

app.config.errorHandler = async error => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  if (error.response?.status === 401) {
    await router.replace("/login");
    return;
  }
  store.dispatch.doSetError(error);
  await router.replace("/error");
};
