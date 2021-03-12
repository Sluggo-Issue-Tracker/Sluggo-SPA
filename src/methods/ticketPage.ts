import { TicketRecord } from "@/api/tickets";

export function generateTicketPageLink(teamId: number, ticketId?: number) {
    return `/teams/${team.id}` + (typeof loc !== "undefined" ? `/${loc}/` : ``);
}