export interface ProcessEnv {
  [key: string]: string | undefined;
}
export const {
  VUE_APP_SLUGGO_API_URL: SLUGGO_API_URL
}: ProcessEnv = process.env;

export const PAGE_SIZE = 10;

console.log(SLUGGO_API_URL);
