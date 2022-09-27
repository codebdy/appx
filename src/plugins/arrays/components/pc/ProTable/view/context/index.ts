import { createContext, useContext } from "react";
import { IDataBindSource } from "src/datasource";
import { IOrderBy } from "src/datasource/model/IOrderBy";
import { IQueryForm } from "src/datasource/model/IQueryForm";
import { IProTableConfig } from "./IProTableConfig";

export interface ITableChangeParams {
  current?: number,
  orderBys?: IOrderBy[],
  pageSize?: number,
}
export interface IProTableParams {
  dataBind?: IDataBindSource,
  selectable?: boolean,
  selectedRowKeys?: React.Key[],
  queryForm?: IQueryForm,
  orderBys?: IOrderBy[],
  paginationPosition?: "bottomLeft" | "bottomCenter" | "bottomRight",
  pageSize?: number,
  current?: number,
  refreshFlag?: number,
  path?: string,
  tableConfig?: IProTableConfig,
  columns?: {
    name: string,
    title?: string,
  }[],
}

export const ProTableContext = createContext<IProTableParams>({});

export const useProTableParams = (): IProTableParams => useContext(ProTableContext) || {};

export function useSelectedKeys() {
  return useProTableParams()?.selectedRowKeys;
}

export function useSelectable() {
  return useProTableParams()?.selectable;
}