import { axiosInstance } from "./base";
import { PaginatedList, TagRecord, WriteTagRecord } from "@/api/types";

export const createTag = async (
  record: WriteTagRecord,
  teamId: number
): Promise<TagRecord> => {
  const { data } = await axiosInstance.post<TagRecord>(
    `/api/teams/${teamId}/tags/`,
    record
  );
  return data;
};

export const updateTag = async (
  record: TagRecord,
  teamId: number
): Promise<TagRecord> => {
  const updateRecord = {
    title: record.title
  };
  const { data } = await axiosInstance.put<TagRecord>(
    `/api/teams/${teamId}/tags/${record.id}/`,
    updateRecord
  );
  return data;
};

export const getTag = async (
  id: number,
  teamId: number
): Promise<TagRecord> => {
  const { data } = await axiosInstance.get<TagRecord>(
    `/api/teams/${teamId}/tags/${id}]`
  );
  return data;
};

export const listTags = async (
  teamId: number,
): Promise<TagRecord[]> => {
  const { data } = await axiosInstance.get<TagRecord[]>(
    `/api/teams/${teamId}/tags`
  );
  return data;
};

export const deleteTag = async (
  record: TagRecord,
  teamId: number
): Promise<void> => {
  await axiosInstance.delete<void>(`/api/teams/${teamId}/tags/${record.id}`);
};
