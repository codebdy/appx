import { createContext, useContext } from "react";
import { MaterialTab } from "./model"

export interface IPredefinedMaterialTabs {
  basicTab?: MaterialTab,
  frameworkTab?: MaterialTab
}

export const PredefinedMaterialTabContext = createContext<IPredefinedMaterialTabs>({});

export const usePredefinedMaterialTab = (): IPredefinedMaterialTabs => useContext(PredefinedMaterialTabContext);


export interface IMaterialTabsContextParams {
  uploadedMaterialTabs: MaterialTab[],
  debugMaterialTab?: MaterialTab,
}

export const AppMaterialTabsContext = createContext<IMaterialTabsContextParams | undefined>(undefined);

export const useAppMaterialTabs = (): IMaterialTabsContextParams | undefined => useContext(AppMaterialTabsContext);