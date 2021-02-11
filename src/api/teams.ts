import { AxiosInstance, AxiosPromise } from "axios";

// Team API endpoints
export interface NewTeamRecord {
  name: string;
  description: string;
}

export interface TeamRecord {
  id: number;
  name: string;
  description: string;
  object_uuid: string;
  ticket_head: number;
  created: string;
  activated: string;
  deactivated: string;
}

export function postTeam(
  record: NewTeamRecord,
  axios: AxiosInstance
): AxiosPromise<TeamRecord> {
  return axios.post("/api/teams/", {
    name: record.name,
    description: "UNUSED"
  });
}

export function getTeam(
  axios: AxiosInstance,
  teamId: number
): AxiosPromise<TeamRecord> {
  return axios.get(`/api/teams/${teamId}/`);
}
