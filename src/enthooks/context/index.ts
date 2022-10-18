import { createContext, useContext } from "react";
import { SYSTEM_APP_UUID } from "../../consts";

export interface IEntxConfig {
  token?: string,
  tokenName: string,
  endpoint: string,
  appUuid: string,
  setToken: (token: string | undefined) => void,
  setEndpoint: (endpoint: string) => void,
}

export const empertyConfig = {
  endpoint: "",
  tokenName: "",
  appUuid: SYSTEM_APP_UUID,
  setToken: () => {
    throw new Error("Not implement setToken")
  },
  setEndpoint: () => {
    throw new Error("Not implement setEndpoint")
  }
}

export const EntixContext = createContext<IEntxConfig>(empertyConfig);

export const useEntix = (): IEntxConfig => useContext(EntixContext);

export const useToken = () => {
  const iEntx = useEntix();
  return iEntx?.token || localStorage.getItem(iEntx.tokenName)
}

export const useSetToken = () => {
  const iEntx = useEntix();
  return iEntx?.setToken
}

export const useEndpoint = () => {
  const iEntx = useEntix();
  return iEntx?.endpoint
}

export const useEnthooksAppUuid = () => {
  const iEntx = useEntix();
  return iEntx?.appUuid
}

export const useSetEndpoint = () => {
  const iEntx = useEntix();
  return iEntx?.setEndpoint;
}