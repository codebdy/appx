import { createContext, useContext } from "react";
import { IMenu } from "../../model";

export interface IRunnerContextParams {
  menu?: IMenu,
}


export const RunnerContext = createContext<IRunnerContextParams | undefined>(undefined);

export const useRunnerParams = (): IRunnerContextParams | undefined => useContext(RunnerContext);
