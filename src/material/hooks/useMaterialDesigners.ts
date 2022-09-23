import { useMemo } from "react";
import { useAppMaterialTabs, usePredefinedMaterialTab } from "../context";

export function useMaterialDesigners() {
  const predefinedTab = usePredefinedMaterialTab();
  const { debugMaterialTab, uploadedMaterialTabs } = useAppMaterialTabs();
  const materialDesigners = useMemo(() => {
    const designers = {} as any;
    for (const group of [...predefinedTab?.groups || [], ...debugMaterialTab?.groups || []]) {
      for (const material of group.materials || []) {
        designers[material.name] = material.designer
      }
    }

    for (const tab of uploadedMaterialTabs) {
      for (const group of tab.groups || []) {
        for (const material of group.materials || []) {
          designers[material.name] = material.designer
        }
      }
    }
    return designers
  }, [debugMaterialTab?.groups, predefinedTab?.groups, uploadedMaterialTabs])

  return materialDesigners;
}