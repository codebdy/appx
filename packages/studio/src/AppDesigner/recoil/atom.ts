import { atomFamily } from "recoil";
import { IPage, IPageCategory } from "../../model";
import { ID } from "../../shared";

export const selectedPageIdState = atomFamily<ID | undefined, string>({
  key: "designer.selectedPageId",
  default: undefined,
})

export const categoriesState = atomFamily<IPageCategory[], string>({
  key: "designer.categories",
  default: [],
})

export const pagesState = atomFamily<IPage[], string>({
  key: "designer.pages",
  default: [],
})
