import { useMemo } from "react";
import { useCategories } from "./useCategories";
import { useProcesses } from "./useProcesses";

export function useProcessesWithoutCategory() {
  const processes = useProcesses();
  const categories = useCategories();

  const processessWithoutCategory = useMemo(() => {
    const pgs = [];
    for (const process of processes || []) {
      if (!categories.find(category => category.uuid === process.categoryUuid)) {
        pgs.push(process)
      }
    }

    return pgs;
  }, [categories, processes])

  return processessWithoutCategory;
}