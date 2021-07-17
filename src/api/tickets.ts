/* eslint-disable @typescript-eslint/camelcase */
import { AxiosInstance } from "axios";
import { axiosInstance} from "@/api/base";
import {
  APIResponse, PaginatedList,
  ReadTicketRecord,
  TicketFilterOptions,
  WriteTicketRecord
} from "@/api/types";
import { requestWrapper } from "@/api/util";

export const createTicket = async (
  record: WriteTicketRecord,
  teamId: number
): Promise<APIResponse<ReadTicketRecord>> =>
  await requestWrapper(
    axiosInstance.post,
    `/api/teams/${teamId}/tickets/`,
    record
  );

export const updateTicket = async (
  record: ReadTicketRecord,
  teamId: number
): Promise<APIResponse<ReadTicketRecord>> => {
  const { tag_list, assigned_user, status, ...rest } = record;

  const updateRecord: WriteTicketRecord = {
    tag_list: tag_list?.map(elem => elem.id),
    assigned_user: assigned_user?.pk,
    status: status?.id,
    ...rest
  };

  return await requestWrapper(
    axiosInstance.put,
    `/api/teams/${teamId}/tickets/${record.id}/`,
    updateRecord
  );
};

export const listTickets = async (
  teamId: number,
  page: number,
  axios: AxiosInstance,
  filter?: TicketFilterOptions
): Promise<APIResponse<PaginatedList<ReadTicketRecord>>> => {
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

  return await requestWrapper(
    axiosInstance.get,
    `/api/teams/${teamId}/tickets/${queryParams}`
  );
};

export const getTicket = async (
  id: number,
  teamId: number
): Promise<APIResponse<ReadTicketRecord>> =>
  await requestWrapper(
    axiosInstance.get,
    `/api/teams/${teamId}/tickets/${id}/`
  );

export const deleteTicket = async (
  record: ReadTicketRecord,
  teamId: number
): Promise<APIResponse<void>> =>
  await requestWrapper(
    axiosInstance.delete,
    `/api/teams/${teamId}/tickets/${record.id}`
  );
