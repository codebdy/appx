import { useCallback } from "react";
import { IPostOptions, usePostOne } from "../../enthooks/hooks/usePostOne";
import { IPageList } from "../../model";
import { IPageListInput } from "../../model/input";

export function useCreateCategory(options?: IPostOptions<any>) :[
  (name: string) => void,
  { loading?: boolean; error?: Error }
] {
  const [doCreate, { error, loading }] = usePostOne<IPageListInput, IPageList>("PageList", options)

  const create = useCallback((name: string) => {

  }, [])

  return [create, {error, loading}]
}