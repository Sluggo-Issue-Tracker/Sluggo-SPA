export interface ProcessEnv {
  [key: string]: string | undefined;
}
const {
  VUE_APP_SLUGGO_API_URL,
  VUE_APP_LOGIN_REDIRECT,
  VUE_APP_LOGOUT_REDIRECT
}: ProcessEnv = process.env;

export const SLUGGO_API_URL = VUE_APP_SLUGGO_API_URL ?? "";
export const LOGIN_REDIRECT = VUE_APP_LOGIN_REDIRECT ?? "";
export const LOGOUT_REDIRECT = VUE_APP_LOGOUT_REDIRECT ?? "";

export const PAGE_SIZE = 10;
