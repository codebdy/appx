import { useMemo } from "react";
import { useUserConfig } from "../context";

export function useComponentConfig(path: string) {
  const userConfig = useUserConfig();

  const comConfig = useMemo(() => {
    const tbCfg = userConfig?.schemaJson?.[path];

    return tbCfg;
  }, [path, userConfig])

  return comConfig;
}