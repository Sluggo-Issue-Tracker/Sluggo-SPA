import { AxiosPromise } from "axios";
import { generateAxiosInstance } from "./base";

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

export function postTeam(record: NewTeamRecord): AxiosPromise {
  const axios = generateAxiosInstance();

  return axios.post("/api/teams/", {
    name: record.name,
    description: "UNUSED"
  });
}
