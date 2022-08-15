import { createContext, useContext, useMemo } from "react";
import { Device, IApp, IAppConfig, ILangLocal } from "../../../model";

export interface IAppContextParams {
  app: IApp,
  device: Device | undefined,
  config: IAppConfig | undefined,
  langLocales: ILangLocal[] | undefined,
}


export const AppContext = createContext<IAppContextParams | undefined>(undefined);

export const useAppParams = (): IAppContextParams | undefined => useContext(AppContext);
export const useAppConfig = (): IAppConfig | undefined => useContext(AppContext)?.config;

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