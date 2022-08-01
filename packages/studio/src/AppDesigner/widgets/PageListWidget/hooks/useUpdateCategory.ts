import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { IPostOptions, usePostOne } from "../../../../enthooks/hooks/usePostOne";
import { IPageList } from "../../../../model";
import { IPageListInput } from "../../../../model/input";
import { useDesignerParams, useDesingerKey } from "../../../context";
import { nodesState, pageListState } from "../recoil/atoms";

export function useUpdateCategory(options?: IPostOptions<any>): [
  (uuid: string, title: string) => void,
  { loading?: boolean; error?: Error }
] {
  const key = useDesingerKey();
  const params = useDesignerParams();
  const nodes = useRecoilValue(nodesState(key))
  const pageList = useRecoilValue(pageListState(key));
  const [post, { error, loading }] = usePostOne<IPageListInput, IPageList>("PageList",
    { ...options, fieldsGql: "app{id uuid} schemaJson" }
  )

  const update = useCallback((uuid: string, title: string) => {
    post({
      ...pageList,
      device: params.device,
      app: {
        sync: { id: params.app.id }
      },
      schemaJson: { data: nodes.map((node) => node.uuid === uuid ? { ...node, title: title } : node) },
    })
  }, [nodes, pageList, params.app.id, params.device, post])

  return [update, { error, loading }]
}