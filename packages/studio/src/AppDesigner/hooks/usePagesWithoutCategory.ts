import { useMemo } from "react";
import { useCategories } from "./useCategories";
import { usePages } from "./usePages";

export function usePagesWithoutCategory() {
  const pages = usePages();
  const categories = useCategories();

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