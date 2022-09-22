import { Device } from "@rxdrag/appx-plugin-sdk";
import { createContext, useContext, useMemo } from "react";
import { IApp, IAppConfig, IAppDeviceConfig, ILangLocal, IMaterialConfig, IUserConfig } from "../../../model";
import { IInstalledPlugin } from "../../../plugin/model";

export interface IAppContextParams {
  app: IApp,
  device: Device | undefined,
  config: IAppConfig | undefined,
  deviceConfig: IAppDeviceConfig | undefined,
  langLocales: ILangLocal[] | undefined,
  userConfig?: IUserConfig,
  normalPlugins?: IInstalledPlugin[],
  debugPlugins?: IInstalledPlugin[],
  materialConfig?: IMaterialConfig,
}

export const AppContext = createContext<IAppContextParams | undefined>(undefined);

export const useAppParams = (): IAppContextParams | undefined => useContext(AppContext);
export const useAppConfig = (): IAppConfig | undefined => useContext(AppContext)?.config;
export const useUserConfig = (): IUserConfig | undefined => useContext(AppContext)?.userConfig;

export const useAppViewKey = () => {
  const params = useAppParams()

  const key = useMemo(() => {
    return params ? params.device + params.app.uuid : ""
  }, [params])

  return key;
}

export function useSelectedAppUuid() {
  return useAppParams()?.app?.uuid
}