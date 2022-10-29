import { createContext, useContext } from "react";
import { IOrderBy } from "src/datasource/model/IOrderBy";

export interface ITableConfig {
  size?: "middle" | "small",
  columns?: string[],
  sortedColumns?: string[],
}

export interface ITableParams {
  tableConfig?: ITableConfig,
  columns?: {
    name: string,
    title?: string,
  }[],
}

export const TableContext = createContext<ITableParams>({});

export const useTableParams = (): ITableParams => useContext(TableContext) || {};
