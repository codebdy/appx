import { useDesignerParams } from "~/plugin-sdk/contexts/desinger";
import { useCallback } from "react";
import { IMaterialTab, IPlugin } from "@rxdrag/appx-plugin-sdk";

export function useGetNotCategoriedComponents(tabs: IMaterialTab[]) {
  const { device } = useDesignerParams();
  const getComponents = useCallback((plugin: IPlugin) => {
    return plugin?.components?.[device].filter(
      com => !tabs?.find(
        tab => tab.collopsesItems?.find(
          group => group.components?.find(
            name => name === com.name
          )
        )
      )
    ) || []
  }, [device, tabs])

  return getComponents;
}