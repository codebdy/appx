import { createContext, useContext } from "react";
import { MaterialTab } from "./model"

export const PredefinedMaterialTabContext = createContext<MaterialTab>(undefined);

export const usePredefinedMaterialTab = (): MaterialTab | undefined => useContext(PredefinedMaterialTabContext);
