import * as auth from "./auth";
import * as members from "./members";
import * as tags from "./tags";
import * as teams from "./teams";
import * as tickets from "./tickets";

export default {
  ...auth,
  ...members,
  ...tags,
  ...teams,
  ...tickets
};
