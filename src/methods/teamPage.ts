import { ReadTeamRecord } from "@/api/types";

export function generateTeamPageLink(team: ReadTeamRecord, loc?: string) {
  return `/teams/${team.id}` + (typeof loc !== "undefined" ? `/${loc}/` : ``);
}

export function generateTicketPageLink(teamId: string, selectedId?: number) {
  return `/teams/${teamId}/tickets/${selectedId ?? ''}`;
}