import { createContext, useContext } from "react";

export interface IDialogParams {
  visiable?: boolean,
  onClose?: ()=>void,
}

export const DialogContext = createContext<IDialogParams>({});

export const useDialogParams = (): IDialogParams => useContext(DialogContext) || {};
