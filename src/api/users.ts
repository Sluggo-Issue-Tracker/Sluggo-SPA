import { AxiosInstance } from "axios";
import { DateTime } from "luxon";
// import { TeamRecord } from "@/api/teams";
import { PaginatedList } from "./base";
import { MD5 } from "crypto-js";

export interface UserRecord {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  username: string;
}

// possibly need to add pronouns? ask later

export interface MemberRecord {
  id: string;
  owner: UserRecord;
  team_id: number;
  object_uuid: string;
  role: string;
  bio?: string;
  created: DateTime;
  activated: DateTime;
  deactivated: DateTime;
}

export async function listMembers(
  axios: AxiosInstance,
  teamId: number,
  page: number
): Promise<PaginatedList<MemberRecord>> {
  const response = await axios.get(
    `/api/teams/${teamId}/members/?page=${page}`
  );
  console.log(response.data.results);
  return response.data as PaginatedList<MemberRecord>;
}

export async function approveMember(
  axios: AxiosInstance,
  teamId: number,
  record: MemberRecord
): Promise<void> {
  await axios.patch(`/api/teams/${teamId}/members/${record.id}/`, {
    role: "AP"
  });
}

export async function getMemberForUser(
  axios: AxiosInstance,
  teamId: number,
  userRecord: UserRecord
) {
  const memberPk = MD5(teamId.toString())
    .toString()
    .concat(MD5(userRecord.username).toString());

  const response = await axios.get(`/api/teams/${teamId}/members/${memberPk}`);

  return response.data as MemberRecord;
}