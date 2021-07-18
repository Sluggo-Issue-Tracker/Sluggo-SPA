import { createDirectStore } from "direct-vuex";
import { signup, login, logoutUser } from "@/api/auth";
import { getTeam } from "@/api/teams";
import {
  LoginDetails,
  ReadTeamRecord,
  SignupDetails,
  UserRecord
} from "@/api/types";

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
    setTeam(state, newTeam?: ReadTeamRecord) {
      state.team = newTeam;
    },
    setUser(state, newUser?: UserRecord) {
      state.user = newUser;
    }
  },
  actions: {
    doSignup: async (ctxRaw, details: SignupDetails) => {
      const context = rootActionContext(ctxRaw);
      const {
        data: { user }
      } = await signup(details);
      context.commit.setUser(user);
    },
    doLogin: async (ctxRaw, details: LoginDetails) => {
      const context = rootActionContext(ctxRaw);
      const {
        data: { user }
      } = await login(details);
      context.commit.setUser(user);
    },
    doLogout: async ctxRaw => {
      const context = rootActionContext(ctxRaw);
      await logoutUser();
      context.commit.setUser(undefined);
    },
    doSetTeam: async (ctxRaw, teamRecord: ReadTeamRecord) => {
      const context = rootActionContext(ctxRaw);

      context.commit.setTeam(teamRecord);
    },
    doFetchAndSetTeam: async (ctxRaw, teamId: number) => {
      const context = rootActionContext(ctxRaw);
      const { data } = await getTeam(teamId);

      await context.dispatch.doSetTeam(data);
      return data;
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
