import { useMemo } from "react";
import { useUserConfig } from "@rxdrag/plugin-sdk/contexts/appRoot";

export function useComponentConfig(path: string) {
  const userConfig = useUserConfig();

  const comConfig = useMemo(() => {
    const tbCfg = userConfig?.schemaJson?.[path];

    return tbCfg;
  }, [path, userConfig])

  return comConfig;
}