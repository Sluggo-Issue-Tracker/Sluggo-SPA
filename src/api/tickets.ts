/* eslint-disable @typescript-eslint/camelcase */
import { AxiosInstance, AxiosResponse } from "axios";
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
): Promise<AxiosResponse<ReadTicketRecord>> =>
  await axiosInstance.post<ReadTicketRecord>(
    `/api/teams/${teamId}/tickets/`,
    record
  );

export const updateTicket = async (
  record: ReadTicketRecord,
  teamId: number
): Promise<AxiosResponse<ReadTicketRecord>> => {
  const { tag_list, assigned_user, status, ...rest } = record;

  const updateRecord: WriteTicketRecord = {
    tag_list: tag_list?.map(elem => elem.id),
    assigned_user: assigned_user?.pk,
    status: status?.id,
    ...rest
  };

  return await axiosInstance.put<ReadTicketRecord>(
    `/api/teams/${teamId}/tickets/${record.id}/`,
    updateRecord
  );
};

export const listTickets = async (
  teamId: number,
  page: number,
  axios: AxiosInstance,
  filter?: TicketFilterOptions
): Promise<AxiosResponse<PaginatedList<ReadTicketRecord>>> => {
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

  return await axiosInstance.get<PaginatedList<ReadTicketRecord>>(
    `/api/teams/${teamId}/tickets/${queryParams}`
  );
};

export const getTicket = async (
  id: number,
  teamId: number
): Promise<AxiosResponse<ReadTicketRecord>> =>
  await axiosInstance.get<ReadTicketRecord>(
    `/api/teams/${teamId}/tickets/${id}/`
  );

export const deleteTicket = async (
  record: ReadTicketRecord,
  teamId: number
): Promise<AxiosResponse<void>> =>
  await axiosInstance.delete<void>(`/api/teams/${teamId}/tickets/${record.id}`);
