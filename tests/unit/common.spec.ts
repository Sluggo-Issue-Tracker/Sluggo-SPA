import { UserRecord } from "@/api/users";
import { userNameForUser } from "@/methods/common";

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
