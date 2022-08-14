import { createContext, useContext } from "react";
import { SYSTEM_APP_UUID } from "../../consts";


export const AppContext = createContext<string>(SYSTEM_APP_UUID);

export const useSelectedAppUuid = (): string => useContext(AppContext);
