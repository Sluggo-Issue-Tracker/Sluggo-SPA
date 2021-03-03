/* eslint-disable @typescript-eslint/camelcase */
import { AxiosInstance } from "axios";
import { postStatus } from "@/api/statuses";
import { DateTime } from "luxon";

// Team API endpoints
export interface NewTeamRecord {
  name: string;
  description: string;
}

export interface ReadTeamRecord {
  id: number;
  name: string;
  description: string;
  object_uuid: string;
  ticket_head: number;
  created: string;
  activated?: string;
  deactivated?: string;
}

export interface TeamRecord {
  id: number;
  name: string;
  description: string;
  object_uuid: string;
  ticket_head: number;
  created: DateTime;
  activated?: DateTime;
  deactivated?: DateTime;
}

function createTeamRecord(response: ReadTeamRecord): TeamRecord {
  return {
    id: response.id,
    name: response.name,
    description: response.description,
    object_uuid: response.object_uuid,
    ticket_head: response.ticket_head,
    created: DateTime.fromISO(response.created),
    activated: response.activated
      ? DateTime.fromISO(response.activated)
      : undefined,
    deactivated: response.deactivated
      ? DateTime.fromISO(response.deactivated)
      : undefined
  };
}

export async function postTeam(
  record: NewTeamRecord,
  axios: AxiosInstance
): Promise<TeamRecord> {
  const response = await axios.post("/api/teams/", {
    name: record.name,
    description: "UNUSED"
  });

  return createTeamRecord(response.data);
}

export async function createTeam(
  axios: AxiosInstance,
  record: NewTeamRecord
): Promise<TeamRecord> {
  const newTeamRecord = await postTeam(record, axios);

  // TODO: tdimhcsleumas 3/2/2021 move this to the backend, after the
  // Tela deadline
  try {
    await postStatus(axios, newTeamRecord, { title: "To Do" });
    await postStatus(axios, newTeamRecord, { title: "In Progress" });
    await postStatus(axios, newTeamRecord, { title: "Completed" });
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
  return createTeamRecord(response.data);
}
