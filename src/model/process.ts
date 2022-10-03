import { ID } from "../shared";

export enum ProcessType {
  approvalFlow = "approvalFlow",
  workFlow = "workFlow"
}

export interface IProcess {
  id: ID;
  name?: string;
  type?: ProcessType;
  instances?: IProcessInstance[];
}

export interface IProcessInstance {
  id: ID;
  approvalStatus?: string;
  process?: IProcess;
}

export interface IProcessInput {
  id?: ID;
  name?: string;
  type?: ProcessType;
}

export interface IProcessInstanceInput {
  id?: ID;
  approvalStatus?: string;
  process?: { sync: IProcessInput };
}