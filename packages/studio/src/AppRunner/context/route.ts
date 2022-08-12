import { createContext, useContext } from "react";
import { IMenuItem } from "../../model/IMenuNode";

export const RouteContext = createContext<IMenuItem | undefined>(undefined);

export const useRouteItem = (): IMenuItem | undefined => useContext(RouteContext);
