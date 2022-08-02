import { IPageList } from "packages/studio/src/model";
import { ID } from "packages/studio/src/shared";
import { useCallback } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useDesingerKey } from "../../../context";
import { nodesState, pagesState, pageListState } from "../recoil/atoms";
import { IListNode, ListNodeType } from "../recoil/IListNode";

export function useInit() {
  const key = useDesingerKey();
  const setPageList = useSetRecoilState(pageListState(key));
  const pages = useRecoilValue(pagesState(key));
  const setNodes = useSetRecoilState(nodesState(key));
  const init = useCallback((pageList?: IPageList) => {
    setPageList(pageList);
    let nodes: IListNode[] = JSON.parse(JSON.stringify(pageList?.schemaJson?.data || []))
    const pageIsInSchema = (pageId: ID) => {
      for (const nd of nodes) {
        if (nd.pageId === pageId) {
          return true;
        } else if (nd.nodeType === ListNodeType.Category) {
          for (const pgd of nd.children || []) {
            if (pgd === pageId) {
              return true;
            }
          }
        }
      }
      return false;
    }

    nodes = nodes.filter(
      (node: IListNode) => node.nodeType &&
        (
          node.nodeType === ListNodeType.Category ||
          (node.nodeType === ListNodeType.Page && pages.find(page => page.id === node.pageId)
          )
        )
    )

    for (const node of nodes) {
      node.children = node.children?.filter(id => pages.find(page => page.id === id))
    }

    for (const page of pages) {
      if (!pageIsInSchema(page.id)) {
        nodes.push({
          title: page.title,
          nodeType: ListNodeType.Page,
          children: []
        })
      }
    }

    setNodes(nodes);
  }, [pages, setNodes, setPageList])

  return init;
}