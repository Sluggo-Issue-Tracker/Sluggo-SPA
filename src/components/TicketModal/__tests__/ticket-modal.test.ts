import "@testing-library/jest-dom";
import TicketModal from "@/components/TicketModal/TicketModal.vue";
import * as TeamAPI from "@/api/teams";
import * as MembersAPI from "@/api/members";
import * as TagsAPI from "@/api/tags";
import * as StatusesAPI from "@/api/statuses";
import { render, waitFor } from "@testing-library/vue";
import {
  mockStatuses,
  mockTags,
  mockTeam,
  mockUser,
  mockUsers,
  sampleTeamData
} from "@/components/TicketModal/__mocks__/ticketModalDataMock";

describe("<TicketModal> when creating ticket", () => {
  beforeAll(() => {
    jest
      .spyOn(StatusesAPI, "listStatuses")
      .mockImplementation(async () => mockStatuses);
    jest.spyOn(TeamAPI, "getTeam").mockImplementation(async () => mockTeam);
    jest
      .spyOn(TeamAPI, "getUsersTeams")
      .mockImplementation(async () => sampleTeamData);
    jest.spyOn(TagsAPI, "listTags").mockImplementation(async () => mockTags);
    jest
      .spyOn(MembersAPI, "listMembersDepaginated")
      .mockImplementation(async () => mockUsers);
  });
  afterAll(() => {
    jest.resetAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("has all fields", async done => {
    const { getByTestId } = render(TicketModal);
    await waitFor(() => expect(TeamAPI.getTeam).toHaveBeenCalledTimes(1));
    expect(getByTestId("ticket-title-text")).toBeDefined();
    expect(getByTestId("statuses-dropdown")).toBeDefined();
    expect(getByTestId("users-dropdown")).toBeDefined();
    expect(getByTestId("teams-dropdown")).toBeDefined();
    expect(getByTestId("tags-dropdown")).toBeDefined();
    expect(getByTestId("ticket-due-date")).toBeDefined();
    expect(getByTestId("ticket-description")).toBeDefined();
    done();
  });
  it("shows correct title", async () => {
    const { getByTestId } = render(TicketModal);
    await waitFor(() => expect(TeamAPI.getTeam).toHaveBeenCalledTimes(1));
    expect(getByTestId("ticket-title-text")).toHaveTextContent("Title");
  });
  it("shows correct status", async () => {
    const { getByTestId } = render(TicketModal);
    await waitFor(() => expect(TeamAPI.getTeam).toHaveBeenCalledTimes(1));
    expect(getByTestId("statuses-dropdown")).toHaveTextContent("Status 1");
  });
});

/*describe("<TicketModal> when updating ticket"), () => {

}
*/
