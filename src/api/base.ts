import axios, { AxiosError } from "axios";
import router from "../router";

export const pageSize = 10;

export interface PaginatedList<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<T>;
}

export function generateAxiosInstance(token?: string) {
  const instance = axios.create({
    baseURL: "http://127.0.0.1:8080/"
  }); // TODO: This is hardwired and bad

  instance.interceptors.request.use(config => {
    config.withCredentials = true;
    return config;
  });

  // TODO: Expand below into properly reporting such errors on the frontend
  // This can probably be done centrally if most code that chains simply
  // stops. Noting, this means that bad chains of actions may partially complete
  // this is probably fine but could be looked into later.
  // Sam: imo the only thing we should care about here is if the request returns
  // an authentication error. Beyond that, uses of axios instances should be
  // be able to decide what to do.
  instance.interceptors.response.use(
    function(response) {
      return response;
    },
    async (error: AxiosError) => {
      if (error.isAxiosError) {
        console.log(`Error occurred!`);
        console.log(`Printing error details: `);
        if (error.response) {
          console.log(
            `Got bad status ${error.response.status}: ${error.response.statusText}`
          );
          console.log(error.response.data);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Unable to print details.");
        }
      }

      if (error.response && error.response.status === 401) {
        await router.push("/login");
      }

      return error;
    }
  );

  return instance;
}
