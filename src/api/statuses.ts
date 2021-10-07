/* eslint-disable @typescript-eslint/camelcase */
import { axiosInstance } from "./base";
import { StatusRecordInput, StatusRecordOutput } from "@/api/types";

export const createStatus = async (
  record: StatusRecordInput,
  teamId: number
): Promise<StatusRecordOutput> => {
  const { data } = await axiosInstance.post<StatusRecordOutput>(
    `/api/teams/${teamId}/statuses/`,
    record
  );
  return data;
};

export const updateStatus = async (
  record: StatusRecordOutput,
  teamId: number
): Promise<StatusRecordOutput> => {
  const updateRecord = {
    title: record.title,
    color: record.color
  };
  const { data } = await axiosInstance.put<StatusRecordOutput>(
    `/api/teams/${teamId}/statuses/${record.id}/`,
    updateRecord
  );
  return data;
};

export const getStatus = async (
  id: number,
  teamId: number
): Promise<StatusRecordOutput> => {
  const { data } = await axiosInstance.get<StatusRecordOutput>(
    `/api/teams/${teamId}/statuses/${id}]`
  );
  return data;
};

export const listStatuses = async (
  teamId: number
): Promise<StatusRecordOutput[]> => {
  const { data } = await axiosInstance.get<StatusRecordOutput[]>(
    `/api/teams/${teamId}/statuses`
  );
  return data;
};

export const deleteStatus = async (
  record: StatusRecordOutput,
  teamId: number
): Promise<void> => {
  await axiosInstance.delete<void>(
    `/api/teams/${teamId}/statuses/${record.id}`
  );
};
