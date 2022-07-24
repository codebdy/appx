import { IApp } from "../model";
import { STORAGE_KEY_APPS } from "./consts";
import { IQueryResponse } from "./IQueryResponse";
import { useQuery } from "./useQuery";

export function useApps(): IQueryResponse<IApp[]> {
  return useQuery<IApp[]>(STORAGE_KEY_APPS)
}