/* eslint-disable @typescript-eslint/camelcase */
import { AxiosInstance } from "axios";
import { StatusRecord } from "@/api/statuses";
import { TeamRecord } from "@/api/teams";
import { UserRecord } from "@/api/auth";
import { PaginatedList } from "@/api/base";
import { TagRecord } from "@/api/tags";

export interface WriteTicketRecord {
    tag_list: Array<number>;
    assigned_user: number;
    status: number;
    title: string;
    description: string;
}

export interface TicketRecord {
    id: number;
    ticket_number: number;
    tag_list: Array<TagRecord>;
    owner: UserRecord;
    object_uuid: number;
    assigned_user: UserRecord;
    status: StatusRecord;
    title: string;
    description: string;
    comments: Array<number>; // TODO: tdimhcsleumas 2/22/2021, this will eventually change to a comment record
    created: Date; // TODO: convert these to datetime objects
    activated: Date;
    deactivated: Date;
}

const generateDetailUrl = (record: TicketRecord, team: TeamRecord) => {
    return `/api/teams/${team.id}/tickets/${record.id}/`;
}

const generateListUrl = (team: TeamRecord) => {
    return `/api/teams/${team.id}/tickets/`
}

export async function createTicket(
    record: WriteTicketRecord,
    team: TeamRecord,
    axios: AxiosInstance
): Promise<TicketRecord> {
    const response = await axios.post(generateListUrl(team), record); 
    return response.data as TicketRecord;
}

export async function updateTicket(
    record: TicketRecord,
    team: TeamRecord,
    axios: AxiosInstance
): Promise<TicketRecord> {

    const updateRecord = {
       tag_list: record.tag_list.map(
           (elem) => elem.id
       ),
       assigned_user: record.assigned_user.id,
       status: record.status.id,
       title: record.title,
       description: record.description
    } as WriteTicketRecord;

    const response = await axios.patch(generateDetailUrl(record, team), updateRecord);
    return response.data as TicketRecord;
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
    if (filter?.assigned) queryParams += `assigned__username=${filter.assigned.username}`;
    if (filter?.owner) queryParams += `owner__username=${filter.owner.username}`; 
    if (filter?.search) queryParams += `search=${filter.search}`;

    const response = await axios.get(`/api/teams/${team.id}/tickets/${queryParams}`);
    return response.data as PaginatedList<TicketRecord>;
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
    return response.data as TicketRecord;
}

export async function deleteTicket(
    record: TicketRecord,
    team: TeamRecord,
    axios: AxiosInstance
): Promise<void> {
    const response = await axios.delete(generateDetailUrl(record, team));
}