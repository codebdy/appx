import { IPage, IPageList } from "packages/studio/src/model";
import { atomFamily } from "recoil";
import { IListNode } from "./IListNode";

export const nodesState = atomFamily<IListNode[], string>({
  key: "pagelist.nodes",
  default: [],
});

export const pagesState = atomFamily<IPage[], string>({
  key: "pagelist.pages",
  default: [],
});

export const pageListState = atomFamily<IPageList | undefined, string>({
  key: "pagelist.PageList",
  default: undefined,
});
