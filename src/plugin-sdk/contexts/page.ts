import { createContext } from "react";
import { IPage } from "~/model";

export interface IPageContextParams {
  page: IPage,

}
export const PageContext = createContext<IPageContextParams>({} as any);

