import axios, { AxiosError } from "axios";

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
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  });

  // TODO: Expand below into properly reporting such errors on the frontend
  // This can probably be done centrally if most code that chains simply
  // stops. Noting, this means that bad chains of actions may partially complete
  // this is probably fine but could be looked into later.
  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (e) {
      if (e.isAxiosError) {
        const error = e as AxiosError;
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

      return e;
    }
  );

  return instance;
}
