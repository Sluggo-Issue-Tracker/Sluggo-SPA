import { AxiosInstance } from "axios";
import { TeamRecord } from "@/api/teams";
import { PaginatedList } from "./base";
import { DateTime } from "luxon";

export interface OwnerRecord {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  username: string;
}

export interface UserRecord {
  id: string;
  owner: OwnerRecord;
  team_id: number;
  object_uuid: string;
  role: string;
  bio?: string;
  created?: DateTime;
  activated?: DateTime;
  deactivated?: DateTime;
}

export async function listUsers(
  team: TeamRecord,
  page: number,
  axios: AxiosInstance,
): Promise<PaginatedList<UserRecord>> {

  const response = await axios.get(
    `/api/teams/${team.id}/members/?page=${page}`
  );
  console.log("hello");
  console.log(response.data.results);
  return response.data as PaginatedList<UserRecord>;
}
