import { APIResponse, LoginDetails, LoginResponse, SignupDetails, UserRecord } from "./types";
import { axiosInstance } from "@/api/base";
import { requestWrapper } from "@/api/util";

export const signup = async ({
  username,
  email,
  password,
  secondaryPassword
}: SignupDetails): Promise<APIResponse<LoginResponse>> =>
  requestWrapper(axiosInstance.post, "/auth/registration/", {
    username,
    email,
    password1: password,
    password2: secondaryPassword
  });

export const login = async (
  details: LoginDetails
): Promise<APIResponse<LoginResponse>> =>
  requestWrapper(axiosInstance.post, "/auth/login/", details);

export const getUser = async (): Promise<APIResponse<UserRecord>> =>
  requestWrapper(axiosInstance.get, "/auth/user/");

export const logoutUser = async (): Promise<void> =>
  await axiosInstance.post("/auth/logout/");
