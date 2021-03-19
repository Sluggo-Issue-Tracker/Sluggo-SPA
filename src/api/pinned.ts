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
    `/api/teams/${teamId}/members/${memberPk}/pinned_tickets`
  );

  return response.data as PinnedTicketRecord[];
}
