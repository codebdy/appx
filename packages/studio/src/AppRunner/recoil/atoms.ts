import { atomFamily } from "recoil";
import { ID } from "../../shared";
import { OpenPageType } from "../../shared/action";

export interface IPagePopup {
  id: string;
  pageId: ID;
  openType: OpenPageType;
  title?: string;
  width?: number | string;
  height?: number | string;
  placement?: "top" | "right" | "bottom" | "left";
}

export const pagePopupsState = atomFamily<IPagePopup[], string>({
  key: "runner.pagePopups",
  default: [],
})
