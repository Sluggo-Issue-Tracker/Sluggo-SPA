import { UserRecord } from "@/api/users";

export function userNameForUser(user: UserRecord) {
  // In the event someone doesn't have at least a first name,
  // fall back.
  if (!user.first_name || !user.first_name.trim()) {
    return user.username;
  }

  // If someone doesn't have a last name, but has a first name,
  // prefer the first name to the username.
  if (!user.last_name || !user.last_name.trim()) {
    return user.first_name;
  }

  return user.first_name + " " + user.last_name;
}
