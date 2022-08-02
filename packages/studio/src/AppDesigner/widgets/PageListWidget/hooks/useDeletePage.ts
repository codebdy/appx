import { usePostOne } from "../../../../enthooks/hooks/usePostOne";
import { IPageListInput } from "../../../../model/input";
import { useRecoilValue } from "recoil";
import { IDeleteOptions, useDeleteById } from "../../../../enthooks/hooks/useDeleteById";
import { IPage, IPageList } from "../../../../model";
import { useDesignerParams, useDesingerKey } from "../../../context";
import { nodesState, pageListState } from "../recoil/atoms";
import { IListNode } from "../recoil/IListNode";

export function useDeletePage(options?: IDeleteOptions<IPage>) {
  const key = useDesingerKey();
  const params = useDesignerParams();
  const nodes = useRecoilValue(nodesState(key))
  const pageList = useRecoilValue(pageListState(key));
  const [postList, { error: listError, loading: listLoading }] = usePostOne<IPageListInput, IPageList>("PageList",
    {
      ...options,
      fieldsGql: "app{id uuid} schemaJson",
    }
  )

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