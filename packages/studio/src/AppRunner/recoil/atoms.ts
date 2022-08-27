import { atomFamily } from "recoil";
import { ID } from "../../shared";

export interface IPageDialog {
  pageId: ID;
  width?: number | string;
}

export interface IPageDrawer {
  pageId: ID;
  width?: number | string;
  height?: number | string;
  placement?: "top" | "right" | "bottom" | "left";
}

export const pageDialogsState = atomFamily<IPageDialog[], string>({
  key: "runner.pageDialogs",
  default: [],
})

export const pageDrawersState = atomFamily<IPageDrawer[], string>({
  key: "runner.pageDrawers",
  default: [],
})