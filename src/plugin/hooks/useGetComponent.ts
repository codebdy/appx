import { useCallback } from "react";
import { useAppParams } from "../../shared/AppRoot/context";

export function useGetComponent() {
  const { normalPlugins, device } = useAppParams();

  const getCompoent = useCallback((name: string) => {
    for (const plugin of normalPlugins) {
      const com = plugin.plugin?.components[device]?.find(com => com.name === name)
      if (com) {
        return com;
      }
    }
  }, [device, normalPlugins])

  return getCompoent;
}