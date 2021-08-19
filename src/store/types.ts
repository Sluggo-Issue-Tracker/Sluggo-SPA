import { ReadTeamRecord, UserRecord } from "@/api/types";
import { AxiosResponse } from "axios";

export interface RootStoreState {
  token?: string;
  team?: ReadTeamRecord;
  authUser?: UserRecord;
  fetchingAuthUser?: Promise<AxiosResponse<UserRecord>>;
  error?: any;
}
