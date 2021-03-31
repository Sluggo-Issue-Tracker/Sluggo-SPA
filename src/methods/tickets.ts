import { TeamRecord } from "@/api/teams";

export function generateTicketPageLink(team: TeamRecord, ticketId: number) {
  return `/teams/${team.id}/tickets/${ticketId}/`;
}
