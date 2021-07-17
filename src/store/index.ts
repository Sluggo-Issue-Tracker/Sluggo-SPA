import { createDirectStore } from "direct-vuex";
import { signup, login, getUser } from "@/api/auth";
import { getTeam } from "@/api/teams";
import { generateAxiosInstance } from "@/api/base";
import { AxiosInstance } from "axios";
import { LoginResponse } from "@/types";
import { LoginDetails, ReadTeamRecord, SignupDetails, UserRecord } from "@/api/types";

interface RootStoreState {
  token?: string;
  team?: ReadTeamRecord;
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
    setTeam(state, newTeam: ReadTeamRecord) {
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

      await signup(details, axios);
    },
    async doLogin(ctxRaw, details: LoginDetails) {
      const context = rootActionContext(ctxRaw);
      const axios = generateAxiosInstance(context.state.token);
      const { user } = await login(details, axios);
      context.commit.setUser(user);
    },
    async doSetTeam(ctxRaw, teamRecord: ReadTeamRecord) {
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
