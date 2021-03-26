import { UserRecord } from "@/api/users";
import { dateStringForDate, userNameForUser } from "@/methods/common";
import { DateTime } from "luxon";

describe("Testing userNameForUser method", () => {
  it("Will give first name and last name combined if defined", () => {
    const user: UserRecord = {
      id: 0,
      email: "example@example.com",
      first_name: "Example",
      last_name: "User",
      username: "username"
    };

    const expectedName = "Example User";

    expect(userNameForUser(user)).toBe(expectedName);
  });

  it("Will give first name if the last name is not present", () => {
    const user: UserRecord = {
      id: 0,
      email: "example@example.com",
      first_name: "Example",
      last_name: undefined,
      username: "username"
    };

    const expectedName = "Example";

    expect(userNameForUser(user)).toBe(expectedName);
  });

  it("Will give first name if the last name is blank", () => {
    const user: UserRecord = {
      id: 0,
      email: "example@example.com",
      first_name: "Example",
      last_name: " ",
      username: "username"
    };

    const expectedName = "Example";

    expect(userNameForUser(user)).toBe(expectedName);
  });

  it("Will give username if the first name is not present", () => {
    const user: UserRecord = {
      id: 0,
      email: "example@example.com",
      first_name: undefined,
      last_name: "Irrelevant",
      username: "username"
    };

    const expectedName = "username";

    expect(userNameForUser(user)).toBe(expectedName);
  });

  it("Will give username if the first name is blank", () => {
    const user: UserRecord = {
      id: 0,
      email: "example@example.com",
      first_name: " ",
      last_name: "Irrelevant",
      username: "username"
    };

    const expectedName = "username";

    expect(userNameForUser(user)).toBe(expectedName);
  });
});

describe("Testing the date method", () => {
  it("Correctly formats the date of UNIX epoch into human readable form", () => {
    const date = DateTime.local(2020, 3, 13);
    const expectedDate = "March 13, 2020";

    expect(dateStringForDate(date)).toBe(expectedDate);
  })
})