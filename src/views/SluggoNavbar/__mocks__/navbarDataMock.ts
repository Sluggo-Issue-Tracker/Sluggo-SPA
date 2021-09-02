/* eslint-disable @typescript-eslint/camelcase */
import { ReadTeamRecord, UserRecord } from "@/api/types";
import { createRouter, createWebHistory } from "vue-router";
import RouterMockComponent from "@/views/SluggoNavbar/__mocks__/RouterMockedComponent.vue";

export const mockUser: UserRecord = {
  pk: "1",
  email: "fake@fake.com",
  first_name: "fake",
  last_name: "user",
  username: "fakeuser"
};

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

export const mockRouter = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: RouterMockComponent
    },
    {
      path: "/teams/:id/tickets",
      name: "TeamsTickets",
      component: RouterMockComponent
    },
    {
      path: "/teams/:id/members",
      name: "TeamsMembers",
      component: RouterMockComponent
    },
    {
      path: "/teams/:id/admin",
      name: "TeamsAdmin",
      component: RouterMockComponent
    }
  ]
});
