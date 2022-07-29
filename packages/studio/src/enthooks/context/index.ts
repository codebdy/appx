import { createContext, useContext } from "react";
import { TOKEN_NAME } from "../../consts";

export interface IEntxConfig {
  token?: string,
  endpoint: string,
  setToken: (token: string | undefined) => void,
  setEndpoint: (endpoint: string) => void,
}

export const empertyConfig = {
  endpoint: "",
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
  return iEntx?.token || localStorage.getItem(TOKEN_NAME)
}

export const useSetToken = () => {
  const iEntx = useEntix();
  return iEntx?.setToken
}

export const useEndpoint = () => {
  const iEntx = useEntix();
  return iEntx?.endpoint
}

export const useSetEndpoint = () => {
  const iEntx = useEntix();
  return iEntx?.setEndpoint;
}