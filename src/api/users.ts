import { AxiosInstance } from "axios";
// import { TeamRecord } from "@/api/teams";
import { PaginatedList } from "./base";

export interface OwnerRecord {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
}

export interface UserRecord {
  id: string;
  owner: OwnerRecord;
}

export async function listUsers(
  axios: AxiosInstance,
  teamId: number,
  page: number
): Promise<PaginatedList<UserRecord>> {
  const response = await axios.get(
    `/api/teams/${teamId}/members/?page=${page}`
  );
  console.log(response.data as PaginatedList<UserRecord>);
  return response.data as PaginatedList<UserRecord>;
}
