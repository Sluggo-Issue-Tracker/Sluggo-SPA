import { createDirectStore } from "direct-vuex";
import {
  LoginDetails,
  ReadTeamRecord,
  SignupDetails,
  UserRecord
} from "@/api/types";
import { getTeam, getUser, login, signup } from "@/api";
import { logoutUser } from "@/api/auth";
import { RootStoreState } from "@/store/types";

export const createSluggoStore = () => {
  const {
    store,
    rootActionContext,
    moduleActionContext,
    rootGetterContext,
    moduleGetterContext
  } = createDirectStore({
    state: {
      token: undefined,
      error: ""
    } as RootStoreState,
    mutations: {
      setTeam(state, newTeam?: ReadTeamRecord) {
        state.team = newTeam;
      },
      setUser(state, newUser?: UserRecord) {
        state.authUser = newUser;
      },
      setError(state, newError?: string) {
        state.error = newError;
      }
    },
    actions: {
      doSignup: async (ctxRaw, details: SignupDetails) => {
        const context = rootActionContext(ctxRaw);
        const { user } = await signup(details);
        context.commit.setUser(user);
      },
      doLogin: async (ctxRaw, details: LoginDetails) => {
        const context = rootActionContext(ctxRaw);
        const { user } = await login(details);
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
        const data = await getTeam(teamId);

        await context.dispatch.doSetTeam(data);
        return data;
      },
      doFetchAuthUser: async (ctxRaw): Promise<void> => {
        const context = rootActionContext(ctxRaw);
        const data = await getUser();
        context.commit.setUser(data);
      },
      doSetError: async (ctxRaw, errorMessage?: any) => {
        const context = rootActionContext(ctxRaw);
        context.commit.setError(errorMessage);
      }
    },
    modules: {},
    getters: {
      authUser: (state): UserRecord => {
        if (state.authUser) {
          return state.authUser;
        }
        throw new Error("User is not defined!");
      },
      error: (state): any => {
        if (state.error) {
          return state.error;
        }
        return "No error to display!";
      }
    }
  });

  return {
    store,
    rootActionContext,
    moduleActionContext,
    rootGetterContext,
    moduleGetterContext
  };
};
