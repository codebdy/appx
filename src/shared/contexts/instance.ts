import { Field } from "@formily/core";
import { createContext, useContext } from "react";
import { ID } from "..";

export interface IInstance {
  field?: Field,
  entityName?: string | undefined,
  instance?: any,
}

export const InstanceContext = createContext<IInstance | undefined>(undefined);

export const useInstanceParams = ():IInstance => useContext(InstanceContext) || {};

export const useInstanceId = (): ID | undefined => useContext(InstanceContext)?.instance?.id;
