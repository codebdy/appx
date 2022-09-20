import { useCallback } from "react";
import { useAppParams } from "../../shared/AppRoot/context";

export function useGetComponent() {
  const { plugins, device } = useAppParams();

  const getCompoent = useCallback((name: string) => {
    for (const plugin of plugins) {
      const com = plugin.plugin?.components[device]?.find(com => com.name === name)
      if (com) {
        return com;
      }
    }
  }, [device, plugins])

  return getCompoent;
}