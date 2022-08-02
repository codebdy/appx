import { useCallback, useRef } from "react";
import { IPostOptions, usePostOne } from "../../../../enthooks/hooks/usePostOne";
import { IPageInput, IPageListInput } from "../../../../model/input";
import { IPage, IPageList } from "../../../../model";
import { useDesignerParams, useDesingerKey } from "../../../context";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { nodesState, pageListState, pagesState } from "../recoil/atoms";
import { ListNodeType } from "../recoil/IListNode";


export function useUpsertPage(options?: IPostOptions<any>): [
  (page: IPageInput, categoryUuid?: string) => void,
  { loading?: boolean; error?: Error }
] {
  const params = useDesignerParams();
  const key = useDesingerKey();
  const setPages = useSetRecoilState(pagesState(key));
  const categoryUuidRef = useRef<string | undefined>();
  const nodes = useRecoilValue(nodesState(key))
  const pageList = useRecoilValue(pageListState(key));
  const isInsertRef = useRef<boolean>(false);

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
        setPages((pages) => {
          if (!isInsertRef.current) {
            return pages.map(pg => pg.id === page.id ? page : pg)
          } else {
            return [...pages, page];
          }
        });
        if (categoryUuidRef.current) {
          if (isInsertRef.current) {
            for (const node of newNodes) {
              if (node.uuid === categoryUuidRef.current) {
                node.children = [...node.children, page.id];
              }
            }
          }
        } else {
          if (isInsertRef.current) {
            newNodes.push({ pageId: page.id, nodeType: ListNodeType.Page })
          }
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

  const upsert = useCallback((page: IPageInput, categoryUuid?: string) => {
    isInsertRef.current = !page.id;
    categoryUuidRef.current = categoryUuid;
    post({
      ...page,
      device: params.device,
      app: {
        sync: { id: params.app.id }
      },
    })
  }, [params.app.id, params.device, post]);

  return [upsert, { error: error || listError, loading: loading || listLoading }]
}