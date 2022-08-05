import { DateTime } from "luxon";
import { InjectionKey } from "vue";

export interface UserRecord {
  pk: number;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
}

export interface StatusRecordInput {
  title: string;
  color: string;
}

export interface StatusRecordOutput {
  id: number;
  object_uuid: string;
  title: string;
  color: string;
  created: string;
  activated?: string;
  deactivated?: string;
}

export interface WriteTagRecord {
  title: string;
}

export interface TagRecord {
  id: number;
  object_uuid: string;
  title: string;
  created: string;
  activated?: string;
  deactivated?: string;
}

export interface WriteTicketRecord {
  tag_list?: Array<number>;
  assigned_user?: string;
  status?: number;
  title: string;
  description?: string;
  due_date?: string;
}

export interface ReadTicketRecord {
  id: number;
  ticket_number: number;
  tag_list: Array<TagRecord>;
  object_uuid: string;
  assigned_user?: MemberRecord;
  status?: StatusRecordOutput;
  team: ReadTeamRecord;
  title: string;
  description?: string;
  created: string;
  activated?: string;
  deactivated?: string;
  due_date?: string;
}

export interface TicketFilterOptions {
  search?: string;
  owner?: UserRecord;
  assigned?: UserRecord;
}

export interface MemberRecord {
  id: string;
  owner: UserRecord;
  team_id: number;
  object_uuid: string;
  role: string;
  bio?: string;
  created: DateTime;
  activated: DateTime;
  deactivated: DateTime;
}

export interface NewTeamRecord {
  name: string;
  description: string;
}

export interface ReadTeamRecord {
  id: number;
  name: string;
  object_uuid: string;
  ticket_head: number;
  created: string;
  activated: string | null;
  deactivated: string | null;
}

export interface PaginatedList<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<T>;
}

export const userKey: InjectionKey<UserRecord> = Symbol();
