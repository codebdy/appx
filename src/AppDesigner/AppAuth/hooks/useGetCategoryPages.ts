import { useCallback } from "react";
import { ID } from "../../shared";
import { IAuthPage } from "./model";

export function useGetCategoryPages(pages: IAuthPage[]) {
  const getPages = useCallback((categoryId?: ID) => {
    return pages?.filter(page => page.page.category?.id === categoryId)
  }, [pages]);

  return getPages
}