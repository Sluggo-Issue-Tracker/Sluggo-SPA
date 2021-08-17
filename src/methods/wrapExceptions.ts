// this allows any keyword to be applied to rest args.
// imo this is okay, but it will require that users of this
/*eslint @typescript-eslint/no-explicit-any: ["error", { "ignoreRestArgs": true }]*/
import { AxiosError, AxiosResponse } from "axios";

export type WrappedResponse<T> = [T | null, Error | AxiosError | null];

export const wrapExceptions = async <T extends AxiosResponse>(
  request: (...args: any[]) => Promise<T>,
  ...args: any[]
): Promise<WrappedResponse<T>> => {
  try {
    const response = await request(...args);
    return [response, null];
  } catch (e) {
    return [null, e];
  }
};
