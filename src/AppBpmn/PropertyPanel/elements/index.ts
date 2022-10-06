import { useMemo } from "react";
import { useProcess } from "./useProcess";

export function useElementView(element?: any) {
  const process = useProcess();

  const elementView = useMemo(()=>{
    switch(element?.type){
      case "bpmn:Process":
        return process;
    }
  }, [process, element])

  return elementView
}