/* eslint-disable @typescript-eslint/camelcase */
import { APIResponse, NewTeamRecord, ReadTeamRecord } from "@/api/types";
import { axiosInstance } from "@/api/base";
import { requestWrapper } from "@/api/util";

export const createTeam = async ({
  name
}: NewTeamRecord): Promise<APIResponse<ReadTeamRecord>> =>
  await requestWrapper(axiosInstance.post, "/api/teams", {
    name,
    description: "UNUSED"
  });

export const getTeam = async (
  teamId: number
): Promise<APIResponse<ReadTeamRecord>> =>
  await requestWrapper(axiosInstance.get, `/api/teams/${teamId}`);
