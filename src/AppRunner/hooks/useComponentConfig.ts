import { useMemo } from "react";
import { useUserConfig } from "~/plugin-sdk/contexts/app";

export function useComponentConfig(path: string) {
  const userConfig = useUserConfig();

  const comConfig = useMemo(() => {
    const tbCfg = userConfig?.schemaJson?.[path];

    return tbCfg;
  }, [path, userConfig])

  return comConfig;
}