import { createDirectStore } from "direct-vuex";
import { SignupDetails, LoginDetails, signup, login } from "@/api/auth";
import { TeamRecord, NewTeamRecord, postTeam } from "@/api/teams";
import { generateAxiosInstance } from "@/api/base";

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
    doSignup(ctxRaw, details: SignupDetails) {
      const context = rootActionContext(ctxRaw);
      const axios = generateAxiosInstance(context.state.token);

      signup(details, axios).then(key => {
        context.commit.setToken(key);
      });
    },
    doLogin(ctxRaw, details: LoginDetails) {
      const context = rootActionContext(ctxRaw);
      const axios = generateAxiosInstance(context.state.token);
      login(details, axios).then(key => {
        context.commit.setToken(key);
      });
    },
    doLogout(ctxRaw) {
      const context = rootActionContext(ctxRaw);
      context.commit.setToken(undefined);
    },
    doCreateTeam(ctxRaw, record: NewTeamRecord) {
      const context = rootActionContext(ctxRaw);
      const axios = generateAxiosInstance(context.state.token);

      postTeam(record, axios).then(response => {
        const record = response.data as TeamRecord;
        console.log(record);
      });
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
