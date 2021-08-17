import {
  LoginDetails,
  LoginResponse,
  SignupDetails,
  UserRecord
} from "./types";
import { axiosInstance } from "@/api/base";
import { AxiosResponse } from "axios";

export const signup = async ({
  username,
  email,
  password,
  secondaryPassword
}: SignupDetails): Promise<AxiosResponse<LoginResponse>> =>
  axiosInstance.post<LoginResponse>("/auth/registration/", {
    username,
    email,
    password1: password,
    password2: secondaryPassword
  });

export const login = async (
  details: LoginDetails
): Promise<AxiosResponse<LoginResponse>> =>
  axiosInstance.post<LoginResponse>("/auth/login/", details);

export const getUser = async (): Promise<AxiosResponse<UserRecord>> =>
  axiosInstance.get<UserRecord>("/auth/user/");

export const logoutUser = async (): Promise<AxiosResponse<void>> =>
  await axiosInstance.post<void>("/auth/logout/");
