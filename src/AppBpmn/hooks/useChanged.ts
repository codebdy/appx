import { useCallback, useEffect, useState } from "react";

export function useChanged(bpmnModeler?: any,) {
  const [changed, setChanged] = useState(false);

  const handleCommandStackChanged = useCallback((e) => {
    setChanged(true);
  }, [bpmnModeler])

  useEffect(() => {
    setChanged(false);
    bpmnModeler?.on('commandStack.changed', handleCommandStackChanged);
    return () => {
      bpmnModeler?.off('commandStack.changed', handleCommandStackChanged);
    }
  }, [bpmnModeler, handleCommandStackChanged])

  return changed;
}