import { NewTeamRecord, ReadTeamRecord } from "@/api/types";
import { axiosInstance } from "@/api/base";
import { AxiosResponse } from "axios";

export const createTeam = async ({
  name
}: NewTeamRecord): Promise<AxiosResponse<ReadTeamRecord>> =>
  await axiosInstance.post<ReadTeamRecord>("/api/teams", {
    name,
    description: "UNUSED"
  });

export const getTeam = async (
  teamId: number
): Promise<AxiosResponse<ReadTeamRecord>> =>
  await axiosInstance.get<ReadTeamRecord>(`/api/teams/${teamId}`);

export const getUsersTeams = async (): Promise<AxiosResponse<
  ReadTeamRecord[]
>> => await axiosInstance.get<ReadTeamRecord[]>("/api/teams");
