import { atomFamily } from "recoil";
import { ID } from "../../shared";

export const selectedPageIdState = atomFamily<ID | undefined, string>({
  key: "designer.selectedPageId",
  default: undefined,
})