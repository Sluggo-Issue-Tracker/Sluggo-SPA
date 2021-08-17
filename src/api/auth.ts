import {
  LoginDetails,
  LoginResponse,
  SignupDetails,
  UserRecord
} from "./types";
import { axiosInstance } from "@/api/base";

export const signup = async ({
  password,
  secondaryPassword,
  ...rest
}: SignupDetails): Promise<LoginResponse> => {
  const { data } = await axiosInstance.post<LoginResponse>(
    "/auth/registration/",
    {
      password1: password,
      password2: secondaryPassword,
      ...rest
    }
  );
  return data;
};

export const login = async (details: LoginDetails): Promise<LoginResponse> => {
  const { data } = await axiosInstance.post<LoginResponse>(
    "/auth/login/",
    details
  );
  return data;
};

export const getUser = async (): Promise<UserRecord> => {
  const { data } = await axiosInstance.get<UserRecord>("/auth/user/");
  return data;
};

export const logoutUser = async (): Promise<void> => {
  await axiosInstance.post<void>("/auth/logout/");
};
