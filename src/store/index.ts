import { createDirectStore } from "direct-vuex";
import { SignupDetails, LoginDetails, signup, login } from "@/api/auth";

interface RootStoreState {
  token?: string;
}

const {
  store,
  rootActionContext,
  moduleActionContext,
  rootGetterContext,
  moduleGetterContext
} = createDirectStore({
  state: {
    token: undefined
  } as RootStoreState,
  mutations: {
    setToken(state, newToken: string | undefined) {
      state.token = newToken;
    }
  },
  actions: {
    doSignup(context, details: SignupDetails) {
      signup(details).then(key => {
        rootActionContext(context).commit.setToken(key);
      });
    },
    doLogin(context, details: LoginDetails) {
      login(details).then(key => {
        rootActionContext(context).commit.setToken(key);
      });
    },
    doLogout(context) {
      rootActionContext(context).commit.setToken(undefined);
    }
  },
  modules: {},
  getters: {}
});

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
