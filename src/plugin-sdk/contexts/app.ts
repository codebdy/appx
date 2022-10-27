import { Device } from "@rxdrag/appx-plugin-sdk";
import { createContext, useContext } from "react";
import { IApp } from "~/model";
import { IUserConfig } from "~/model/user";

export interface IAppContextParams {
  app: IApp,
  device: Device | undefined,
  userConfig?: IUserConfig,
}
export const AppContext = createContext<IAppContextParams>({} as any);
export const useUserConfig = (): IUserConfig | undefined => useContext(AppContext)?.userConfig;
export const useApp = (): IApp | undefined => useContext(AppContext)?.app;