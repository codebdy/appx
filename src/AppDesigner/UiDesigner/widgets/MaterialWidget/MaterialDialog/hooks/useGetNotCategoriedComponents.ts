import { useAppParams } from "@rxdrag/plugin-sdk/contexts/appRoot";
import { useCallback } from "react";
import { IMaterialTab, IPlugin } from "@rxdrag/appx-plugin-sdk";

export function useGetNotCategoriedComponents(tabs: IMaterialTab[]) {
  const { device } = useAppParams();
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