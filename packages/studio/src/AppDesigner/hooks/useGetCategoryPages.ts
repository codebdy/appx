import { useCallback } from "react";
import { ID } from "../../shared";
import { usePages } from "./usePages";

export function useGetCategoryPages() {
  const pages = usePages();
  const getPages = useCallback((categoryId?: ID) => {
    return pages?.filter(page => page.category?.[0]?.id === categoryId)
  }, [pages]);

  return getPages
}