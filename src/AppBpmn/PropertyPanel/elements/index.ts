import { useMemo } from "react";
import { useProcess } from "./useProcess";

export function useElementView(element: any, modeler: any) {
  const process = useProcess(element, modeler);

  const elementView = useMemo(()=>{
    switch(element?.type){
      case "bpmn:Process":
        return process;
    }
  }, [process, element])

  return elementView
}