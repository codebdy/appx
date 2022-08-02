import { IDeleteOptions, useDeleteById } from "../../../../enthooks/hooks/useDeleteById";
import { IPage } from "../../../../model";

export function useDeletePage(options?: IDeleteOptions<IPage>) {
  return useDeleteById<IPage>("Page", options)
}