import axios from "axios";

export function generateAxiosInstance() {
  const instance = axios.create({
    baseURL: "http://localhost:8080/"
  }); // TODO: This is hardwired and bad

  return instance;
}
