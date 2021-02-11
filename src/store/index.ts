import { createDirectStore } from "direct-vuex";
import { SignupDetails, LoginDetails, signup, login } from "@/api/auth";
import { TeamRecord, NewTeamRecord, postTeam, getTeam } from "@/api/teams";
import { generateAxiosInstance } from "@/api/base";
import Statuses from "@/api/statuses";

interface RootStoreState {
  token?: string;
  team?: TeamRecord;
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
    },
    setTeam(state, newTeam: TeamRecord) {
      state.team = newTeam;
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
        const newTeamRecord = response.data;
        console.log(newTeamRecord);

        // Put team into a good state
        // This would probably be a good idea to standardize on the
        // backend, but I don't want to wait on backend
        Promise.all([
          Statuses.post(axios, newTeamRecord, "To Do"),
          Statuses.post(axios, newTeamRecord, "In Progress"),
          Statuses.post(axios, newTeamRecord, "Completed")
        ])
          .then(() => {
            console.log("Statuses created!");
          })
          .catch(error => {
            console.log(
              "Error encountered setting up initial team state. Printing..."
            );
            console.log(error.response.data);
          });
      });
    },
    doSetTeam(ctxRaw, teamId: number) {
      const context = rootActionContext(ctxRaw);
      const axios = generateAxiosInstance(context.state.token);

      getTeam(axios, teamId)
        .then(response => {
          const record = response.data;
          context.commit.setTeam(record);

          console.log(context.state.team);
        })
        .catch(error => {
          console.log("Error setting team! Printing error details...");
          console.log(error.response.data);
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
