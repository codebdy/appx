import { createContext, useContext } from "react";

export interface IEntxConfig {
  token?: string,
  setToken?: (token: string | undefined) => void,
}
export const EntxContext = createContext<IEntxConfig | undefined>(undefined);
//export const EntxRoot = EntxContext.Provider;

export const useEntx = (): IEntxConfig | undefined => useContext(EntxContext);

export const useToken = () => {
  const iEntx = useEntx();

  return iEntx?.token
}