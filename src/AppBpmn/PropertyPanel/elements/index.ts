import { useMemo } from "react";
import { useCollaboration } from "./useCollaboration";
import { useEndEvent } from "./useEndEvent";
import { useExclusiveGateway } from "./useExclusiveGateway";
import { useInclusiveGateway } from "./useInclusiveGateway";
import { useIntermediateThrowEvent } from "./useIntermediateThrowEvent";
import { useParallelGateway } from "./useParallelGateway";
import { useProcess } from "./useProcess";
import { useStartEvent } from "./useStartEvent";

export function useElementView(element: any, modeler: any) {
  const process = useProcess(element, modeler);
  const collaboration = useCollaboration(element, modeler);
  const startEvent = useStartEvent(element, modeler);
  const intermediateThrowEvent = useIntermediateThrowEvent(element, modeler);
  const endEvent = useEndEvent(element, modeler);
  const exclusiveGateway = useExclusiveGateway(element, modeler);
  const parallelGateway = useParallelGateway(element, modeler);
  const inclusiveGateway = useInclusiveGateway(element, modeler);

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
      case "bpmn:EndEvent":
        return endEvent;
      case "bpmn:ExclusiveGateway":
        return exclusiveGateway;
      case "bpmn:ParallelGateway":
        return parallelGateway;
      case "bpmn:InclusiveGateway":
        return inclusiveGateway;
    }
  }, [process, element])

  return elementView
}