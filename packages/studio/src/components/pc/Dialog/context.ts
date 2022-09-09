import { createContext, useContext } from "react";

export interface IDialogParams {
  visiable?: boolean,
  setVisiable?: (visiable?:boolean)=>void,
}

export const DialogContext = createContext<IDialogParams>({});

export const useDialogParams = (): IDialogParams => useContext(DialogContext) || {};
