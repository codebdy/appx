import { createContext, useContext, useMemo } from "react";
import { Device, IApp } from "../../../model";

export interface IAppContextParams {
  app: IApp,
  device: Device
}


export const AppContext = createContext<IAppContextParams | undefined>(undefined);

export const useAppParams = (): IAppContextParams | undefined => useContext(AppContext);

export const useAppKey = () => {
  const params = useAppParams()

  const key = useMemo(() => {
    return params ? params.device + params.app.uuid : ""
  }, [params])

  return key;
}