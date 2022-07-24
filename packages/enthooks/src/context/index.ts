import { createContext, useContext } from "react";

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

export const EntxContext = createContext<IEntxConfig>(empertyConfig);

export const useEntx = (): IEntxConfig => useContext(EntxContext);

export const useToken = () => {
  const iEntx = useEntx();
  return iEntx?.token
}

export const useSetToken = () => {
  const iEntx = useEntx();
  return iEntx?.setToken
}

export const useEndpoint = () => {
  const iEntx = useEntx();
  return iEntx?.endpoint
}

export const useSetEndpoint = () => {
  const iEntx = useEntx();
  return iEntx?.setEndpoint;
}