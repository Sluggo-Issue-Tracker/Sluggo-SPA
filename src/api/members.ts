import { axiosInstance } from "./base";
import { MemberRecord, PaginatedList } from "@/api/types";

export const listMembers = async (
  teamId: number,
  page: number
): Promise<PaginatedList<MemberRecord>> => {
  const { data } = await axiosInstance.get<PaginatedList<MemberRecord>>(
    `/api/teams/${teamId}/members/?page=${page}`
  );
  return data;
};
