import { useMemo } from "react";
import { usePredefinedMaterialTab } from "../context";

export function useMaterialDesigners() {
  const predefinedTab = usePredefinedMaterialTab();
  const materialDesigners = useMemo(() => {
    const designers = {} as any;
    for (const group of predefinedTab?.groups || []) {
      for (const material of group.materials || []) {
        designers[material.name] = material.designer
      }
    }
    return designers
  }, [predefinedTab?.groups])

  return materialDesigners;
}