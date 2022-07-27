import { NewTeamRecord, ReadTeamRecord } from "@/api/types";
import { axiosInstance } from "@/api/base";
import { SLUGGO_API_URL } from "../../constants";

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
