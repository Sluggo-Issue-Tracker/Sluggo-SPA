/* eslint-disable @typescript-eslint/camelcase */
import { axiosInstance} from "./base";
import { APIResponse, PaginatedList, ReadTeamRecord, TagRecord, WriteTagRecord } from "@/api/types";
import { requestWrapper } from "@/api/util";

export const createTag = async (
  record: WriteTagRecord,
  team: ReadTeamRecord
): Promise<APIResponse<TagRecord>> =>
  await requestWrapper<TagRecord>(
    axiosInstance.post,
    `/api/teams/${team.id}/tags/`,
    record
  );

export const updateTag = async (
  record: TagRecord,
  team: ReadTeamRecord
): Promise<APIResponse<TagRecord>> => {
  const updateRecord = {
    title: record.title
  };
  return await requestWrapper(
    axiosInstance.put,
    `/api/teams/${team.id}/tags/${record.id}/`,
    updateRecord
  );
};

export const getTag = async (
  id: number,
  team: ReadTeamRecord
): Promise<APIResponse<TagRecord>> =>
  await requestWrapper(
    axiosInstance.get,
    `/api/teams/${team.id}/tags/${id}]`
  );

export const listTag = async (
  team: ReadTeamRecord,
  page: number
): Promise<APIResponse<PaginatedList<TagRecord>>> =>
  await requestWrapper(
    axiosInstance.get,
    `/api/teams/${team.id}/tags/?page=${page}`
  );

export const deleteTag = async (
  record: TagRecord,
  team: ReadTeamRecord
): Promise<APIResponse<void>> =>
  await requestWrapper(
    axiosInstance.delete,
    `/api/teams/${team.id}/tags/${record.id}`
  );
