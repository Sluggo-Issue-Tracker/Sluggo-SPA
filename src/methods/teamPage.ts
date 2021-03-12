import { TeamRecord } from "@/api/teams";

export function generateTeamPageLink(team: TeamRecord, loc?: string) {
  return `/teams/${team.id}` + (typeof loc !== "undefined" ? `/${loc}/` : ``);
}

export function generateTicketPageLink(teamId: string, selectedId?: number) {
  return `/teams/${teamId}/tickets/${selectedId ?? ''}`;
}