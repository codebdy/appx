import { createContext, useContext } from "react";
import { IMenuItem } from "../../model/IMenuNode";

export interface IMenuRoute {
  menuItem?: IMenuItem,
  setMenuItem?: React.Dispatch<React.SetStateAction<IMenuItem>>,
}


export const RouteContext = createContext<IMenuRoute | undefined>(undefined);

export const useMenuRoute = (): IMenuRoute | undefined => useContext(RouteContext);
