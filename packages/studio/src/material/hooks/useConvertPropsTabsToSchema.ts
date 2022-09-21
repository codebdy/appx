import { useCallback } from "react";
import { IPropsTab } from "../../plugin-sdk/model";

export function useConvertPropsTabsToSchema(){
  const convert = useCallback((tabs: IPropsTab[])=>{
    return {} as any
  }, [])

  return convert;
}