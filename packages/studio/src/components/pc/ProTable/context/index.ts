import { IDataBindSource } from "../../../../datasource";
import { createContext, useContext } from "react";
import { IQueryForm } from "../../../../datasource/model/IQueryForm";
import { IOrderBy } from "../../../../datasource/model/IOrderBy";
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
  //onSelectedChange?: (keys?: React.Key[]) => void,
  //onSetQueryForm?: (form?: IQueryForm) => void,
  paginationPosition?: "bottomLeft" | "bottomCenter" | "bottomRight",
  pageSize?: number,
  current?: number,
  refreshFlag?: number,
  size?: "middle" | "small",
  path?: string,
  tableConfig?: IProTableConfig,
  //onTableChange?: (changeParams: ITableChangeParams) => void,
}

export const ProTableContext = createContext<IProTableParams>({});

export const useProTableParams = (): IProTableParams => useContext(ProTableContext) || {};

export function useSelectedKeys() {
  return useProTableParams()?.selectedRowKeys;
}

export function useSelectable() {
  return useProTableParams()?.selectable;
}