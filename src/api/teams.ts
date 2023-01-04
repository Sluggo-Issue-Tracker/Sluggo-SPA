import { NewTeamRecord, ReadTeamRecord, ReadInviteRecord } from "@/api/types";
import { axiosInstance } from "@/api/base";

export const createTeam = async ({
  name
}: NewTeamRecord): Promise<ReadTeamRecord> => {
  const { data } = await axiosInstance.post<ReadTeamRecord>("/api/teams/", {
    name,
    description: "UNUSED"
  });
  return data;
};

export const getTeam = async (teamId: number): Promise<ReadTeamRecord> => {
  const { data } = await axiosInstance.get<ReadTeamRecord>(
    `/api/teams/${teamId}/`
  );
  return data;
};

export const getUsersTeams = async (): Promise<ReadTeamRecord[]> => {
  const { data } = await axiosInstance.get<ReadTeamRecord[]>(
    "/api/user/teams/"
  );
  return data;
};

export const getUsersInvites = async (): Promise<ReadInviteRecord[]> => {
  const { data } = await axiosInstance.get<ReadInviteRecord[]>(
    "/api/user/invites/"
  );
  return data;
};

export const acceptInvite = async (
  inviteId: number
): Promise<ReadInviteRecord> => {
  const { data } = await axiosInstance.put<ReadInviteRecord>(
    `/api/user/invites/${inviteId}/`,
    {}
  );
  return data;
};

export const rejectInvite = async (inviteId: number): Promise<void> =>
  await axiosInstance.delete(`/api/user/invites/${inviteId}/`);
