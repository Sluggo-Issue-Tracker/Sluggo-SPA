import axios, { AxiosError, AxiosResponse } from "axios";
import router from "../router";
import { SLUGGO_API_URL } from "../../constants";
import { wrapExceptions } from "@/methods";

// Refresh logic
let refresher: Promise<AxiosResponse<void>> | null = null;

const refreshAxiosInstance = axios.create({
  baseURL: SLUGGO_API_URL,
  withCredentials: true
});

export const refreshToken = (): Promise<AxiosResponse<void>> => {
  if (refresher) {
    return refresher;
  }

  refresher = refreshAxiosInstance.post<void>("/auth/token/refresh/");

  return refresher.finally(() => (refresher = null));
};

const logError = (error: AxiosError) => {
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
};

// This is not hardwired and not bad.
export const axiosInstance = axios.create({
  baseURL: SLUGGO_API_URL,
  withCredentials: true
});

// the interception for errors is a bit tricky because if
// two requests that run after another in short succession
// both receive 401 statuses, then there may be interleaved
// refresh requests. However, this should not be an issue because
// the loser of that race will set an authentication cookie, which will
// be the correct one.
axiosInstance.interceptors.response.use(
  undefined,
  async (error: AxiosError) => {
    logError(error);

    // Return error if not an authentication issue.
    // cookies are a little weird in that they will not be included if they expire
    // which means either the cookie will not be included or an expired token is included
    // when a request fails due to expired token either can happen
    if (
      error.response?.data?.detail !==
        "Authentication credentials were not provided." &&
      error.response?.data?.code !== "token_not_valid"
    ) {
      return Promise.reject(error);
    }

    // Attempt to refresh the token
    const [, refreshError] = await wrapExceptions(refreshToken);

    if (refreshError) {
      return Promise.reject(refreshError);
    }

    // Retry the request if refreshing successful
    const [retryResponse, retryError] = await wrapExceptions(
      axiosInstance.request,
      error.config
    );

    if (retryResponse) return retryResponse;
    return Promise.reject(retryError);
  }
);
