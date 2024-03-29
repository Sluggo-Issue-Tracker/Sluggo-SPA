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

export const listMembersDepaginated = async (
  teamId: number,
  page = 1
): Promise<MemberRecord[]> => {
  const { data } = await axiosInstance.get<PaginatedList<MemberRecord>>(
    `/api/teams/${teamId}/members/?page=${page}`
  );
  if (data.next) {
    return data.results.concat(await listMembersDepaginated(teamId, page + 1));
  } else {
    return data.results;
  }
};
