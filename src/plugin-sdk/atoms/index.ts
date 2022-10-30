import { atomFamily } from "recoil";
import { IPage } from "~/model";
import { ID } from "~/shared";
import { OpenPageType } from "../model";

export interface IPagePopup {
  id: string;
  pageId?: ID;
  openType: OpenPageType;
  pageTitle?: string;
  width?: number | string;
  height?: number | string;
  placement?: "top" | "right" | "bottom" | "left";
  dataId?: ID;
}

export const pagePopupsState = atomFamily<IPagePopup[], string>({
  key: "runner.pagePopups",
  default: [],
})


export const pagesCacheState = atomFamily<IPage[], string>({
  key: "runner.pagesCache",
  default: [],
})
