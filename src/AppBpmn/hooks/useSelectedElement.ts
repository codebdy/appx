import { useCallback, useEffect, useRef, useState } from "react";

export function useSelectedElement(modeler?: any) {
  const [selection, setSelection] = useState<any>();
  const [element, setElement] = useState<any>();

  const handleSelectionsChanged = useCallback((e) => {
    setSelection(e.newSelection);
    setElement(e.newSelection[0]);
  }, [])


  useEffect(() => {
    modeler?.on('selection.changed', handleSelectionsChanged);
    return () => {
      modeler?.off('selection.changed', handleSelectionsChanged)
    }
  }, [modeler, handleSelectionsChanged])

  return { element, selection };
}