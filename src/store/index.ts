import { createDirectStore } from "direct-vuex";
import { SignupDetails, LoginDetails, signup, login, UserRecord, getUser } from "@/api/auth";
import { TeamRecord, getTeam } from "@/api/teams";
import { generateAxiosInstance } from "@/api/base";
import { AxiosInstance } from "axios";

interface RootStoreState {
  token?: string;
  team?: TeamRecord;
  user?: UserRecord;
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
      if (newToken) {
        localStorage.setItem('token', newToken);
      } else {
        localStorage.removeItem('token');
      }
    },
    setTeam(state, newTeam: TeamRecord) {
      state.team = newTeam;
    },
    setUser(state, newUser: UserRecord) {
      state.user = newUser;
    }
  },
  actions: {
    async doSignup(ctxRaw, details: SignupDetails) {
      const context = rootActionContext(ctxRaw);
      const axios = generateAxiosInstance(context.state.token);

      const key = await signup(details, axios);
      context.commit.setToken(key);
    },
    async doLogin(ctxRaw, details: LoginDetails) {
      const context = rootActionContext(ctxRaw);
      const axios = generateAxiosInstance(context.state.token);
      const key = await login(details, axios);

      context.dispatch.attempt(key);
    },
    async attempt(ctxRaw, key: string | null) { // validate the token by fetching the user record
      const context = rootActionContext(ctxRaw);

      let newKey = key ? key : undefined;
      context.commit.setToken(newKey);
      const axios = generateAxiosInstance(newKey);

      const user = await getUser(axios);
      context.commit.setUser(user); 
    },
    doLogout(ctxRaw) {
      const context = rootActionContext(ctxRaw);
      context.commit.setToken(undefined);
    },
    async doSetTeam(ctxRaw, teamRecord: TeamRecord) {
      const context = rootActionContext(ctxRaw);

      context.commit.setTeam(teamRecord);
    },
    async doFetchAndSetTeam(ctxRaw, teamId: number) {
      const context = rootActionContext(ctxRaw);
      const axios = generateAxiosInstance(context.state.token);

      const teamRecord = await getTeam(axios, teamId);
      await context.dispatch.doSetTeam(teamRecord);

      return teamRecord;
    }
  },
  modules: {},
  getters: {
    generateAxiosInstance(): AxiosInstance {
      return generateAxiosInstance(store.state.token);
    }
  }
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
