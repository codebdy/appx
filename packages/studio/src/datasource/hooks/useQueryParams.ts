import { useMemo } from "react";
import { Schema } from '@formily/json-schema';
import { IDataBindSource } from "../model";

export interface IQueryParams {
  gql?: string,
  variables?: any,
  dataField?: string,
}

export function useQueryParams(dataBindSource?: IDataBindSource, schema?: Schema): IQueryParams {
  const params = useMemo(() => ({}), []);

  return params
}