import { IDataBindSource } from "../../../../datasource";
import { createContext, useContext } from "react";
import { IQueryForm } from "../../../../datasource/model/IQueryForm";
import { IOrderBy } from "../../../../datasource/model/IOrderBy";

export interface ITableChangeParams {
  current?: number,
  sorter?: IOrderBy[],
  pageSize?: number,
}
export interface IProTableParams {
  dataBind?: IDataBindSource,
  selectable?: boolean,
  selectedRowKeys?: React.Key[],
  queryForm?: IQueryForm,
  sorter?: IOrderBy[],
  onSelectedChange?: (keys?: React.Key[]) => void,
  onSetQueryForm?: (form?: IQueryForm) => void,
  paginationPosition?: "bottomLeft" | "bottomCenter" | "bottomRight",
  pageSize?: number,
  current?: number,
  onTableChange?: (changeParams: ITableChangeParams) => void,
}

export const ProTableContext = createContext<IProTableParams>({});

export const useProTableParams = (): IProTableParams => useContext(ProTableContext) || {};

export function useSelectedKeys() {
  return useProTableParams()?.selectedRowKeys;
}

export function useSelectable() {
  return useProTableParams()?.selectable;
}