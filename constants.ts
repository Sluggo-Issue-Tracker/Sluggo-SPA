export interface ProcessEnv {
  [key: string]: string | undefined;
}
export const {
  SLUGGO_API_URL
}: ProcessEnv = process.env;

export const PAGE_SIZE = 10;
