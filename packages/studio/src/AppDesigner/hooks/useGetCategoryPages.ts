import { useCallback } from "react";
import { IPage } from "../../model";
import { ID } from "../../shared";

export function useGetCategoryPages(pages?: IPage[]) {
  const getPages = useCallback((categoryId?: ID) => {
    return pages?.filter(page => page.category?.id === categoryId)
  }, [pages]);

  return getPages
}