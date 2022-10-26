import { useCallback } from "react";
import { ID } from "~/shared";
import { usePages } from "./usePages";

export function useGetCategoryPages() {
  const pages = usePages();
  const getPages = useCallback((categoryUuid?: ID) => {
    return pages?.filter(page => page.categoryUuid === categoryUuid)
  }, [pages]);

  return getPages
}