import { createContext, useContext } from "react";

export interface ILayoutContextParams {
  scrolled?: boolean,
  setScrolled?: (scroll?: boolean) => void
}
export const LayoutContext = createContext<ILayoutContextParams>({} as any);

export const useLayoutParams = (): ILayoutContextParams | undefined => useContext(LayoutContext);