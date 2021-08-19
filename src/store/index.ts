import { createSluggoStore } from "@/store/createStore";

const {
  store,
  rootActionContext,
  moduleActionContext,
  rootGetterContext,
  moduleGetterContext
} = createSluggoStore();

export default store;

export {
  rootActionContext,
  moduleActionContext,
  rootGetterContext,
  moduleGetterContext
};

// Enable types in Store
export type SluggoStore = typeof store;
declare module "vuex" {
  interface Store<S> {
    direct: SluggoStore;
  }
}
