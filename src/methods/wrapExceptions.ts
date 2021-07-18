import { AxiosError } from "axios";

export type WrappedResponse<T> = [T | null, Error | AxiosError | null];

export const wrapExceptions = async <T = never, A = never>(
  request: (...args: [A]) => Promise<T>,
  ...args: [A]
): Promise<WrappedResponse<T>> => {
  try {
    const response = await request(...args);
    return [response, null];
  } catch (e) {
    return [null, e];
  }
};
