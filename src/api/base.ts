import axios, { AxiosError } from "axios";
import router from "../router";
import { SLUGGO_API_URL } from "../../constants";

// This is not hardwired and not bad.
export const axiosInstance = axios.create({
  baseURL: SLUGGO_API_URL,
  withCredentials: true
});

axiosInstance.interceptors.response.use(
  response => response,
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
