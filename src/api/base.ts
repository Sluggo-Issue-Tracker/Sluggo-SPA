import axios from "axios";

export function generateAxiosInstance() {
  const instance = axios.create({
    baseURL: "http://127.0.0.1:8080/"
  }); // TODO: This is hardwired and bad

  return instance;
}
