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
      error: undefined,
      authUser: undefined
    } as RootStoreState,
    mutations: {
      setUser(state, newUser?: UserRecord) {
        state.authUser = newUser;
      },
      setError(state, newError?: any) {
        state.error = newError;
      }
    },
    actions: {
      doFetchAuthUser: async (ctxRaw): Promise<void> => {
        const context = rootActionContext(ctxRaw);
        const data = await getUser();
        context.commit.setUser(data);
      },
      doSetError: async (ctxRaw, errorMessage?: any) => {
        const context = rootActionContext(ctxRaw);
        context.commit.setError(errorMessage ?? null);
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
