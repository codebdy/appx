import { createContext, useContext } from "react";
import { ID } from "..";

export interface IInstance {
  fieldPath?: string,
  entityName: string | undefined,
  instance?: any,
}

export const InstanceContext = createContext<IInstance | undefined>(undefined);

export const useInstanceId = (): ID | undefined => useContext(InstanceContext)?.instance?.id;
