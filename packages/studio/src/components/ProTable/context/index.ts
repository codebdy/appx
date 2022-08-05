import { createContext, useContext } from "react";

export interface IProTableParams {
  localesAdded?: boolean,
}


export const ProTableContext = createContext<IProTableParams>({ localesAdded: false });

export const useProTableParams = (): IProTableParams => useContext(ProTableContext) || {};

