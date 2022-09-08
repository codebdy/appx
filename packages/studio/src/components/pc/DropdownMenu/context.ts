import { createContext, useContext } from "react";

export interface IDropdownMenuParams {
  loading?: boolean,
  setLoading?: (loading?:boolean)=>void,
}

export const DropdownContext = createContext<IDropdownMenuParams>({});

export const useDropdownParams = (): IDropdownMenuParams => useContext(DropdownContext) || {};
