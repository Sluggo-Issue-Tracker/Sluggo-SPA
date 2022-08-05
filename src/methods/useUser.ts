import { userKey } from "@/api/types";
import { inject } from "vue";

export const useUser = () => {
  return inject(userKey);
};
