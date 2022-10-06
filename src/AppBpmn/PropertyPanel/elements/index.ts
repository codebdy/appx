import { useMemo } from "react";
import { useCollaboration } from "./useCollaboration";
import { useIntermediateThrowEvent } from "./useIntermediateThrowEvent";
import { useProcess } from "./useProcess";
import { useStartEvent } from "./useStartEvent";

export function useElementView(element: any, modeler: any) {
  const process = useProcess(element, modeler);
  const collaboration = useCollaboration(element, modeler);
  const startEvent = useStartEvent(element, modeler);
  const intermediateThrowEvent = useIntermediateThrowEvent(element, modeler);

  const elementView = useMemo(() => {
    switch (element?.type) {
      case "bpmn:Process":
        return process;
      case "bpmn:Collaboration":
        return collaboration;
      case "bpmn:StartEvent":
        return startEvent;
      case "bpmn:IntermediateThrowEvent":
        return intermediateThrowEvent;
    }
  }, [process, element])

  return elementView
}