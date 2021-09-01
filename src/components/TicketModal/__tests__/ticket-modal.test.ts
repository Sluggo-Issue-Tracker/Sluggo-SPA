import "@testing-library/jest-dom";
import TicketModal from "@/components/TicketModal/TicketModal.vue";
import { render } from "@testing-library/vue";

describe("<TicketModal>", () => {

    it("has all fields", ( )=> {
        const { getByTestId } = render(TicketModal);

        expect(getByTestId("ticket-title-text")).toBeDefined();
        expect(getByTestId("statuses-dropdown")).toBeDefined();
        expect(getByTestId("users-dropdown")).toBeDefined();
        expect(getByTestId("teams-dropdown")).toBeDefined();
        expect(getByTestId("tags-dropdown")).toBeDefined();
        expect(getByTestId("ticket-due-date")).toBeDefined();
        expect(getByTestId("ticket-description")).toBeDefined();

    });

})
