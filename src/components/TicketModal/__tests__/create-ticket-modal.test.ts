import "@testing-library/jest-dom";
import CreateTicketModal from "@/components/TicketModal/CreateTicketModal.vue";
import { render } from "@testing-library/vue";

describe("<CreateTicketModal>", () => {
  it("has all fields", () => {
    const { getByTestId } = render(CreateTicketModal);

    expect(getByTestId("ticket-title-text")).toBeDefined();
    expect(getByTestId("statuses-dropdown")).toBeDefined();
    expect(getByTestId("users-dropdown")).toBeDefined();
    expect(getByTestId("teams-dropdown")).toBeDefined();
    expect(getByTestId("tags-dropdown")).toBeDefined();
    expect(getByTestId("ticket-due-date")).toBeDefined();
    expect(getByTestId("ticket-description")).toBeDefined();
  });
});
