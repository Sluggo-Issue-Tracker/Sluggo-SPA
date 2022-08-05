import { createApp } from "vue";
import store from "@/store";
import { getUser } from "./api";
import { userKey } from "./api/types";
import App from "./App.vue";
import router from "./router";
import "boxicons/css/boxicons.min.css";
import Oruga from "@oruga-ui/oruga-next";
import { bulmaConfig } from "@oruga-ui/theme-bulma";
import "@oruga-ui/oruga-next/dist/oruga.css";
import "@/assets/common.scss";
import { LOGIN_REDIRECT } from "constants";
import { wrapExceptions } from "./methods";

(async () => {
  const app = createApp(App);

  app
    .use(store.original)
    .use(router)
    .use(Oruga, bulmaConfig)
    .mount("#app");

  app.config.errorHandler = async error => {
    // @ts-ignore
    alert(error.message);
  };
})();
