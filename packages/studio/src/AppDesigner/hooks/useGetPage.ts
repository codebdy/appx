import { useCallback } from "react";
import { ID } from "../../shared";
import { usePages } from "./usePages";

export function useGetPage() {
  const pages = usePages();
  const getPage = useCallback((id?: ID) => {
    return pages?.find(page => page.id === id)
  }, [pages]);

  return getPage;
}