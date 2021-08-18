import { render, fireEvent, waitFor } from "@testing-library/vue";
import UserProvidedNavbar from "../UserProvidedNavbar.vue";

describe("<SluggoNavbar>", () => {
  it("correctly handles user loading state", async done => {
    const { getByTestId } = render(UserProvidedNavbar);

    const loadingContainer = getByTestId("user-loading-container");
    expect(loadingContainer).toBeTruthy();

    done();
  });

  it("correctly handles team loading state", async done => {
    done();
  });

  it("handles when data loads", async done => {
    done();
  });

  it("correctly handles team error state", async done => {
    done();
  });
});
