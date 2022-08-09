import { useCallback } from "react";
import { IPage } from "../../model";
import { ID } from "../../shared";

export function useGetPage(pages?: IPage[]) {
  const getPage = useCallback((id?: ID) => {
    return pages?.find(page => page.id === id)
  }, [pages]);

  return getPage;
}