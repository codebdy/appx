import { Device, IPlugin } from "../../../plugin-sdk/model";
import { createContext, useContext, useMemo } from "react";
import { IApp, IAppConfig, IAppDeviceConfig, ILangLocal, IMaterialConfig, IPluginInfo, IUserConfig } from "../../../model";

export enum PluginType {
  Predefined = "predefined",
  Normal = "normal",
  Debug = "debug"
}

export interface IInstalledPlugin {
  pluginInfo: IPluginInfo,
  plugin?: IPlugin,
  type: PluginType,
}

export interface IAppContextParams {
  app: IApp,
  device: Device | undefined,
  config: IAppConfig | undefined,
  deviceConfig: IAppDeviceConfig | undefined,
  langLocales: ILangLocal[] | undefined,
  userConfig?: IUserConfig,
  predefinedPlugins?: IInstalledPlugin[],
  plugins?: IInstalledPlugin[],
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