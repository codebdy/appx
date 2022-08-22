import { createContext, useContext } from "react";

export interface IProTableParams {
  selectable?: boolean,
  selectedRowKeys?: React.Key[],
  onSelectedChange?: (keys?: React.Key[]) => void,
}


export const ProTableContext = createContext<IProTableParams>({});

export const useProTableParams = (): IProTableParams => useContext(ProTableContext) || {};

export function useSelectedKeys() {
  return useProTableParams()?.selectedRowKeys;
}