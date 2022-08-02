import { IPageList } from "../../../../model";
import { IPageListInput } from "../../../../model/input";
import { useCallback } from "react";
import { useUpdateCategory } from "./useUpdateCategory";
import { IPostOptions, usePostOne } from "../../../../enthooks/hooks/usePostOne";

export function useCreatePage(options?: IPostOptions<any>): [
  (title: string, categoryUuid?: string) => void,
  { loading?: boolean; error?: Error }
] {

  const updateCategory = useUpdateCategory();

  const [post, { error, loading }] = usePostOne<IPageListInput, IPageList>("Page",
    { ...options, fieldsGql: "id title" }
  )

  const create = useCallback((title: string, categoryUuid?:string) => {

  }, []);

  return [create, { error, loading }]
}