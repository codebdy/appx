import { useCallback } from "react";
import { useInstanceParams } from "../../contexts/instance";

export function useReset(){
  const {field} = useInstanceParams();
  const reset = useCallback(()=>{
    field?.reset()
  }, [field]);

  return reset;
}