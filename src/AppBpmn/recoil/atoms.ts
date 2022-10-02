import { atomFamily } from "recoil";

export const selectedBpmnDiagramState = atomFamily<string | undefined, string>({
  key: "bpmn.selectedDiagram",
  default: undefined,
});