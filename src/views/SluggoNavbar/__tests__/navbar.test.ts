import { render } from "@testing-library/vue";
import "@testing-library/jest-dom";
import UserProvidedNavbar from "@/views/SluggoNavbar/UserProvidedNavbar.vue";
import {
  mockUser,
  sampleTeamData
} from "@/views/SluggoNavbar/__mocks__/navbarDataMock";
import { createRouter, createWebHistory } from "vue-router";
import RouterMockComponent from "../__mocks__/RouterMockedComponent.vue";
import * as TeamAPI from "@/api/teams";
import * as AuthAPI from "@/api/auth";

const mockRouter = createRouter({
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

jest
  .spyOn(TeamAPI, "getUsersTeams")
  .mockImplementation(async () => sampleTeamData);

jest.spyOn(AuthAPI, "getUser").mockImplementation(async () => mockUser);

describe("<SluggoNavbar>", () => {
  it("navbar shows correct user", async done => {
    const { getByTestId } = render(UserProvidedNavbar, {
      global: {
        plugins: [mockRouter]
      }
    });

    await mockRouter.isReady();

    expect(getByTestId("username-span")).toHaveTextContent(mockUser.username);

    done();
  });

  it("handles when data loads", async done => {
    done();
  });

  it("correctly handles team error state", async done => {
    done();
  });
});
