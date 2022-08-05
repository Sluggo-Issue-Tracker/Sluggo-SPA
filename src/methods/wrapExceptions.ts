// this allows any keyword to be applied to rest args.
// imo this is okay, but it will require that users of this
/*eslint @typescript-eslint/no-explicit-any: ["error", { "ignoreRestArgs": true }]*/
/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { AxiosError } from "axios";
import { ref, Ref, UnwrapRef } from "vue";

export type WrappedResponse<T> = [T | null, Error | AxiosError | null];

export const wrapExceptions = async <T = unknown>(
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

export interface QueryState<T, E> {
  data: Ref<UnwrapRef<T> | undefined>;
  loading: Ref<boolean>;
  error: Ref<E | undefined>;
}

type ExecutorResponse<T extends unknown, E> = [
  (...args: any[]) => Promise<void>,
  QueryState<T, E>
];

export const apiExecutor = <T = unknown>(
  request: (...args: any[]) => Promise<T>
): ExecutorResponse<T, AxiosError | Error | undefined> => {
  const data = ref<T | undefined>(undefined);
  const loading = ref<boolean>(false);
  const error = ref<AxiosError | Error | undefined>(undefined);

  const wrappedRequest = async (...args: any[]): Promise<void> => {
    loading.value = true;
    try {
      // @ts-ignore vue is weird in the way it handles generic refs
      data.value = await request(...args);
      loading.value = false;
    } catch (caughtError) {
      loading.value = false;
      error.value = caughtError;
    }
  };

  return [wrappedRequest, { data, loading, error }];
};
