import { useCallback, useRef } from "react";
import { IPostOptions, usePostOne } from "../../../../enthooks/hooks/usePostOne";
import { IPageInput, IPageListInput } from "../../../../model/input";
import { IPage, IPageList } from "../../../../model";
import { useDesignerParams, useDesingerKey } from "../../../context";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { nodesState, pageListState, pagesState } from "../recoil/atoms";
import { ListNodeType } from "../recoil/IListNode";


export function useCreatePage(options?: IPostOptions<any>): [
  (title: string, categoryUuid?: string) => void,
  { loading?: boolean; error?: Error }
] {
  const params = useDesignerParams();
  const key = useDesingerKey();
  const setPages = useSetRecoilState(pagesState(key));
  const categoryUuidRef = useRef<string | undefined>();
  const nodes = useRecoilValue(nodesState(key))
  const pageList = useRecoilValue(pageListState(key));
  const [postList, { error: listError, loading: listLoading }] = usePostOne<IPageListInput, IPageList>("PageList",
    { 
      ...options,
      fieldsGql: "app{id uuid} schemaJson",
     }
  )

  const [post, { error, loading }] = usePostOne<IPageInput, IPage>("Page",
    {
      onCompleted: (page?: IPage) => {
        const newNodes = JSON.parse(JSON.stringify(nodes));
        setPages((pages) => [...pages, page]);
        if (categoryUuidRef.current) {
          for (const node of newNodes) {
            if (node.uuid === categoryUuidRef.current) {
              node.children = [...node.children, page.id];
            }
          }
        } else {
          newNodes.push({ pageId: page.id, nodeType: ListNodeType.Page })
        }
        postList({
          ...pageList,
          device: params.device,
          app: {
            sync: { id: params.app.id }
          },
          schemaJson: { data: newNodes },
        })
      },
      fieldsGql: "id title"
    }
  )

  const create = useCallback((title: string, categoryUuid?: string) => {
    categoryUuidRef.current = categoryUuid;
    post({
      title: title,
      device: params.device,
      app: {
        sync: { id: params.app.id }
      },
    })
  }, [params.app.id, params.device, post]);

  return [create, { error: error || listError, loading: loading || listLoading }]
}