import { UserRecord } from "./types";
import { axiosInstance } from "@/api/base";

export const getUser = async (): Promise<UserRecord> => {
  const { data } = await axiosInstance.get<UserRecord>("/auth/user/");
  return data;
};
