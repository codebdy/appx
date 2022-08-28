import { useCallback, useRef } from "react";
import { useInstanceParams } from "../../contexts/instance";

export function useSaveData(){
  const { field, entityName, instance } = useInstanceParams()
  const resolveRef = useRef<(value: unknown) => void>();
  const rejectRef = useRef<(reason?: any) => void>();
  
  const save = useCallback(()=>{
    const p = new Promise((resolve, reject) => {
      resolveRef.current = resolve;
      rejectRef.current = reject;
      field.validate()
    });
    return p;
  }, [field])

  return save;
}