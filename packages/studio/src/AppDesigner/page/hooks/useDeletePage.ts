import { ID } from "../../../shared";
import { useRecoilValue } from "recoil";
import { IDeleteOptions, useDeleteById } from "../../../enthooks/hooks/useDeleteById";
import { IPage } from "../../../model";
import { useDesignerParams, useDesingerKey } from "../../context";
import { pageListNodesState, pageListState } from "../recoil/atoms";
import { IListNode } from "../recoil/IListNode";
import { usePostPageList } from "./usePostPageList";

export function useDeletePage(options?: IDeleteOptions<IPage>): [
  (id: ID) => void,
  {
    error?: Error,
    loading?: boolean,
  }
] {
  const key = useDesingerKey();
  const params = useDesignerParams();
  const nodes = useRecoilValue(pageListNodesState(key))
  const pageList = useRecoilValue(pageListState(key));
  const [postList, { error: listError, loading: listLoading }] = usePostPageList(options)

  const [doDelete, { error, loading }] = useDeleteById<IPage>("Page", {
    ...options,
    onCompleted: (data: IPage) => {
      let newNodes: IListNode[] = JSON.parse(JSON.stringify(nodes || []));

      newNodes = newNodes.filter(node => node.pageId !== data.id);

      for (const node of newNodes) {
        node.children = node.children?.filter(id => id !== data.id);
      }

      postList({
        ...pageList,
        device: params.device,
        app: {
          sync: { id: params.app.id }
        },
        schemaJson: { data: newNodes },
      })
      options?.onCompleted(data);
    }
  });

  return [doDelete, { error: error || listError, loading: loading || listLoading }]
}