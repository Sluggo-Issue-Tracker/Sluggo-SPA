/* eslint-disable @typescript-eslint/camelcase */
import axios, { AxiosInstance } from "axios";
import { TeamRecord } from "@/api/teams";
import { generateAxiosInstance, PaginatedList } from "./base";

export interface WriteTagRecord {
  title: string;
}

export interface TagRecord {
  id: number;
  object_uuid: number;
  title: string;
  created: Date;
  activated?: Date;
  deactivated?: Date;
}

export async function createTag(
  record: WriteTagRecord,
  team: TeamRecord,
  axios: AxiosInstance
): Promise<TagRecord> {
  const response = await axios.post(`/api/teams/${team.id}/tags/`, record);
  return response.data as TagRecord;
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
  return response.data as TagRecord;
}

export async function getTag(
  id: number,
  team: TeamRecord,
  axios: AxiosInstance
): Promise<TagRecord> {
  const response = await axios.get(`/api/teams/${team.id}/tags/${id}/`);
  return response.data as TagRecord;
}

export async function listTag(
  team: TeamRecord,
  page: number,
  axios: AxiosInstance
): Promise<PaginatedList<TagRecord>> {
  const response = await axios.get(`/api/teams/${team.id}/tags/?page=${page}`);
  return response.data as PaginatedList<TagRecord>;
}

export async function deleteTag(
  record: TagRecord,
  team: TeamRecord,
  axios: AxiosInstance
) {
  const reponse = await axios.delete(`/api/teams/${team.id}/tags/${record.id}`);
}
