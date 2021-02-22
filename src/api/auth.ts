import { AxiosInstance } from "axios";

// MARK: Interfaces
export interface LoginDetails {
  username: string;
  password: string;
}

export interface SignupDetails {
  username: string;
  email: string;
  password: string;
  secondaryPassword: string;
}

// MARK: Authentication Methods
export async function signup(
  details: SignupDetails,
  axios: AxiosInstance
): Promise<string> {
  const response = await axios.post("/auth/registration/", {
    username: details.username,
    email: details.email,
    password1: details.password,
    password2: details.secondaryPassword
  });

  const responseData = response.data;

  return responseData.key;
}

export async function login(
  details: LoginDetails,
  axios: AxiosInstance
): Promise<string> {
  const response = await axios.post("/auth/login/", details);
  console.log("Successful login! Printing response key:");
  console.log(response.data);

  return response.data.key as string;
}
