import { createContext, useContext } from "react";
import { IDataBindSource } from "~/datasource";
import { IOrderBy } from "~/datasource/model/IOrderBy";
import { IQueryForm } from "~/datasource/model/IQueryForm";

export interface IArrayParams {
  dataBind?: IDataBindSource,
  selectable?: boolean,
  selectedRowKeys?: React.Key[],
  queryForm?: IQueryForm,
  orderBys?: IOrderBy[],
  hasPagination?: boolean,
  paginationPosition?: "bottomLeft" | "bottomCenter" | "bottomRight",
  pageSize?: number,
  current?: number,
  refreshFlag?: number,
  path?: string,
}

export const ArrayContext = createContext<IArrayParams>({});

export const useArrayParams = (): IArrayParams => useContext(ArrayContext) || {};

export function useSelectedKeys() {
  return useArrayParams()?.selectedRowKeys;
}

export function useSelectable() {
  return useArrayParams()?.selectable;
}