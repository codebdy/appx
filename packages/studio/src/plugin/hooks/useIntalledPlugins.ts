import { useEffect, useState } from "react";
import { IInstalledPlugin } from "../model";
import { useQueryPluginInfos } from "./useQueryPluginInfos";

export function useIntalledPlugins() {
  const [installedPlugins, setInstalledPlugins] = useState<IInstalledPlugin[]>([])
  const { data, error, loading } = useQueryPluginInfos();

  useEffect(()=>{
    
  }, [data])

  return { installedPlugins, error, loading }
}