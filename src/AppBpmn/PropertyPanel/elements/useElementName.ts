import { useCallback, useEffect, useState } from "react";

export function useElementName(element: any, modeler: any): string {
  const [name, setName] = useState("");

  const handleElementChanged = useCallback((e) => {
    if (element?.businessObject && element?.businessObject?.id === e.element?.businessObject?.id) {
      setName(e.element?.businessObject?.name)
    }
  }, [modeler, element])

  useEffect(() => {
    console.log("eventBus事件列表", modeler?.get('eventBus'))
    modeler?.on('element.changed', handleElementChanged);
    return () => {
      modeler?.off('element.changed', handleElementChanged)
    }
  }, [modeler, handleElementChanged])

  return name;
}