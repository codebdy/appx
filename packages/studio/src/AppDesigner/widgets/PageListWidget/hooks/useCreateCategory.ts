import { createUuid } from "../../../../shared";
import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { IPostOptions } from "../../../../enthooks/hooks/usePostOne";
import { useDesignerParams, useDesingerKey } from "../../../context";
import { nodesState, pageListState } from "../recoil/atoms";
import { IListNode, ListNodeType } from "../recoil/IListNode";
import { usePostPageList } from "./usePostPageList";

export function useCreateCategory(options?: IPostOptions<any>): [
  (title: string) => void,
  { loading?: boolean; error?: Error }
] {
  const key = useDesingerKey();
  const params = useDesignerParams();
  const nodes = useRecoilValue(nodesState(key))
  const pageList = useRecoilValue(pageListState(key));
  const [post, { error, loading }] = usePostPageList(options)

  const create = useCallback((title: string) => {
    const newNode: IListNode = {
      uuid: createUuid(),
      nodeType: ListNodeType.Category,
      title: title,
      children: [],
    }
    post({
      ...pageList,
      device: params.device,
      app: { 
        sync:{id: params.app.id} 
      },
      schemaJson: { data: [...nodes, newNode] },
    })
  }, [nodes, pageList, params.app.id, params.device, post])

  return [create, { error, loading }]
}