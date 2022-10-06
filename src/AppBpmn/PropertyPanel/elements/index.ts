import { useMemo } from "react";
import { useCollaboration } from "./useCollaboration";
import { useEndEvent } from "./useEndEvent";
import { useEventBasedGateway } from "./useEventBasedGateway";
import { useExclusiveGateway } from "./useExclusiveGateway";
import { useInclusiveGateway } from "./useInclusiveGateway";
import { useIntermediateThrowEvent } from "./useIntermediateThrowEvent";
import { useManualTask } from "./useManualTask";
import { useParallelGateway } from "./useParallelGateway";
import { useProcess } from "./useProcess";
import { useReceiveTask } from "./useReceiveTask";
import { useSendTask } from "./useSendTask";
import { useStartEvent } from "./useStartEvent";
import { useTask } from "./useTask";
import { useUserTask } from "./useUserTask";

export function useElementView(element: any, modeler: any) {
  const process = useProcess(element, modeler);
  const collaboration = useCollaboration(element, modeler);
  const startEvent = useStartEvent(element, modeler);
  const intermediateThrowEvent = useIntermediateThrowEvent(element, modeler);
  const endEvent = useEndEvent(element, modeler);
  const exclusiveGateway = useExclusiveGateway(element, modeler);
  const parallelGateway = useParallelGateway(element, modeler);
  const inclusiveGateway = useInclusiveGateway(element, modeler);
  const eventBasedGateway = useEventBasedGateway(element, modeler);
  const task = useTask(element, modeler);
  const sendTask = useSendTask(element, modeler);
  const receiveTask = useReceiveTask(element, modeler);
  const userTask = useUserTask(element, modeler);
  const manualTask = useManualTask(element, modeler);

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
      case "bpmn:EventBasedGateway":
        return eventBasedGateway;
      case "bpmn:Task":
        return task;
      case "bpmn:SendTask":
        return sendTask;
      case "bpmn:ReceiveTask":
        return receiveTask;
      case "bpmn:UserTask":
        return userTask;
      case "bpmn:ManualTask":
        return manualTask;
    }
  }, [process, element])

  return elementView
}