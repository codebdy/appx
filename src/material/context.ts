import { createContext, useContext } from "react";
import { MaterialTab } from "./model"

export const PredefinedMaterialTabContext = createContext<MaterialTab>(undefined);

export const usePredefinedMaterialTab = (): MaterialTab | undefined => useContext(PredefinedMaterialTabContext);


export interface IMaterialTabsContextParams {
  uploadedMaterialTabs: MaterialTab[],
  debugMaterialTab?: MaterialTab,
}

export const AppMaterialTabsContext = createContext<IMaterialTabsContextParams | undefined>(undefined);

export const useAppMaterialTabs = (): IMaterialTabsContextParams | undefined => useContext(AppMaterialTabsContext);