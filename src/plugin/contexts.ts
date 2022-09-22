import { createContext, useContext } from "react";
import { IPlugin } from "@rxdrag/appx-plugin-sdk";

export const PredefinedPluginsContext = createContext<IPlugin []>([]);

export const usePredefinedPlugins = ():IPlugin [] => useContext(PredefinedPluginsContext);

