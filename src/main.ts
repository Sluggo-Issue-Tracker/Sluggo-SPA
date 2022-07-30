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
  .use(Oruga, {
    button: {
      rootClass: "button",
      outlinedClass: () => {
        return "is-outlined"; // Outline class does not dependent on variants
      },
      disabledClass: "btn-disabled",
      variantClass: "is-"
    },
    select: {
      override: true,
      rootClass: (_: string, { props, computed }: any) => {
        const classes = ["control", "select"];
        if (props.size) classes.push(`is-${props.size}`);
        if (computed.rounded) classes.push("is-rounded");
        if (computed.statusVariant)
          classes.push(`is-${computed.statusVariant}`);
        if (props.multipe) classes.push("is-multiple");
        if (props.icon) classes.push("has-icons-left");
        if (props.iconRight) classes.push("has-icons-right");
        return classes.join(" ").trim();
      },
      expandedClass: "is-fullwidth",
      iconLeftClass: "is-left",
      iconRightClass: "is-right",
      placeholderClass: "is-empty"
    },
    field: {
      groupedClass: "field--grouped",
      rootClass: "field",
      labelClass: "label",
      messageClass: "form-text",
      variantClass: "field-"
    },
    input: {
      inputClass: "input",
      variantClass: "is-",
      iconRightClass: "input-icon-right"
    },
    icon: {
      variantClass: "input-icon-"
    },
    dropdown: {
      rootClass: "dropdown is-active",
      itemClass: "dropdown-item",
      itemActiveClass: "is-div-active"
    },
    steps: {
      itemHeaderActiveClass: "steps-nav-item-active",
      itemHeaderPreviousClass: "steps-nav-item-previous",
      stepMarkerClass: "step-marker",
      stepDividerClass: "step-divider"
    },
    checkbox: {
      override: true,
      rootClass: "checkbox",
      labelClass: "checkbox-label"
    }
  })
  .mount("#app");

app.config.errorHandler = async error => {
  store.dispatch.doSetError(error);
  await router.replace("/error");
};
