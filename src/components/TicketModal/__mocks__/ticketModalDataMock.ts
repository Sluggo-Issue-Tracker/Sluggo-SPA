/* eslint-disable @typescript-eslint/camelcase */
import {
  ReadTeamRecord,
  StatusRecordOutput,
  TagRecord,
  UserRecord,
  MemberRecord
} from "@/api/types";
import { DateTime } from "luxon";
export const mockUser: UserRecord = {
  pk: 1,
  email: "fake@fake.com",
  first_name: "fake",
  last_name: "user",
  username: "fakeuser"
};

export const mockStatuses: StatusRecordOutput[] = [
  {
    id: 7,
    object_uuid: "63bac946-15dd-11ec-9c2b-0242ac130003",
    title: "Status 1",
    color: "#48C774FF",
    created: "2021-08-16T02:03:20+0000"
  },
  {
    id: 8,
    object_uuid: "a96b191e-15dd-11ec-9c2b-0242ac130003",
    title: "Status 2",
    color: "#FFDD57FF",
    created: "2021-08-16T02:03:20+0000"
  }
];

export const mockTeam: ReadTeamRecord = {
  id: 9,
  name: "Slugbotics",
  object_uuid: "18fbfbfa-15e2-11ec-9621-0242ac130002",
  ticket_head: 25,
  created: "2021-08-16T02:03:20+0000",
  activated: null,
  deactivated: null
};

export const mockTags: TagRecord[] = [
  {
    id: 10,
    object_uuid: 354,
    title: "Test Tag 1",
    created: "2021-08-16T02:03:20+0000"
  },
  {
    id: 11,
    object_uuid: 367,
    title: "Test Tag 2",
    created: "2021-08-16T02:03:20+0000"
  }
];

export const sampleTeamData: ReadTeamRecord[] = [
  {
    id: 1,
    name: "team1",
    object_uuid: "e4451055-a8d7-461c-b80b-9a534ba76347",
    ticket_head: 0,
    created: "2021-08-16T02:03:15+0000",
    activated: null,
    deactivated: null
  },
  {
    id: 2,
    name: "team2",
    object_uuid: "b8a014be-54eb-4861-8a9e-eba928b408e9",
    ticket_head: 0,
    created: "2021-08-16T02:03:20+0000",
    activated: null,
    deactivated: null
  },
  {
    id: 3,
    name: "team3",
    object_uuid: "ff6d502f-9749-4598-8b81-7311b15728b3",
    ticket_head: 0,
    created: "2021-08-16T02:03:23+0000",
    activated: null,
    deactivated: null
  },
  {
    id: 4,
    name: "team4",
    object_uuid: "497eeb76-3897-41ab-99f2-55e0360bda29",
    ticket_head: 0,
    created: "2021-08-16T02:03:26+0000",
    activated: null,
    deactivated: null
  },
  {
    id: 5,
    name: "team5",
    object_uuid: "7d8d312d-1916-40b3-b60e-7fd399a798ce",
    ticket_head: 0,
    created: "2021-08-16T02:03:28+0000",
    activated: null,
    deactivated: null
  },
  {
    id: 6,
    name: "team6",
    object_uuid: "b4a38b54-e95f-4449-95e0-c620d5a32a03",
    ticket_head: 0,
    created: "2021-08-16T02:03:31+0000",
    activated: null,
    deactivated: null
  }
];

export const mockUsers: MemberRecord[] = [
  {
    id: "12",
    owner: mockUser,
    team_id: 9,
    object_uuid: "3ddf02ad-e4a5-48e2-b8db-07ba981fd5b7",
    role: "AD",
    created: DateTime.now(),
    activated: DateTime.now(),
    deactivated: DateTime.now()
  },
  {
    id: "13",
    owner: mockUser,
    team_id: 9,
    object_uuid: "3ddf02ad-e4a5-48e2-b8db-07ba981fd5b7",
    role: "AD",
    created: DateTime.now(),
    activated: DateTime.now(),
    deactivated: DateTime.now()
  }
];
