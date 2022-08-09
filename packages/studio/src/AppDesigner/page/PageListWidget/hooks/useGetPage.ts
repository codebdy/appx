import { ID } from "../../../../shared";
import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import {pagesState} from "../recoil/atoms";

export function useGetPage(key: string) {
  const pages = useRecoilValue(pagesState(key));

  const getPage = useCallback((id:ID)=>{
    return pages.find(pg=>pg.id === id)
  }, [pages]);

  return getPage;
}