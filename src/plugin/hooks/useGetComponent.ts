import { useCallback } from "react";
import { useDesignerParams } from "~/plugin-sdk/contexts/desinger";

export function useGetComponent() {
  const { uploadedPlugins, device } = useDesignerParams();

  const getCompoent = useCallback((name: string) => {
    for (const plugin of uploadedPlugins) {
      const com = plugin.plugin?.components[device]?.find(com => com.name === name)
      if (com) {
        return com;
      }
    }
  }, [device, uploadedPlugins])

  return getCompoent;
}