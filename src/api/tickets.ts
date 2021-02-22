import { AxiosInstance } from "axios";
import { StatusRecord } from "@/api/statuses";
import { TeamRecord } from "@/api/teams";
import { UserRecord } from "@/api/auth";
import { PaginatedList } from "@/api/base";

export interface WriteTicketRecord {
    tag_list: Array<Number>;
    parent_id: number;
    owner: UserRecord;
    assigned_user: UserRecord;
    status: number;
    title: string;
    description: string;
}

export interface TicketRecord {
    id: number;
    ticket_number: number;
    tag_list: Array<Number>;
    owner: UserRecord;
    object_uuid: number;
    assigned_user: UserRecord;
    status: StatusRecord;
    title: string;
    description: string;
    comments: Array<number>; // TODO: tdimhcsleumas 2/22/2021, this will eventually change to a comment record
    created: string; // TODO: conver these to datetime objects
    activated: string;
    deactivated: string;
}

export async function createTicket(
    record: TicketRecord,
    team: TeamRecord,
    axios: AxiosInstance
): Promise<TicketRecord> {
    const response = await axios.post(`/api/teams/${team.id}/tickets`, record); 
    return response.data as TicketRecord;
}

export async function updateTicket(
    id: number,
    record: WriteTicketRecord,
    team: TeamRecord,
    axios: AxiosInstance
): Promise<TicketRecord> {
    const response = await axios.patch(`/api/teams/${team.id}/tickets/${id}/`, record);
    return response.data as TicketRecord;
}

export async function listTickets(
    team: TeamRecord,
    axios: AxiosInstance
): Promise<PaginatedList<TicketRecord>> {
    const response = await axios.get(`/api/teams/${team.id}/tickets/`);
    return response.data as PaginatedList<TicketRecord>;
}

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
    const response = await axios.delete(`/api/teams/${team.id}/tickets/${record.id}`);
}