import { generateAxiosInstance } from "./base";

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
export async function signup(details: SignupDetails) {
  const axios = generateAxiosInstance();
  const p = new Promise<string>(function(success, fail) {
    axios
      .post("/auth/registration/", {
        username: details.username,
        email: details.email,
        password1: details.password,
        password2: details.secondaryPassword
      })
      .then(response => {
        console.log("Successful signup! Printing response data...");
        console.log(response.data);

        success(response.data.key as string);
      })
      .catch(error => {
        console.log("Error signing up. Printing response data:");
        console.log(error.response.data);

        fail(undefined);
      });
  });

  return p;
}

export async function login(details: LoginDetails): Promise<string> {
  const axios = generateAxiosInstance();

  const p = new Promise<string>(function(success, fail) {
    axios
      .post("/auth/login/", details)
      .then(response => {
        console.log("Successful login! Printing response key:");
        console.log(response.data);

        success(response.data.key as string);
      })
      .catch(error => {
        console.log("Login not successful. Printing response...");
        console.log(error.response.data);

        fail(undefined);
      });
  });

  return p;
}
