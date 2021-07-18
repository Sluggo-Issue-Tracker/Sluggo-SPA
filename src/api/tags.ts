/* eslint-disable @typescript-eslint/camelcase */
import { axiosInstance } from "./base";
import { PaginatedList, TagRecord, WriteTagRecord } from "@/api/types";
import { AxiosResponse } from "axios";

export const createTag = async (
  record: WriteTagRecord,
  teamId: number
): Promise<AxiosResponse<TagRecord>> =>
  await axiosInstance.post<TagRecord>(`/api/teams/${teamId}/tags/`, record);

export const updateTag = async (
  record: TagRecord,
  teamId: number
): Promise<AxiosResponse<TagRecord>> => {
  const updateRecord = {
    title: record.title
  };
  return await axiosInstance.put<TagRecord>(
    `/api/teams/${teamId}/tags/${record.id}/`,
    updateRecord
  );
};

export const getTag = async (
  id: number,
  teamId: number
): Promise<AxiosResponse<TagRecord>> =>
  await axiosInstance.get<TagRecord>(`/api/teams/${teamId}/tags/${id}]`);

export const listTags = async (
  teamId: number,
  page: number
): Promise<AxiosResponse<PaginatedList<TagRecord>>> =>
  await axiosInstance.get<PaginatedList<TagRecord>>(
    `/api/teams/${teamId}/tags/?page=${page}`
  );

export const deleteTag = async (
  record: TagRecord,
  teamId: number
): Promise<AxiosResponse<void>> =>
  await axiosInstance.delete<void>(`/api/teams/${teamId}/tags/${record.id}`);
