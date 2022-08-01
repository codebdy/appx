import { createContext, useContext, useMemo } from "react";
import { Device } from "../../model";

export interface IDesignerParams {
  appUuid: string,
  device: Device
}


export const DesignerContext = createContext<IDesignerParams | undefined>(undefined);

export const useDesignerParams = (): IDesignerParams | undefined => useContext(DesignerContext);

export const useDesingerKey = () => {
  const params = useDesignerParams()

  const key = useMemo(() => {
    return params ? params.device + params.appUuid : ""
  }, [params])

  return key;
}