/* eslint-disable @typescript-eslint/camelcase */
import { axiosInstance } from "@/api/base";
import {
  PaginatedList,
  ReadTicketRecord,
  TicketFilterOptions,
  WriteTicketRecord
} from "@/api/types";

export const createTicket = async (
  record: WriteTicketRecord,
  teamId: number
): Promise<ReadTicketRecord> => {
  const { data } = await axiosInstance.post<ReadTicketRecord>(
    `/api/teams/${teamId}/tickets/`,
    record
  );
  return data;
};

export const updateTicket = async (
  record: ReadTicketRecord,
  teamId: number
): Promise<ReadTicketRecord> => {
  const { tag_list, assigned_user, status, ...rest } = record;

  const updateRecord: WriteTicketRecord = {
    tag_list: tag_list?.map(elem => elem.id),
    assigned_user: assigned_user?.id,
    status: status?.id,
    ...rest
  };

  const { data } = await axiosInstance.put<ReadTicketRecord>(
    `/api/teams/${teamId}/tickets/${record.id}/`,
    updateRecord
  );
  return data;
};

export const listTickets = async (
  teamId: number,
  page: number,
  filter?: TicketFilterOptions
): Promise<PaginatedList<ReadTicketRecord>> => {
  let queryParams = `?page=${page}`;
  if (filter?.assigned) {
    queryParams += `&assigned__username=${filter.assigned.username}`;
  }
  if (filter?.owner) {
    queryParams += `&owner__username=${filter.owner.username}`;
  }
  if (filter?.search) {
    queryParams += `&search=${filter.search}`;
  }

  const { data } = await axiosInstance.get<PaginatedList<ReadTicketRecord>>(
    `/api/teams/${teamId}/tickets/${queryParams}`
  );
  return data;
};

export const getTicket = async (
  id: number,
  teamId: number
): Promise<ReadTicketRecord> => {
  const { data } = await axiosInstance.get<ReadTicketRecord>(
    `/api/teams/${teamId}/tickets/${id}/`
  );
  return data;
};

export const deleteTicket = async (
  record: ReadTicketRecord,
  teamId: number
): Promise<void> => {
  await axiosInstance.delete<void>(`/api/teams/${teamId}/tickets/${record.id}`);
};

export const getUsersAssignedTickets = async (): Promise<ReadTicketRecord[]> => {
  const { data } = await axiosInstance.get<ReadTicketRecord[]>(
    "/api/user/assigned-tickets/"
  );
  return data;
};

export const getUsersPinnedTickets = async (): Promise<ReadTicketRecord[]> => {
  const { data } = await axiosInstance.get<ReadTicketRecord[]>(
    "/api/user/pinned-tickets/"
  );
  return data;
};
