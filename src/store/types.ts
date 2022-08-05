import { UserRecord } from "@/api/types";

export interface RootStoreState {
  authUser: UserRecord | undefined;
  error: any | undefined;
}
