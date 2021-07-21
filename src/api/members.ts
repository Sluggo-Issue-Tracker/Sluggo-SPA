import { axiosInstance } from "./base";
import { MemberRecord, PaginatedList } from "@/api/types";
import { AxiosResponse } from "axios";

export const listMembers = async (
  teamId: number,
  page: number
): Promise<AxiosResponse<PaginatedList<MemberRecord>>> =>
  await axiosInstance.get<PaginatedList<MemberRecord>>(
    `/api/teams/${teamId}/members/?page=${page}`
  );
