import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { IPostOptions, usePostOne } from "../../../../enthooks/hooks/usePostOne";
import { IPageList } from "../../../../model";
import { IPageListInput } from "../../../../model/input";
import { useDesignerParams, useDesingerKey } from "../../../context";
import { nodesState, pageListState } from "../recoil/atoms";

export function useDeleteCategory(options?: IPostOptions<any>): [
  (name: string) => void,
  { loading?: boolean; error?: Error }
] {
  const key = useDesingerKey();
  const params = useDesignerParams();
  const nodes = useRecoilValue(nodesState(key))
  const pageList = useRecoilValue(pageListState(key));
  const [post, { error, loading }] = usePostOne<IPageListInput, IPageList>("PageList",
    { ...options, fieldsGql: "app{id uuid} schemaJson" }
  )

  const remove = useCallback((uuid: string) => {
    post({
      ...pageList,
      device: params.device,
      app: {
        sync: { id: params.app.id }
      },
      schemaJson: { data: nodes.filter(node => node.uuid !== uuid) },
    })
  }, [nodes, pageList, params.app.id, params.device, post])

  return [remove, { error, loading }]
}