import React from "react";
import { memo } from "react";
import { PredefinedPluginsContext } from "./contexts";
import { useLoadPredefinedPlugins } from "./hooks/useLoadPredefinedPlugins";

export const PredefinedPluginsRoot = memo((
  props: {
    children: React.ReactNode,
  }
) => {
  const predefinedPlugsin = useLoadPredefinedPlugins();
  return (
    <PredefinedPluginsContext.Provider value={predefinedPlugsin}>
      {props.children}
    </PredefinedPluginsContext.Provider>
  )
})