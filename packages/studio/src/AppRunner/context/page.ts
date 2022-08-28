import { createContext, useContext } from "react";
import { ID } from "../../shared";
import { OpenPageType } from "../../shared/action";

export interface IPageParams {
  openType: OpenPageType,
  containerId?: string,
  dataId?: ID,
}


export const PageContext = createContext<IPageParams | undefined>(undefined);

export const usePageParams = (): IPageParams | undefined => useContext(PageContext);
