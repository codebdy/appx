import { createContext, useContext, useMemo } from "react";
import { Device, IApp } from "../../model";

export interface IDesignerParams {
  app: IApp,
  device: Device
}


export const DesignerContext = createContext<IDesignerParams | undefined>(undefined);

export const useDesignerParams = (): IDesignerParams | undefined => useContext(DesignerContext);

export const useDesingerKey = () => {
  const params = useDesignerParams()

  const key = useMemo(() => {
    return params ? params.device + params.app.uuid : ""
  }, [params])

  return key;
}