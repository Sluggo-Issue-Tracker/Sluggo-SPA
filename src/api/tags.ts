/* eslint-disable @typescript-eslint/camelcase */
import axios, { AxiosInstance } from "axios";
import { TeamRecord } from "@/api/teams";
import { generateAxiosInstance, PaginatedList } from "./base";
import { DateTime } from "luxon";

export interface WriteTagRecord {
  title: string;
}

export interface TagRecord {
  id: number;
  object_uuid: number;
  title: string;
  created: DateTime;
  activated?: DateTime;
  deactivated?: DateTime;
}

export interface ReadTagRecord {
  id: number;
  object_uuid: number;
  title: string;
  created: string;
  activated?: string;
  deactivated?: string;
}

export function createTagRecord(response: ReadTagRecord): TagRecord {
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

export async function createTag(
  record: WriteTagRecord,
  team: TeamRecord,
  axios: AxiosInstance
): Promise<TagRecord> {
  const response = await axios.post(`/api/teams/${team.id}/tags/`, record);
  return createTagRecord(response.data);
}

export async function updateTag(
  record: TagRecord,
  team: TeamRecord,
  axios: AxiosInstance
): Promise<TagRecord> {
  const updateRecord = {
    title: record.title
  };
  const response = await axios.put(
    `/api/teams/${team.id}/tags/${record.id}`,
    updateRecord
  );
  return createTagRecord(response.data);
}

export async function getTag(
  id: number,
  team: TeamRecord,
  axios: AxiosInstance
): Promise<TagRecord> {
  const response = await axios.get(`/api/teams/${team.id}/tags/${id}/`);
  return createTagRecord(response.data);
}

export async function listTag(
  team: TeamRecord,
  page: number,
  axios: AxiosInstance
): Promise<PaginatedList<TagRecord>> {
  const response = await axios.get(`/api/teams/${team.id}/tags/?page=${page}`);

  const listing: PaginatedList<ReadTagRecord> = response.data;
  return {
    count: listing.count,
    next: listing.next,
    previous: listing.previous,
    results: listing.results.map(elem => createTagRecord(elem))
  };
}

export async function deleteTag(
  record: TagRecord,
  team: TeamRecord,
  axios: AxiosInstance
) {
  await axios.delete(`/api/teams/${team.id}/tags/${record.id}`);
}
