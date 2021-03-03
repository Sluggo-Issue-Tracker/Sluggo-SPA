/* eslint-disable @typescript-eslint/camelcase */
import { AxiosInstance } from "axios";
import {
  StatusRecord,
  createStatusRecord,
  ReadStatusRecord
} from "@/api/statuses";
import { TeamRecord } from "@/api/teams";
import { UserRecord } from "@/api/auth";
import { PaginatedList } from "@/api/base";
import { TagRecord, ReadTagRecord, createTagRecord } from "@/api/tags";
import { DateTime } from "luxon";

export interface WriteTicketRecord {
  tag_list?: Array<number>;
  assigned_user?: number;
  status?: number;
  title: string;
  description?: string;
}

interface ReadTicketRecord {
  id: number;
  ticket_number: number;
  tag_list: Array<ReadTagRecord>;
  owner: UserRecord;
  object_uuid: number;
  assigned_user?: UserRecord;
  status?: ReadStatusRecord;
  title: string;
  description?: string;
  comments?: Array<number>; // TODO: tdimhcsleumas 2/22/2021, this will eventually change to a comment record
  created: string; // TODO: convert these to datetime objects
  activated?: string;
  deactivated?: string;
}

export interface TicketRecord {
  id: number;
  ticket_number: number;
  tag_list?: Array<TagRecord>;
  owner: UserRecord;
  object_uuid: number;
  assigned_user?: UserRecord;
  status?: StatusRecord;
  title: string;
  description?: string;
  comments?: Array<number>; // TODO: tdimhcsleumas 2/22/2021, this will eventually change to a comment record
  created: DateTime; // TODO: convert these to datetime objects
  activated?: DateTime;
  deactivated?: DateTime;
}

function createTicketRecord(response: ReadTicketRecord): TicketRecord {
  return {
    id: response.id,
    ticket_number: response.ticket_number,
    tag_list: response.tag_list?.map(elem => createTagRecord(elem)),
    owner: response.owner,
    object_uuid: response.object_uuid,
    assigned_user: response.assigned_user,
    status: response.status ? createStatusRecord(response.status) : undefined,
    title: response.title,
    description: response.description,
    comments: response.comments,
    created: DateTime.fromISO(response.created),
    activated: response.activated
      ? DateTime.fromISO(response.activated)
      : undefined,
    deactivated: response.deactivated
      ? DateTime.fromISO(response.deactivated)
      : undefined
  };
}

export async function createTicket(
  record: WriteTicketRecord,
  team: TeamRecord,
  axios: AxiosInstance
): Promise<TicketRecord> {
  const response = await axios.post(`/api/teams/${team.id}/tickets/`, record);
  return createTicketRecord(response.data as ReadTicketRecord);
}

export async function updateTicket(
  record: TicketRecord,
  team: TeamRecord,
  axios: AxiosInstance
): Promise<TicketRecord> {
  const updateRecord = {
    tag_list: record.tag_list?.map(elem => elem.id),
    assigned_user: record.assigned_user?.id,
    status: record.status?.id,
    title: record.title,
    description: record.description
  } as WriteTicketRecord;

  const response = await axios.put(
    `/api/teams/${team.id}/tickets/${record.id}/`,
    updateRecord
  );
  return createTicketRecord(response.data as ReadTicketRecord);
}

export interface FilterOptions {
  search?: string;
  owner?: UserRecord;
  assigned?: UserRecord;
}

export async function listTickets(
  team: TeamRecord,
  page: number,
  axios: AxiosInstance,
  filter?: FilterOptions
): Promise<PaginatedList<TicketRecord>> {
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

  const response = await axios.get(
    `/api/teams/${team.id}/tickets/${queryParams}`
  );
  const listing: PaginatedList<ReadTicketRecord> = response.data;

  return {
    id: listing.id,
    next: listing.next,
    previous: listing.previous,
    results: listing.results.map(elem =>
      createTicketRecord(elem as ReadTicketRecord)
    )
  };
}

// export async function listOwnedTickets(

// ) {

// }

// export async function listAssignedTickets(

// ) {

// }

// this will attach the list of subtickets, eventually
export async function getTicket(
  id: number,
  team: TeamRecord,
  axios: AxiosInstance
): Promise<TicketRecord> {
  const response = await axios.get(`/api/teams/${team.id}/tickets/${id}/`);
  return createTicketRecord(response.data);
}

export async function deleteTicket(
  record: TicketRecord,
  team: TeamRecord,
  axios: AxiosInstance
): Promise<void> {
  await axios.delete(`/api/teams/${team.id}/tickets/${record.id}/`);
}
