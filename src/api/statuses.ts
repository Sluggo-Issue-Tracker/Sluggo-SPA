/* eslint-disable @typescript-eslint/camelcase */
import { AxiosInstance } from "axios";
import { TeamRecord } from "@/api/teams";
import { PaginatedList } from "@/api/base";
import { DateTime } from "luxon";

export interface WriteStatusRecord {
  title: string;
}

export interface ReadStatusRecord {
  id: number;
  object_uuid: string;
  title: string;
  created: string;
  activated?: string;
  deactivated?: string;
}

export interface StatusRecord {
  id: number;
  object_uuid: string;
  title: string;
  created: DateTime;
  activated?: DateTime;
  deactivated?: DateTime;
}

export function createStatusRecord(response: ReadStatusRecord): StatusRecord {
  return {
    id: response.id,
    object_uuid: response.object_uuid,
    title: response.title,
    created: DateTime.fromISO(response.created),
    activated: response.activated
      ? DateTime.fromISO(response.activated)
      : undefined,
    deactivated: response.deactivated
      ? DateTime.fromISO(response.deactivated)
      : undefined
  };
}

export async function getStatus(
  axios: AxiosInstance,
  team: TeamRecord
): Promise<StatusRecord> {
  const response = await axios.get(`/api/teams/${team.id}/statuses/`);
  return createStatusRecord(response.data as ReadStatusRecord);
}

export async function postStatus(
  axios: AxiosInstance,
  team: TeamRecord,
  record: WriteStatusRecord
): Promise<StatusRecord> {
  const response = await axios.post(`/api/teams/${team.id}/statuses/`, record);
  return createStatusRecord(response.data as ReadStatusRecord);
}

export async function listStatus(
  axios: AxiosInstance,
  team: TeamRecord,
  page: number
): Promise<PaginatedList<StatusRecord>> {
  const response = await axios.get(
    `/api/teams/${team.id}/statuses/?page=${page}`
  );
  const listing: PaginatedList<ReadStatusRecord> = response.data;
  return {
    id: listing.id,
    next: listing.next,
    previous: listing.previous,
    results: listing.results.map(elem => createStatusRecord(elem))
  };
}

export async function updateStatus(
  axios: AxiosInstance,
  team: TeamRecord,
  record: ReadStatusRecord
): Promise<StatusRecord> {
  const updateRecord: WriteStatusRecord = {
    title: record.title
  };

  const response = await axios.put(
    `/api/teams/${team.id}/statuses/${record.id}`,
    updateRecord
  );
  return createStatusRecord(response.data);
}

export async function deleteStatus(
  axios: AxiosInstance,
  team: TeamRecord,
  record: ReadStatusRecord
): Promise<void> {
  await axios.delete(`/api/teams/${team.id}/statuses/${record.id}/`);
}
