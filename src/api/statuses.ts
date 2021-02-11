import { AxiosInstance, AxiosPromise } from "axios";
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

function get(
  axios: AxiosInstance,
  team: TeamRecord
): AxiosPromise<StatusRecord> {
  return axios.get(`/api/teams/${team.id}/statuses/`);
}

function post(
  axios: AxiosInstance,
  team: TeamRecord,
  title: string
): AxiosPromise<StatusRecord> {
  const record: NewStatusRecord = {
    title
  };

  return axios.post(`/api/teams/${team.id}/statuses/`, record);
}

export default {
  get,
  post
};
