import { useMemo } from "react";
import { useUserConfig } from "../context";

export function useComponentConfig(path: string) {
  const userConfig = useUserConfig();

  const tableConfig = useMemo(() => {
    const tbCfg = userConfig?.[path];

    return tbCfg;
  }, [path, userConfig])

  return tableConfig;
}