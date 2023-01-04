import axios, { AxiosError, AxiosResponse } from "axios";
import { SLUGGO_API_URL } from "../../constants";
import getCookie from "@/methods/getCookie";

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

export const axiosInstance = axios.create({
  baseURL: SLUGGO_API_URL,
  withCredentials: true,
  headers: {
    // attach csrf token to all requests
    "X-CSRFTOKEN": getCookie("csrftoken")
  }
});

axiosInstance.interceptors.response.use(
  undefined,
  async (error: AxiosError) => {
    logError(error);
    return Promise.reject(error);
  }
);
