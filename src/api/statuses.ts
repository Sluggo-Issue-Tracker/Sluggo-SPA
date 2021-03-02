import { AxiosInstance } from "axios";
import { NewTeamRecord, TeamRecord } from "@/api/teams";
import { PaginatedList } from "@/api/base";

export interface WriteStatusRecord {
  title: string;
}

export interface StatusRecord {
  id: number;
  object_uuid: string;
  title: string;
  created: string;
  activated: string;
  deactivated: string;
}

export async function getStatus(
  axios: AxiosInstance,
  team: TeamRecord
): Promise<StatusRecord> {
  const response = await axios.get(`/api/teams/${team.id}/statuses/`);
  return response.data as StatusRecord;
}

export async function postStatus(
  axios: AxiosInstance,
  team: TeamRecord,
  record: WriteStatusRecord
): Promise<StatusRecord> {
  const response = await axios.post(`/api/teams/${team.id}/statuses/`, record);
  return response.data as StatusRecord;
}

export async function listStatus(
  axios: AxiosInstance,
  team: TeamRecord,
  page: number
): Promise<PaginatedList<StatusRecord>> {
  const response = await axios.get(
    `/api/teams/${team.id}/statuses/?page=${page}`
  );
  return response.data as PaginatedList<StatusRecord>;
}

export async function updateStatus(
  axios: AxiosInstance,
  team: TeamRecord,
  record: StatusRecord
): Promise<StatusRecord> {
  const updateRecord: WriteStatusRecord = {
    title: record.title
  };

  const response = await axios.put(
    `/api/teams/${team.id}/statuses/${record.id}`,
    updateRecord
  );
  return response.data as StatusRecord;
}

export async function deleteStatus(
  axios: AxiosInstance,
  team: TeamRecord,
  record: StatusRecord
): Promise<void> {
  const reponse = await axios.delete(
    `/api/teams/${team.id}/statuses/${record.id}/`
  );
}
