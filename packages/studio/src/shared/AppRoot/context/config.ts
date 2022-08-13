import { IAppConfig } from "../../../model";
import { createContext, useContext } from "react";

export const AppConfigContext = createContext<IAppConfig | undefined>(undefined);

export const useAppConfig = (): IAppConfig | undefined => useContext(AppConfigContext);
