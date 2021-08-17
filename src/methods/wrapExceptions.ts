// this allows any keyword to be applied to rest args.
// imo this is okay, but it will require that users of this
/*eslint @typescript-eslint/no-explicit-any: ["error", { "ignoreRestArgs": true }]*/
import { AxiosError, AxiosResponse } from "axios";
import { ref, Ref, UnwrapRef } from "vue";

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

interface ExecutorState<T, E> {
  data: Ref<T | undefined>;
  loading: Ref<boolean>;
  error?: Ref<E | undefined>;
}

type ExecutorResponse<T extends unknown, E> = [
  (...args: any[]) => Promise<T>,
  ExecutorState<UnwrapRef<T>, E>
];

export const apiExecutor = <T = unknown>(
  request: (...args: any[]) => Promise<T>
): ExecutorResponse<T, AxiosError | Error | undefined> => {
  const data = ref<T | undefined>(undefined);
  const loading = ref<boolean>(false);
  const error = ref<AxiosError | Error | undefined>(undefined);

  const wrappedRequest = async (...args: any[]): Promise<T> => {
    loading.value = true;
    try {
      const response = await request(...args);
      data.value = undefined;
      loading.value = false;
      return response;
    } catch (caughtError) {
      loading.value = false;
      error.value = caughtError;
      throw caughtError;
    }
  };

  return [wrappedRequest, { data, loading, error }];
};
