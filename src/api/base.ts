import axios from "axios";

export function generateAxiosInstance(token?: string) {
  const instance = axios.create({
    baseURL: "http://127.0.0.1:8080/"
  }); // TODO: This is hardwired and bad

  instance.interceptors.request.use(config => {
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  });

  return instance;
}
