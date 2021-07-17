import { AxiosResponse } from "axios";
import { APIResponse } from "@/api/types";

export const requestWrapper = async <T = never>(
  request: <T>(url: string, args?: {}) => Promise<AxiosResponse<T>>,
  url: string,
  args?: {}
): Promise<APIResponse<T>> => {
  try {
    const response = await request<T>(url, args);
    return [response, null];
  } catch (e) {
    return [null, e];
  }
};
