import { AxiosInstance } from "axios";
import { postStatus } from "@/api/statuses";

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

export async function postTeam(
  record: NewTeamRecord,
  axios: AxiosInstance
): Promise<TeamRecord> {
  const response = await axios.post("/api/teams/", {
    name: record.name,
    description: "UNUSED"
  });

  return response.data as TeamRecord;
}

export async function createTeam(
  axios: AxiosInstance,
  record: NewTeamRecord
): Promise<TeamRecord> {
  const newTeamRecord = await postTeam(record, axios);

  try {
    await postStatus(axios, newTeamRecord, "To Do");
    await postStatus(axios, newTeamRecord, "In Progress");
    await postStatus(axios, newTeamRecord, "Completed");
  } catch (e) {
    console.log("There was an error setting initial team status.");
  }

  return newTeamRecord;
}

export async function getTeam(
  axios: AxiosInstance,
  teamId: number
): Promise<TeamRecord> {
  const response = await axios.get(`/api/teams/${teamId}/`);
  return response.data as TeamRecord;
}
