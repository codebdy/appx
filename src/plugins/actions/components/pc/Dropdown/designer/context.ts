import { createContext, useContext } from "react";

export interface IDropdownDesignerParams {
  visible?: boolean,
  setVisible?: (visible?:boolean)=>void,
}

export const DropdownDesignerContext = createContext<IDropdownDesignerParams>({});

export const useDropdownDesignerParams = (): IDropdownDesignerParams => useContext(DropdownDesignerContext) || {};
