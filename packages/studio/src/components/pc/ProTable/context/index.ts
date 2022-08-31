import { IDataBindSource } from "../../../../datasource";
import { createContext, useContext } from "react";
import { IQueryForm } from "../../../../datasource/model/IQueryForm";

export interface IProTableParams {
  dataBind?: IDataBindSource,
  selectable?: boolean,
  selectedRowKeys?: React.Key[],
  queryForm?: IQueryForm,
  onSelectedChange?: (keys?: React.Key[]) => void,
  onSetQueryForm?: (form?: IQueryForm) => void,
}


export const ProTableContext = createContext<IProTableParams>({});

export const useProTableParams = (): IProTableParams => useContext(ProTableContext) || {};

export function useSelectedKeys() {
  return useProTableParams()?.selectedRowKeys;
}

export function useSelectable() {
  return useProTableParams()?.selectable;
}