import { createDirectStore } from "direct-vuex";
import {
  SignupDetails,
  LoginDetails,
  signup,
  login,
  UserRecord,
  getUser
} from "@/api/auth";
import { getMemberForUser, MemberRecord } from "@/api/users";
import { TeamRecord, getTeam } from "@/api/teams";
import { generateAxiosInstance } from "@/api/base";
import { AxiosInstance } from "axios";

interface RootStoreState {
  token?: string;
  team?: TeamRecord;
  user?: UserRecord;
  member?: MemberRecord;
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
        localStorage.setItem("token", newToken);
      } else {
        localStorage.removeItem("token");
      }
    },
    setTeam(state, newTeam: TeamRecord | undefined) {
      state.team = newTeam;
    },
    setUser(state, newUser: UserRecord | undefined) {
      state.user = newUser;
    },
    setMember(state, newMember: MemberRecord | undefined) {
      state.member = newMember;
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
    async attempt(ctxRaw, key: string | null) {
      // validate the token by fetching the user record
      const context = rootActionContext(ctxRaw);

      const newKey = key ? key : undefined;
      context.commit.setToken(newKey);
      const axios = generateAxiosInstance(newKey);

      const user = await getUser(axios);
      context.commit.setUser(user);
    },
    doLogout(ctxRaw) {
      const context = rootActionContext(ctxRaw);
      context.commit.setToken(undefined);
    },
    async doFetchAndSetMember(ctxRaw) {
      const context = rootActionContext(ctxRaw);
      const axios = generateAxiosInstance(context.state.token);

      const team = context.state.team;
      const user = context.state.user;

      if (typeof team == "undefined") throw Error("Team is undefined.");
      if (typeof user == "undefined") throw Error("User is undefined");

      const member = await getMemberForUser(axios, team.id, user);

      context.commit.setMember(member);
      console.log(context.state.member);
    },
    async doSetTeam(ctxRaw, teamRecord: TeamRecord) {
      const context = rootActionContext(ctxRaw);

      const oldTeam = context.state.team;

      context.commit.setTeam(teamRecord);

      // Do set member once the team has switched
      try {
        await context.dispatch.doFetchAndSetMember();
      } catch (e) {
        // Failure, so make sure to set team back to null
        context.commit.setTeam(oldTeam);
      }
    },
    async doFetchAndSetTeam(ctxRaw, teamId: number) {
      const context = rootActionContext(ctxRaw);
      const axios = generateAxiosInstance(context.state.token);

      const teamRecord = await getTeam(axios, teamId);
      await context.dispatch.doSetTeam(teamRecord);

      return teamRecord;
    },
  },
  modules: {},
  getters: {
    generateAxiosInstance(): AxiosInstance {
      return generateAxiosInstance(store.state.token);
    },
    team(): TeamRecord {
      const team = store.state.team;
      if (typeof team === "undefined") {
        throw Error("Attempted to get undefined team from store");
      }

      return team;
    },
    member(): MemberRecord {
      const member = store.state.member;
      if (typeof member === "undefined") {
        throw Error("Attempted to get undefined member from store");
      }

      return member;
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
