import { createContext, useContext } from "react";

export interface IDropdownDesignerParams {
  visiable?: boolean,
  setVisiable?: (visiable?:boolean)=>void,
}

export const DropdownDesignerContext = createContext<IDropdownDesignerParams>({});

export const useDropdownDesignerParams = (): IDropdownDesignerParams => useContext(DropdownDesignerContext) || {};
