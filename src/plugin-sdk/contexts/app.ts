import { Device } from "@rxdrag/appx-plugin-sdk";
import { createContext, useContext } from "react";
import { IApp, IUiFrame } from "~/model";
import { IUserConfig } from "~/model/user";

export interface IAppContextParams {
  app: IApp,
  device: Device | undefined,
  userConfig?: IUserConfig,
  uiFrame?: IUiFrame,
}
export const AppContext = createContext<IAppContextParams>({} as any);
export const useUserConfig = (): IUserConfig | undefined => useContext(AppContext)?.userConfig;
export const useAppParams = (): IAppContextParams | undefined => useContext(AppContext);
export const useApp = (): IApp | undefined => useContext(AppContext)?.app;