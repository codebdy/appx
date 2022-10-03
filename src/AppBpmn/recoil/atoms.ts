import { atomFamily } from "recoil";
import { ID } from "../../shared";

export const selectedBpmnProcessIdState = atomFamily<ID | undefined, string>({
  key: "bpmn.selectedProcessId",
  default: undefined,
});