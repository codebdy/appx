import { IApp } from "../model";
import { ID } from "../shared";
import { useQueryOne } from "./useQueryOne";

export function useApp(id: ID): IQueryResponse<IApp> {
  return useQueryOne<IApp>(STORAGE_KEY_APPS, id)
}