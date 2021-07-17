import { axiosInstance} from "./base";
import { APIResponse, MemberRecord, PaginatedList } from "@/api/types";
import { requestWrapper } from "@/api/util";

export const listMembers = async (
  teamId: number,
  page: number
): Promise<APIResponse<PaginatedList<MemberRecord>>> =>
  await requestWrapper(
    axiosInstance.get,
    `/api/teams/${teamId}/members/?page=${page}`
  );
