import { createDirectStore } from "direct-vuex";
import { ReadTeamRecord, UserRecord } from "@/api/types";
import { getTeam, getUser } from "@/api";
import { RootStoreState } from "@/store/types";
import axios from "axios";
import { LOGIN_REDIRECT } from "../../constants";

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
        try {
          const data = await getUser();
          context.commit.setUser(data);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
              window.location.replace(LOGIN_REDIRECT);
            }
          }
        }
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
