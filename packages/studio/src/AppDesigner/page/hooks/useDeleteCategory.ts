import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { IPostOptions } from "../../../enthooks/hooks/usePostOne";
import { useDesignerParams, useDesingerKey } from "../../context";
import { nodesState, pageListState } from "../recoil/atoms";
import { usePostPageList } from "./usePostPageList";

export function useDeleteCategory(options?: IPostOptions<any>): [
  (name: string) => void,
  { loading?: boolean; error?: Error }
] {
  const key = useDesingerKey();
  const params = useDesignerParams();
  const nodes = useRecoilValue(nodesState(key))
  const pageList = useRecoilValue(pageListState(key));
  const [post, { error, loading }] = usePostPageList(options)

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