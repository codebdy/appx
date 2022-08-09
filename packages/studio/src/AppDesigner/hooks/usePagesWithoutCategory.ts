import { useMemo } from "react";
import { IPage, IPageCategory } from "../../model";

export function usePagesWithoutCategory(pages?: IPage[], categories?: IPageCategory[]) {

  const pagesWithoutCategory = useMemo(() => {
    const pgs = [];
    for (const page of pages || []) {
      if (!categories.find(category => category.id === page.category?.id)) {
        pgs.push(page)
      }
    }

    return pgs;
  }, [categories, pages])

  return pagesWithoutCategory;
}