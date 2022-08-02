import { IPageListInput } from "packages/studio/src/model/input";
import { IPostOptions, usePostOne } from "../../../../enthooks/hooks/usePostOne";
import { IPageList } from "../../../../model";
import { useInit } from "./useInit";

export function usePostPageList(options?: IPostOptions<any>) :[
  (pageList: IPageListInput) => void,
  { loading?: boolean; error?: Error }
] {
  const init = useInit();
  
  const [post, { error, loading }] = usePostOne<IPageListInput, IPageList>("PageList",
    {
      onCompleted: (data: IPageList) => {
        init(data);
        options && options.onCompleted(data);
      }
      , fieldsGql: "app{id uuid} schemaJson"
    }
  )

  return [post, { error, loading }]
}