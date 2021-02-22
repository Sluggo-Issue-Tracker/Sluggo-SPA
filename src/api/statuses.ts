import { AxiosInstance } from "axios";
import { TeamRecord } from "@/api/teams";

export interface NewStatusRecord {
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
  title: string
): Promise<StatusRecord> {
  const record: NewStatusRecord = {
    title
  };

  const response = await axios.post(`/api/teams/${team.id}/statuses/`, record);
  return response.data as StatusRecord;
}
