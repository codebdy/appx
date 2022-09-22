import { useMemo } from "react";
import { useAppMaterialTabs, usePredefinedMaterialTab } from "../context";

export function useMaterialDesigners() {
  const predefinedTab = usePredefinedMaterialTab();
  const { debugMaterialTab } = useAppMaterialTabs();
  const materialDesigners = useMemo(() => {
    const designers = {} as any;
    for (const group of [...predefinedTab?.groups || [], ...debugMaterialTab?.groups || []]) {
      for (const material of group.materials || []) {
        designers[material.name] = material.designer
      }
    }
    return designers
  }, [debugMaterialTab?.groups, predefinedTab?.groups])

  return materialDesigners;
}