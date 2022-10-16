import { useMemo } from "react";
import { IPage, IPageCategory } from "../../model";
import { IAuthPage } from "./model";

export function usePagesWithoutCategory(pages:IAuthPage[], categories :IPageCategory[]) {
  const pagesWithoutCategory = useMemo(() => {
    const pgs = [];
    for (const page of pages || []) {
      if (!categories.find(category => category.id === page.page.category?.id)) {
        pgs.push(page)
      }
    }

    return pgs;
  }, [categories, pages])

  return pagesWithoutCategory;
}