import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { IPostOptions } from "../../../enthooks/hooks/usePostOne";
import { useDesignerParams, useDesingerKey } from "../../context";
import { nodesState, pageListState } from "../recoil/atoms";
import { usePostPageList } from "./usePostPageList";

export function useUpdateCategory(options?: IPostOptions<any>): [
  (uuid: string, title: string) => void,
  { loading?: boolean; error?: Error }
] {
  const key = useDesingerKey();
  const params = useDesignerParams();
  const nodes = useRecoilValue(nodesState(key))
  const pageList = useRecoilValue(pageListState(key));
  const [post, { error, loading }] = usePostPageList(options)

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