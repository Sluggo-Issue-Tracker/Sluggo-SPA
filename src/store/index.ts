import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";

// Typed interface to store
export interface State {
  count: number;
}

// Unique key for store injection; used to load store from global
// state
export const key: InjectionKey<Store<State>> = Symbol();

// The store itself, with default values.
export const store = createStore<State>({
  state: {
    count: 0 // for testing only
  },
  mutations: {},
  actions: {},
  modules: {}
});
