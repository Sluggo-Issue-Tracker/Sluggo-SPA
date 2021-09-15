import "@testing-library/jest-dom";
import TicketModal from "@/components/TicketModal/TicketModal.vue";
import * as TeamAPI from "@/api/teams";
import * as MembersAPI from "@/api/members";
import * as TagsAPI from "@/api/tags";
import * as TicketsAPI from "@/api/tickets";
import * as StatusesAPI from "@/api/statuses";
import { render, waitFor } from "@testing-library/vue";
import {
  mockStatuses,
  mockTags,
  mockTeam,
  mockMembers,
  mockTicket,
  sampleTeamData
} from "@/components/TicketModal/__mocks__/ticketModalDataMock";

const renderCreateModal = async () => {
  const renderResult = render(TicketModal);
  await waitFor(() =>
    expect(renderResult.getByTestId("ticket-modal")).toBeDefined()
  );
  return renderResult;
};

const renderEditModal = async () => {
  const renderResult = render(TicketModal, {
    props: {
      ticketId: 14,
      teamId: 1
    }
  });
  await waitFor(() =>
    expect(renderResult.getByTestId("ticket-modal")).toBeDefined()
  );
  return renderResult;
};

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
      .mockImplementation(async () => mockMembers);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("shows default title", async () => {
    const { getByTestId } = await renderCreateModal();

    expect(getByTestId("ticket-title-text")).toHaveTextContent("Title");
  });

  it("shows first status from API response", async () => {
    const { getByTestId } = await renderCreateModal();

    expect(getByTestId("statuses-dropdown")).toHaveTextContent("Status 1");
  });

  it("shows no user", async () => {
    const { getByTestId } = await renderCreateModal();

    expect(getByTestId("users-dropdown")).toHaveTextContent("None");
  });

  it("shows first team from API response", async () => {
    const { getByTestId } = await renderCreateModal();

    expect(getByTestId("teams-dropdown")).toHaveTextContent("team1");
  });

  it("has no due date", async () => {
    const { getByTestId } = await renderCreateModal();

    expect(getByTestId("ticket-due-date")).toBeEmptyDOMElement();
  });

  it("has no description", async () => {
    const { getByTestId } = await renderCreateModal();

    expect(getByTestId("ticket-description")).toBeEmptyDOMElement();
  });
});

describe("<TicketModal> when updating ticket", () => {
  beforeAll(() => {
    jest
      .spyOn(StatusesAPI, "listStatuses")
      .mockImplementation(async () => mockStatuses);
    jest.spyOn(TeamAPI, "getTeam").mockImplementation(async () => mockTeam);
    jest.spyOn(TagsAPI, "listTags").mockImplementation(async () => mockTags);
    jest
      .spyOn(MembersAPI, "listMembersDepaginated")
      .mockImplementation(async () => mockMembers);
    jest
      .spyOn(TicketsAPI, "getTicket")
      .mockImplementation(async () => mockTicket);
  });
  afterAll(() => {
    jest.resetAllMocks();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("shows ticket title", async () => {
    const { getByTestId } = await renderEditModal();

    expect(getByTestId("ticket-title-text")).toHaveTextContent("Test Title 1");
  });

  it("shows ticket status", async () => {
    const { getByTestId } = await renderEditModal();

    expect(getByTestId("statuses-dropdown")).toHaveTextContent("Status 2");
  });

  it("shows assigned user", async () => {
    const { getByTestId } = await renderEditModal();

    expect(getByTestId("users-dropdown")).toHaveTextContent("Cruz123");
  });

  it("shows ticket team", async () => {
    const { getByTestId } = await renderEditModal();

    expect(getByTestId("teams-dropdown")).toHaveTextContent("Slugbotics");
  });

  it("shows formatted due date", async () => {
    const { getByTestId } = await renderEditModal();

    expect(getByTestId("ticket-due-date")).toHaveDisplayValue("2021-08-16");
  });
  it("shows ticket description", async () => {
    const { getByTestId } = await renderEditModal();

    expect(getByTestId("ticket-description")).toHaveDisplayValue(
      "Test Description"
    );
  });
});
