import { fireEvent, render, waitFor } from "@testing-library/vue";
import "@testing-library/jest-dom";
import UserProvidedNavbar from "@/views/SluggoNavbar/UserProvidedNavbar.vue";
import {
  mockRouter,
  mockUser,
  sampleTeamData
} from "@/views/SluggoNavbar/__mocks__/navbarDataMock";
import * as TeamAPI from "@/api/teams";
import * as AuthAPI from "@/api/auth";

const renderNavbarAndAwaitRouter = async () => {
  const renderResult = render(UserProvidedNavbar, {
    global: {
      plugins: [mockRouter]
    }
  });

  // navbar readies itself async. need to await it being ready.
  await mockRouter.isReady();
  return renderResult;
};

describe("<SluggoNavbar>", () => {
  beforeAll(() => {
    jest.spyOn(AuthAPI, "getUser").mockImplementation(async () => mockUser);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it("navbar shows correct user", async done => {
    const { getByTestId } = await renderNavbarAndAwaitRouter();

    expect(getByTestId("username-span")).toHaveTextContent(mockUser.username);

    done();
  });

  it("sidebar indicates loading state", async done => {
    // start timeout that should not resolve any time soon
    jest.spyOn(TeamAPI, "getUsersTeams").mockImplementationOnce(async () => {
      await new Promise(resolve => setTimeout(resolve, 10000));
      return sampleTeamData;
    });

    const { getByTestId } = await renderNavbarAndAwaitRouter();

    expect(getByTestId("sidebar-team-loading")).toBeInTheDocument();

    done();
  });

  it("correctly handles team error state", async done => {
    jest.spyOn(TeamAPI, "getUsersTeams").mockImplementationOnce(async () => {
      throw Error("");
    });

    const { getByTestId } = await renderNavbarAndAwaitRouter();

    expect(getByTestId("sidebar-team-error")).toBeInTheDocument();

    done();
  });
});

describe("<SluggoNavbar>'s Sidebar", () => {
  beforeAll(() => {
    jest
      .spyOn(TeamAPI, "getUsersTeams")
      .mockImplementation(async () => sampleTeamData);
    jest.spyOn(AuthAPI, "getUser").mockImplementation(async () => mockUser);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it("shows the correct number of team links", async done => {
    const { getAllByTestId } = await renderNavbarAndAwaitRouter();

    const teams = getAllByTestId("team-details-container");

    expect(teams.length).toStrictEqual(sampleTeamData.length);

    for (let i = 0; i < teams.length; ++i) {
      expect(teams[i]).toHaveTextContent(sampleTeamData[i].name);
    }

    done();
  });

  it("is home by default", async done => {
    const { getByTestId } = await renderNavbarAndAwaitRouter();

    // router is async, therefore we wait
    await waitFor(() =>
      expect(getByTestId("route-name-div")).toHaveTextContent("Home")
    );

    done();
  });

  it("changes the route if home is clicked", async done => {
    const { getByTestId } = await renderNavbarAndAwaitRouter();

    const homeButton = getByTestId("home-button");
    await fireEvent.click(homeButton);

    // router is async, therefore we wait
    await waitFor(() =>
      expect(getByTestId("route-name-div")).toHaveTextContent("Home")
    );

    done();
  });

  it("changes the route if each team subView is clicked, and home can be returned", async done => {
    const { getAllByTestId, getByTestId } = await renderNavbarAndAwaitRouter();

    const pressAndExpectRouteChange = async (id: string, expected: string) => {
      const button = getByTestId(id);
      await fireEvent.click(button);

      // router is async, therefore we wait
      await waitFor(() =>
        expect(getByTestId("route-name-div")).toHaveTextContent(expected)
      );
    };

    const teams = getAllByTestId("team-details-container");

    // validate that all the links work
    for (const team of teams) {
      await fireEvent.click(team);
      await pressAndExpectRouteChange("tickets-link", "TeamsTickets");
      await pressAndExpectRouteChange("members-link", "TeamsMembers");
      await pressAndExpectRouteChange("admin-link", "TeamsAdmin");
      await fireEvent.click(team);
    }

    const homeButton = getByTestId("home-button");
    await fireEvent.click(homeButton);

    // router is async, therefore we wait
    await waitFor(() =>
      expect(getByTestId("route-name-div")).toHaveTextContent("Home")
    );

    done();
  });
});
