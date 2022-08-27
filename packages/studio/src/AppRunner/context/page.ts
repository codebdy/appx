import { createContext, useContext } from "react";
import { OpenPageType } from "../../shared/action";

export interface IPageParams {
  openType: OpenPageType,
  containerId?: string,
}


export const PageContext = createContext<IPageParams | undefined>(undefined);

export const usePageParams = (): IPageParams | undefined => useContext(PageContext);
