import { IPageList } from "packages/studio/src/model";
import { ID } from "packages/studio/src/shared";
import { useCallback } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useDesingerKey } from "../../../context";
import { nodesState, pagesState } from "../recoil/atoms";
import { IListNode, ListNodeType } from "../recoil/IListNode";

export function useInit() {
  const key = useDesingerKey();
  const pages = useRecoilValue(pagesState(key));
  const setNodes = useSetRecoilState(nodesState(key));

  const init = useCallback((pageList?: IPageList) => {
    const nodes: IListNode[] = pageList?.schemaJson||[]
    const pageIsInSchema = (pageId: ID)=>{
      for (const nd of nodes){
        if(nd.pageId === pageId){
          return true;
        }else if(nd.nodeType === ListNodeType.Category){
          for (const pgd of nd.children){
            if (pgd === pageId){
              return true;
            }
          }
        }
      }
      return false;
    }

    for (const page of pages){
      if(!pageIsInSchema(page.id)){
        nodes.push({
          title: page.title,
          nodeType: ListNodeType.Page,
          children:[]
        })
      }
    }

    setNodes(nodes);
  }, [pages, setNodes])

  return init;
}