import { createContext, useContext } from "react";
import { IMenuItem } from "../model/IMenuNode";

export interface IRunnerContextParams {
  components: (React.FC<any> | React.Component)[],
}

export const RunnerContext = createContext<IRunnerContextParams | undefined>(undefined);
export const useRunnerParams = (): IRunnerContextParams | undefined => useContext(RunnerContext);

export interface IMenuRoute {
  menuItem?: IMenuItem,
  setMenuItem?: React.Dispatch<React.SetStateAction<IMenuItem>>,
}
export const RouteContext = createContext<IMenuRoute | undefined>(undefined);
export const useMenuRoute = (): IMenuRoute | undefined => useContext(RouteContext);
