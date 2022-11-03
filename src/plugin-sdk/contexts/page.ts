import { createContext, useContext } from "react";
import { IPage } from "~/model";


export const PageContext = createContext<IPage | undefined>(undefined);

export const usePage = (): IPage | undefined => useContext(PageContext);

