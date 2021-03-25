// pinned.ts - pinned tickets methods

import { AxiosInstance } from "axios";
import { TicketRecord } from "@/api/tickets";

export interface PinnedTicketRecord {
  ticket: TicketRecord;
  pinned: string; // date time
  object_uuid: string;
  created: string; // date
  id: string; // pk
}

export async function getPinnedTicketsForMember(
  axios: AxiosInstance,
  teamId: number,
  memberPk: string
) {
  const response = await axios.get(
    `/api/teams/${teamId}/members/${memberPk}/pinned_tickets/`
  );

  console.log(response);

  return response.data as PinnedTicketRecord[];
}

export async function deletePinnedTicket(
  axios: AxiosInstance,
  teamId: number,
  memberPk: string,
  pinnedTicketPk: string
) {
  await axios.delete(
    `/api/teams/${teamId}/members/${memberPk}/pinned_tickets/${pinnedTicketPk}/`
  );

  return;
}

export async function postPinnedTicket(
  axios: AxiosInstance,
  teamId: number,
  memberPk: string,
  ticketId: number
): Promise<PinnedTicketRecord> {
  const response = await axios.post(
    `/api/teams/${teamId}/members/${memberPk}/pinned_tickets/`,
    {
      ticket: ticketId
    }
  );

  return response.data as PinnedTicketRecord;
}

export async function getPinnedTicketForTicket(
  axios: AxiosInstance,
  teamId: number,
  memberPk: string,
  ticketId: number
): Promise<PinnedTicketRecord> {
  const pinnedTickets = await getPinnedTicketsForMember(
    axios,
    teamId,
    memberPk
  );

  const desiredTickets = pinnedTickets.filter(pt => pt.ticket.id === ticketId);

  if (desiredTickets.length < 1) {
    throw Error("Pinned ticket record not found.");
  }

  const pinRecord = desiredTickets[0];

  return pinRecord;
}
